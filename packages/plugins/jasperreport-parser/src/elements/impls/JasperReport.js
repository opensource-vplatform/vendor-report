import Sheet from '../../model/Sheet';
import { getChild } from '../../util/XmlUtil';
import Element from '../Element';

class JasperReport extends Element {
  parse(context) {
    debugger;
    const childrenNames = [
      'title',
      'pageHeader',
      'columnHeader',
      'detail',
      'columnFooter',
      'pageFooter',
      'summary',
    ];
    const sheet = new Sheet();
    sheet.setName(this.getAttribute('name'));
    sheet.setOrientation(
      this.getAttribute('orientation') == 'Landscape' ? 'landscope' : 'portrait'
    );
    sheet.setMarginTop(this.getIntegerAttr('topMargin'));
    sheet.setMarginRight(this.getIntegerAttr('rightMargin'));
    sheet.setMarginBottom(this.getIntegerAttr('bottomMargin'));
    sheet.setMarginLeft(this.getIntegerAttr('leftMargin'));
    const columnWidth = this.getIntegerAttr('columnWidth');
    context.setColumnWidth(columnWidth);
    let cells = [];
    const node = this.getNode();
    childrenNames.forEach((childrenName) => {
      const child = getChild(childrenName, node);
      if (child) {
        const band = getChild('band', child);
        const height = this.getIntegerAttr('height', band);
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
    });
    sheet.appendCell(cells);
    return sheet;
  }
}

JasperReport.nodeName = 'jasperReport';

export default JasperReport;
