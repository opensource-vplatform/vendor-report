import Cell from '../../model/Cell';
import {
  getChild,
  getText,
} from '../../util/XmlUtil';
import StaticText from './StaticText';

class TextField extends StaticText {

  parseTextFieldExpression(cell, context) {
    const node = this.getNode();
    const textFieldExpression = getChild('textFieldExpression', node);
    if (textFieldExpression) {
      let text = getText(textFieldExpression);
      const config = cell.getConfig();
      config.text = text;
    }
  }

  isIgnore() {
    const node = this.getNode();
    const reportEle = node.elements?.find(
      (ele) => ele.type == 'element' && ele.name == 'reportElement'
    );
    if (reportEle) {
      const ele = reportEle.elements?.find(
        (ele) => ele.type == 'element' && ele.name == 'printWhenExpression'
      );
      if (ele) {
        const text = getText(ele);
        return text == '$F{showQfw}';
      }
    }
    return false;
  }

  parse(context) {
    if (this.isIgnore()) {
      return null;
    }
    const cell = new Cell();
    const config = cell.getConfig();
    config.isStretchWithOverflow = this.getBooleanAttr("isStretchWithOverflow");
    const pattern = this.getAttribute('pattern');
    if (pattern) {
      config.pattern = pattern;
    }
    this.parseReportElement(cell, context);
    this.parseBox(cell, context);
    this.parseTextElement(cell);
    this.parseTextFieldExpression(cell, context);
    return cell;
  }
}

TextField.nodeName = 'textField';

export default TextField;
