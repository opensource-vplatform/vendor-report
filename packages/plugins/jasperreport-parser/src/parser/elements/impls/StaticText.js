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
      const config = cell.getConfig();
      config.left = this.getIntegerAttr('x', reportElement);
      config.top = this.getIntegerAttr('y', reportElement) + context.getTopOffset();
      config.width = this.getIntegerAttr('width', reportElement);
      config.height = this.getIntegerAttr('height', reportElement);
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
      const config = cell.getConfig();
      config.borderTop = this.toBorder('topBorder', box);
      config.borderRight = this.toBorder('rightBorder', box);
      config.borderBottom = this.toBorder('bottomBorder', box);
      config.borderLeft = this.toBorder('leftBorder', box);
    }
  }

  parseTextElement(cell) {
    const node = this.getNode();
    const textElement = getChild('textElement', node);
    if (textElement) {
      const config = cell.getConfig();
      config.hAlign = this.getAttribute('textAlignment', textElement);
      config.vAlign = this.getAttribute('verticalAlignment', textElement);
      const font = getChild('font', textElement);
      if (font) {
        config.font = this.getAttribute('fontName', font);
        config.fontSize = this.getIntegerAttr('size', font);
        config.bold = this.getBooleanAttr('isBold', font);
      }
    }
  }

  parseText(cell){
    const node = this.getNode();
    const text = getChild('text', node);
    const config = cell.getConfig();
    config.text = `"${getText(text)}"`;
  }

  parse(context) {
    const cell = new Cell();
    const config = cell.getConfig();
    config.wordWrap = true;
    this.parseReportElement(cell, context);
    this.parseBox(cell, context);
    this.parseTextElement(cell);
    this.parseText(cell);
    return cell;
  }
}

StaticText.nodeName = 'staticText';

export default StaticText;
