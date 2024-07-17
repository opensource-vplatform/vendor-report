import Cell from '../../model/Cell';
import {
  FieldSyntax,
  ParameterSyntax,
  parse,
  print,
  StringIdentifierSyntax,
} from '../../syntax/index';
import {
  getChild,
  getText,
} from '../../util/XmlUtil';
import StaticText from './StaticText';

class TextField extends StaticText {

  parseTextFieldExpression(cell) {
    const node = this.getNode();
    const textFieldExpression = getChild('textFieldExpression', node);
    if (textFieldExpression) {
      const text = getText(textFieldExpression);
      if (text) {
        let syntax = null;
        try {
          syntax = parse(text);
          const syntaxs = syntax.getSyntaxs();
          if (syntaxs.length == 1) {
            const stx = syntaxs[0];
            if (stx instanceof StringIdentifierSyntax) {
              cell.setText(stx.getValue());
              return;
            } else if (stx instanceof ParameterSyntax) {
              cell.setBindingPath(stx.getCode());
              return;
            } else if (stx instanceof FieldSyntax) {
              cell.setBindingPath(stx.getCode());
              return;
            }
          }
          if (syntax.isText()) {
            cell.setText(syntax.toString());
          } else {
            const formula = print(syntax, {
              printAddSyntax: function (syntax) {
                const leftSyntax = syntax.getLeft();
                const rightSyntax = syntax.getRight();
                return `CONCAT(${leftSyntax.toString()},${rightSyntax.toString()})`;
              },
              printFieldSyntax: function (syntax) {
                const code = syntax.getCode();
                return `TOONE.GET("${code}")`;
              },
              printParameterSyntax: function (syntax) {
                const code = syntax.getCode();
                return `TOONE.GET("${code}")`;
              },
            });
            cell.setFormula(formula);
          }
        } catch (e) {
          cell.setText("_@_$_toone_report_error_message_prefix_$_@_"+text);
        }
      }
    }
  }

  parse(context) {
    const cell = new Cell();
    cell.setWordWrap(this.getAttribute("isStretchWithOverflow")=="true");
    this.parseReportElement(cell, context);
    this.parseBox(cell, context);
    this.parseTextElement(cell);
    this.parseTextFieldExpression(cell);
    return cell;
  }
}

TextField.nodeName = 'textField';

export default TextField;
