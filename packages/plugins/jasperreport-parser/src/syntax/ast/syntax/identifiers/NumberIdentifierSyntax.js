import {
  BlankToken,
  DotToken,
  MinusToken,
  NumberToken,
  Token,
} from '../../../../tokenizer/index';
import Position from '../../Position';
import Syntax from '../Syntax';

const getPositiveNumber = function (index, tokens) {
  let numbers = [];
  while (index < tokens.length) {
    let token = tokens[index];
    if (token instanceof NumberToken || token instanceof DotToken) {
      numbers.push(token);
    } else {
      break;
    }
    index++;
  }
  return numbers;
};

/**
 * 数值常量
 */
class NumberIdentifierSyntax extends Syntax {
  value;

  static getWeight = function () {
    return 1000;
  };

  /**
   * 处理场景:
   * 1-1
   * 1+-1
   * 1>=-1
   */
  static parse = function (context) {
    let tokens = context.getTokens();
    let index = context.getIndex();
    let startIndex = index;
    let numbers = getPositiveNumber(index, tokens);
    let endIndex = index + numbers.length - 1;
    let endToken = tokens[endIndex];
    let value = parseFloat(numbers.join(''));
    while (true) {
      let preToken = tokens[index - 1];
      if (preToken instanceof Token && preToken.isCanSkip()) {
        startIndex--;
        index--;
      } else {
        break;
      }
    }
    let preToken = tokens[index - 1];
    if (preToken instanceof MinusToken) {
      //判断是否是负数
      let i = index - 1,
        before;
      while (true) {
        i--;
        if (i > -1) {
          let tk = tokens[i];
          if (
            (tk instanceof Token || tk instanceof Syntax) &&
            !(tk instanceof BlankToken)
          ) {
            before = tokens[i];
            break;
          }
        } else {
          break;
        }
      }
      if (before) {
        if (before instanceof Token) {
          const token = before;
          if (!token.isSubtractAhead()) {
            startIndex--;
            value = 0 - value;
          }
        }
      } else {
        //前面不存在语法或token，即可判断为负号
        startIndex--;
        value = 0 - value;
      }
    }

    let position = new Position();
    position.parseStartToken(tokens[startIndex]);
    position.parseEndToken(endToken);
    return new NumberIdentifierSyntax(
      startIndex,
      endIndex,
      value,
      position,
      context
    );
  };

  static accept = function (context) {
    let token = context.getToken();
    if (token instanceof NumberToken) {
      let tokens = context.getTokens();
      let index = context.getIndex();
      let numbers = getPositiveNumber(index, tokens);
      let numberStr = numbers.join('');
      return !isNaN(parseFloat(numberStr));
    }
    return false;
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
    if (printer && printer.printNumberIdentifierSyntax) {
      return printer.printNumberIdentifierSyntax(this, (syntax) =>
        syntax.toString()
      );
    } else {
      return this.getValue() + '';
    }
  }

  isText() {
    return true;
  }

  visit() {
    const ctx = this.getContext();
    const visitor = ctx.getVisitor();
    if (visitor && visitor.visitNumberIdentifierSyntax) {
      visitor.visitNumberIdentifierSyntax(this);
    }
  }
}

export default NumberIdentifierSyntax;
