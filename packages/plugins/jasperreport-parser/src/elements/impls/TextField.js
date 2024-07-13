import Cell from '../../model/Cell';
import {
  FieldSyntax,
  ParameterSyntax,
  parse,
  print,
  StringIdentifierSyntax,
} from '../../syntax';
import { getChild, getText } from '../../util/XmlUtil';
import Element from '../Element';

class TextField extends Element {
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
          console.error(e);
          cell.setText(text);
        }

        console.log(syntax);
      }
    }
  }

  parse(context) {
    const cell = new Cell();
    this.parseReportElement(cell, context);
    this.parseBox(cell, context);
    this.parseTextElement(cell);
    this.parseTextFieldExpression(cell);
    return cell;
  }
}

TextField.nodeName = 'textField';

export default TextField;
