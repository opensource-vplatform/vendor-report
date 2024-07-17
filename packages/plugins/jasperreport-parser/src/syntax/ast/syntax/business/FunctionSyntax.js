import {
  CommaToken,
  LeftParenToken,
  RightParenToken,
} from '../../../../tokenizer/index';
import { parseToSyntax } from '../../Parser';
import Position from '../../Position';
import { isFuncVarChar } from '../../utils/VarUtils';
import Syntax from '../Syntax';

const findFunctionName = function (index, tokens) {
  let funNameTokens = [];
  while (true) {
    let token = tokens[--index];
    if (isFuncVarChar(token)) {
      funNameTokens.push(token);
    } else {
      break;
    }
    if (index == 0) {
      break;
    }
  }
  return funNameTokens.reverse();
};

let findRightParenTokenIndex = function (index, tokens) {
  let rightParenTokenIndex = -1;
  let parenTokens = [];
  while (true) {
    let token = tokens[index];
    if (token instanceof LeftParenToken) {
      parenTokens.push(token);
    } else if (token instanceof RightParenToken) {
      if (parenTokens.length > 0) {
        let iden = parenTokens.pop();
        if (iden instanceof LeftParenToken) {
          if (parenTokens.length == 0) {
            rightParenTokenIndex = index;
            break;
          }
        } else {
          if (iden) parenTokens.push(iden);
          parenTokens.push(token);
        }
      } else {
        parenTokens.push(token);
      }
    }
    index++;
    if (index == tokens.length) {
      break;
    }
  }
  return rightParenTokenIndex;
};

let splitArgTokens = function (start, end, tokens) {
  let argTokens = [],
    parenTokens = [];
  let index = start + 1;
  let startIndex = index;
  if (startIndex != end) {
    while (true) {
      let token = tokens[index];
      if (token instanceof LeftParenToken) {
        parenTokens.push(token);
      } else if (token instanceof RightParenToken) {
        if (parenTokens.length > 0) {
          let iden = parenTokens.pop();
          if (!(iden instanceof LeftParenToken)) {
            if (iden) parenTokens.push(iden);
            parenTokens.push(token);
          }
        } else {
          parenTokens.push(token);
        }
      } else if (token instanceof CommaToken) {
        if (parenTokens.length == 0) {
          argTokens.push(tokens.slice(startIndex, index));
          startIndex = index + 1;
        }
      }
      index++;
      if (index == end) {
        if (startIndex != end) {
          argTokens.push(tokens.slice(startIndex, end));
        }
        break;
      }
    }
  }
  return argTokens;
};

class FunctionSyntax extends Syntax {
  code;

  args;

  static accept = function (context) {
    let token = context.getToken();
    if (token instanceof LeftParenToken) {
      let index = context.getIndex();
      let tokens = context.getTokens();
      let funNameTokens = findFunctionName(index, tokens);
      if (funNameTokens.length > 0) {
        let rightParenTokenIndex = findRightParenTokenIndex(index, tokens);
        return rightParenTokenIndex !== -1;
      }
    }
    return false;
  };

  static parse = function (context) {
    let index = context.getIndex();
    let tokens = context.getTokens();
    let funNameTokens = findFunctionName(index, tokens);
    let funName = funNameTokens.join('');
    let startIndex = index - funName.length;
    let rightParenTokenIndex = findRightParenTokenIndex(index, tokens);
    let argTokens = splitArgTokens(index, rightParenTokenIndex, tokens);
    let args = [];
    argTokens.forEach((argToken) => {
      args.push(parseToSyntax(argToken, context));
    });
    let position = new Position();
    position.parseStartToken(tokens[startIndex]);
    position.parseEndToken(tokens[rightParenTokenIndex]);
    return new FunctionSyntax(
      startIndex,
      rightParenTokenIndex,
      funName,
      args,
      position,
      context
    );
  };

  static getWeight = function () {
    return 1100;
  };

  constructor(startTokenIndex, endTokenIndex, code, args, position, context) {
    super(startTokenIndex, endTokenIndex, position, context);
    this.code = code;
    this.args = args;
  }

  getCode() {
    return this.code;
  }

  getArgs() {
    return this.args;
  }

  toString() {
    const ctx = this.getContext();
    const printer = ctx.getPrinter();
    if (printer && printer.printFunctionSyntax) {
      return printer.printFunctionSyntax(
        this,
        (syntax) => syntax && syntax.toString()
      );
    } else {
      let argScript = [];
      let args = this.getArgs();
      if (args && args.length > 0) {
        args.forEach((arg) => {
          if (arg) {
            argScript.push(arg.toString());
          }
          argScript.push(',');
        });
        argScript.pop();
      }
      return `${this.getCode()}(${
        argScript.length > 0 ? argScript.join('') : ''
      })`;
    }
  }

  visit() {
    const ctx = this.getContext();
    const visitor = ctx.getVisitor();
    let res = true;
    if (visitor && visitor.visitFunctionSyntax) {
      res = visitor.visitFunctionSyntax(this);
    }
    if (res !== false) {
      let args = this.getArgs();
      if (args && args.length > 0) {
        args.forEach((arg) => {
          arg && arg.visit();
        });
      }
    }
  }
}

export default FunctionSyntax;
