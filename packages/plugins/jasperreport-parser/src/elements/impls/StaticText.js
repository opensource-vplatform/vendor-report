import Cell from '../../model/Cell';
import {
  getChild,
  getText,
} from '../../util/XmlUtil';
import Element from '../Element';

class StaticText extends Element {
  parseReportElement(cell, context) {
    const node = this.getNode();
    const reportElement = getChild('reportElement', node);
    if (reportElement) {
      cell.setLeft(this.getIntegerAttr('x', reportElement));
      cell.setTop(
        this.getIntegerAttr('y', reportElement) + context.getTopOffset()
      );
      cell.setWidth(this.getIntegerAttr('width', reportElement));
      cell.setHeight(this.getIntegerAttr('height', reportElement));
    }
  }

  toBorder(borderType, box) {
    const type = this.getAttribute(borderType, box);
    if (type != 'None') {
      return {
        type: type,
        color: this.getAttribute(borderType + 'Color', box),
      };
    }
    return null;
  }

  parseBox(cell) {
    const node = this.getNode();
    const box = getChild('box', node);
    if (box) {
      cell.setBorderTop(this.toBorder('topBorder', box));
      cell.setBorderRight(this.toBorder('rightBorder', box));
      cell.setBorderBottom(this.toBorder('bottomBorder', box));
      cell.setBorderLeft(this.toBorder('leftBorder', box));
    }
  }

  parseTextElement(cell) {
    const node = this.getNode();
    const textElement = getChild('textElement', node);
    if (textElement) {
      cell.setHAlign(this.getAttribute('textAlignment', textElement));
      cell.setVAlign(this.getAttribute('verticalAlignment', textElement));
      const font = getChild('font', textElement);
      if (font) {
        cell.setFont(this.getAttribute('fontName', font));
        cell.setFontSize(this.getIntegerAttr('size', font));
        cell.setBold(this.getAttribute('isBold', font) == 'true');
      }
    }
  }

  parseText(cell){
    const node = this.getNode();
    const text = getChild('text', node);
    cell.setText(getText(text));
  }

  parse(context) {
    const cell = new Cell();
    cell.setWordWrap(true);
    this.parseReportElement(cell, context);
    this.parseBox(cell, context);
    this.parseTextElement(cell);
    this.parseText(cell);
    return cell;
  }
}

StaticText.nodeName = 'staticText';

export default StaticText;
