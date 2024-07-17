import {
  DollarToken,
  RightBraceToken,
} from '../../../../tokenizer/index';
import Position from '../../Position';
import { getVarIdentifierTokens } from '../../utils/TokenUtils';
import Syntax from '../Syntax';

/**
 * 值获取语法
 * 语法类型：$*{**}
 */
class AbstractValueSyntax extends Syntax {
  code;

  static SYMBOL = '';

  static accept = function (context) {
    let index = context.getIndex();
    let tokens = context.getTokens();
    let token = tokens[index];
    if (token instanceof DollarToken) {
      let tks = tokens.slice(index, index+this.SYMBOL.length + 1);
      if (tks.join('') == this.SYMBOL + '{') {
        index += this.SYMBOL.length+1;
        let codeTokens = getVarIdentifierTokens(index, tokens);
        if (codeTokens && codeTokens.length > 0) {
          index += codeTokens.length;
          token = tokens[index];
          if (token instanceof RightBraceToken) {
            return true;
          }
        }
      }
    }
    return false;
  };

  static parse = function (context) {
    let index = context.getIndex();
    let startIndex = index,
      startToken = context.getToken();
    let tokens = context.getTokens();
    index += this.SYMBOL.length+1;
    let fieldTokens = getVarIdentifierTokens(index, tokens);
    let code = fieldTokens.join('');
    index += code.length;
    let position = new Position();
    position.parseStartToken(startToken);
    position.parseEndToken(tokens[index]);
    return new this(startIndex, index, code, position, context);
  };

  static getWeight = function () {
    return 1101;
  };
  constructor(startTokenIndex, endTokenIndex, code, position, context) {
    super(startTokenIndex, endTokenIndex, position, context);
    this.code = code;
  }

  getCode() {
    return this.code;
  }

  getSymbol(){
    return AbstractValueSyntax.SYMBOL;
  }

  toString() {
    const ctx = this.getContext();
    const printer = ctx.getPrinter();
    if (printer && printer.printFieldSyntax) {
      return printer.printFieldSyntax(this, (syntax) => syntax.toString());
    } else {
      return `${this.getSymbol()}{${this.getCode()}}`;
    }
  }
}

export default AbstractValueSyntax;
