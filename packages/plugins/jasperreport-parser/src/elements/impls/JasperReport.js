import Sheet from '../../model/Sheet';
import Element from '../Element';
import { createByNode } from '../Factory';

class JasperReport extends Element {
  parse(context) {
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
    let cells = [];
    const node = this.getNode();
    childrenNames.forEach((childrenName) => {
      const nodeVal = node[childrenName];
      if (nodeVal) {
        const band = nodeVal.band;
        const height = this.getIntegerAttr('height', band);
        const children = createByNode(childrenName, nodeVal);
        children.forEach((child) => {
          const td = child.parse(context);
          if (td) {
            if (Array.isArray(td)) {
              cells = cells.concat(td);
            } else {
              cells.push(td);
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
