import {
  BackSlashToken,
  QuoteToken,
} from '../../../../tokenizer/index';
import Position from '../../Position';
import Syntax from '../Syntax';
import UnknownSyntax from '../UnknownSyntax';

const enhanceStringValue = function (value) {
  if (value.indexOf('\\"') != -1) {
    const charList = ['"'];
    charList.push(value);
    charList.push('"');
    return JSON.parse(charList.join(''));
  }
  return value;
};

const getPreBackSlashCount = function (index, tokens) {
  let count = 0,
    i = index;
  while (tokens[--i] instanceof BackSlashToken) {
    count++;
  }
  return count;
};

const parseStr = function (index, tokens, context) {
  let stringIdentifiers = [];
  let start = index,
    endIndex = -1;
  let strTokens = [];
  stringIdentifiers.push(tokens[++index]);
  let syntax = null;
  let error = null;
  while (index < tokens.length) {
    let token = tokens[index];
    if (token instanceof QuoteToken) {
      const count = getPreBackSlashCount(index, tokens);
      if (count % 2 == 0) {
        endIndex = index;
        break;
      }
    }
    strTokens.push(token);
    index++;
    if (index == tokens.length) {
      error = new Error('字符串未结束');
      let startToken = tokens[start];
      let endToken = tokens[tokens.length - 1];
      let position = new Position();
      position.parseStartToken(startToken);
      if (endToken instanceof Syntax) {
        position.parseEndSyntax(endToken);
      } else {
        position.parseEndToken(endToken);
      }
      syntax = new UnknownSyntax(
        index,
        tokens.length - 1,
        '字符串未结束',
        tokens.slice(index, tokens.length),
        position,
        context
      );
      break;
    }
  }
  return {
    syntax,
    error,
    endIndex,
    strTokens,
  };
};

/**
 * 字符串常量
 */
class StringIdentifierSyntax extends Syntax {
  value;

  static accept = function (context) {
    let token = context.getToken();
    return token instanceof QuoteToken;
  };

  static parse = function (context) {
    let index = context.getIndex();
    let tokens = context.getTokens();
    let result = parseStr(index, tokens, context);
    if (result.error) {
      return result.syntax;
    } else {
      let endIndex = result.endIndex;
      let position = new Position();
      position.parseStartToken(tokens[index]);
      if (endIndex == -1) {
        //字符串未结束
        position.parseEndToken(tokens[tokens.length - 1]);
        return new UnknownSyntax(
          index,
          tokens.length - 1,
          '字符串未结束',
          tokens.slice(index, tokens.length),
          position,
          context
        );
      } else {
        position.parseEndToken(tokens[endIndex]);
        const value = enhanceStringValue(result.strTokens.join(''));
        return new StringIdentifierSyntax(
          index,
          endIndex,
          value,
          position,
          context
        );
      }
    }
  };

  static getWeight = function () {
    return 1400;
  };

  constructor(startTokenIndex, endTokenIndex, value, position, context) {
    super(startTokenIndex, endTokenIndex, position, context);
    this.value = value;
  }

  getValue() {
    return this.value;
  }

  toString() {
    const ctx = this.getContext();
    const printer = ctx.getPrinter();
    if (printer && printer.printStringIdentifierSyntax) {
      return printer.printStringIdentifierSyntax(this, (syntax) =>
        syntax.toString()
      );
    } else {
      return `"${this.getValue()}"`;
    }
  }
  
  isText() {
    return true;
  }

  visit() {
    const ctx = this.getContext();
    const visitor = ctx.getVisitor();
    if (visitor && visitor.visitStringIdentifierSyntax) {
      visitor.visitStringIdentifierSyntax(this);
    }
  }
}

export default StringIdentifierSyntax;
