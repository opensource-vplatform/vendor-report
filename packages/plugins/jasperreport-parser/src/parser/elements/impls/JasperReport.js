import Report from '../../model/Report';
import {
  getChild,
  getChildByPath,
} from '../../util/XmlUtil';
import Element from '../Element';
import { createByNode } from '../Factory';

class JasperReport extends Element {
  /**
   * 获取排序后的子节点
   * jasperreport中的节点顺序：
   * 1、title
   * 2、pageHeader
   * 3、columnHeader
   * 4、groupHeader
   * 5、detail
   * 6、groupFooter
   * 7、columnFooter
   * 8、pageFooter
   */
  getOrderedChildren() {
    const children = [];
    const node = this.getNode();
    children.push(getChild('title', node));
    children.push(getChild('pageHeader', node));
    children.push(getChild('columnHeader', node));
    children.push(getChildByPath(['group', 'groupHeader'], node));
    children.push(getChild('detail', node));
    children.push(getChildByPath(['group', 'groupFooter'], node));
    children.push(getChild('columnFooter', node));
    children.push(getChild('pageFooter', node));
    return children;
  }

  parse(context) {
    const report = new Report();
    const config = report.getConfig();
    const name = this.getAttribute('name');
    config.name = name;
    context.setName(name);
    const orientation =
      this.getAttribute('orientation') == 'Landscape'
        ? 'landscape'
        : 'portrait';
    config.orientation = orientation;
    config.paperWidth = this.getIntegerAttr('pageWidth');
    config.marginTop = this.getIntegerAttr('topMargin');
    config.marginRight = this.getIntegerAttr('rightMargin');
    config.marginBottom = this.getIntegerAttr('bottomMargin');
    config.marginLeft = this.getIntegerAttr('leftMargin');
    const columnWidth = this.getIntegerAttr('columnWidth');
    context.setColumnWidth(columnWidth);
    let cells = [];
    const orderedChildren = this.getOrderedChildren();
    orderedChildren.forEach((child) => {
      if (child) {
        const instance = createByNode(child);
        if (instance) {
          const height = instance.getHeight();
          const children = this.createChildren(child);
          children.forEach((child) => {
            const cell = child.parse(context);
            if (cell) {
              if (Array.isArray(cell)) {
                cells = cells.concat(cell);
              } else {
                cells.push(cell);
              }
            }
          });
          context.appendTopOffset(height);
        }
      }
    });
    report.appendCell(cells);
    return report;
  }
}

JasperReport.nodeName = 'jasperReport';

export default JasperReport;
