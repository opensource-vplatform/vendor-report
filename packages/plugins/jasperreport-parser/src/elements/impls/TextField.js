import { parse } from '@babel/parser';

import Cell from '../../model/Cell';
/*import {
  FieldSyntax,
  ParameterSyntax,
  parse,
  print,
  StringIdentifierSyntax,
} from '../../syntax/index';*/
import { getChild, getText } from '../../util/XmlUtil';
import Context from '../../vistor/Context';
import { create } from '../../vistor/Factory';
import StaticText from './StaticText';
import { uuid } from '@toone/report-util';

const Force_Type_Syntax = /\(Map\)|\(String\)|\((Double)\)/g;

const Parameter_Syntax = /\$P{((\w+))}/g;

const Field_Syntax = /\$F{(\w+)}/g;

const Variable_Syntax = /\$V{(\w+)}/g;

class TextField extends StaticText {
  /**
   * 移除java强制类型转换语法
   */
  _removeForceTypeChange(text) {
    return text.replace(Force_Type_Syntax, '');
  }

  _convertSyntax(text) {
    text = text.replace(Parameter_Syntax, (group, match) => `$P("${match}")`);
    text = text.replace(Field_Syntax, (group, match) => `$F("${match}")`);
    text = text.replace(Variable_Syntax, (group, match) => `$V("${match}")`);
    return text;
  }

  /**
   * 调整语法
   * @param {*} text
   */
  _adjustExpression(text) {
    if (typeof text == 'string') {
      text = this._removeForceTypeChange(text);
      return this._convertSyntax(text);
    }
    return text;
  }

  parseTextFieldExpression(cell, context) {
    const node = this.getNode();
    const textFieldExpression = getChild('textFieldExpression', node);
    if (textFieldExpression) {
      let text = getText(textFieldExpression);
      if (text) {
        try {
          text = this._adjustExpression(text);
          const node = parse(text);
          const printer = create(node);
          const name = context.getName();
          const ctx = new Context(`${name}_parameter`, `${name}_detail`);
          const res = printer.print(ctx);
          const type = res.type;
          if (type == 2) {
            cell.setFormula(res.text);
          } else if (type == 1) {
            cell.setBindingPath(res.text);
          } else {
            cell.setText(res.text);
          }
        } catch (e) {
          cell.setText(text);
          cell.setTag(
            JSON.stringify({
              instanceId: uuid(),
              plugins: [{ type: 'error', config: {} }],
            })
          );
        }
      }
    }
  }

  parse(context) {
    const cell = new Cell();
    cell.setWordWrap(this.getAttribute('isStretchWithOverflow') == 'true');
    const pattern = this.getAttribute('pattern');
    if (pattern) {
      cell.setFormatter(pattern);
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
