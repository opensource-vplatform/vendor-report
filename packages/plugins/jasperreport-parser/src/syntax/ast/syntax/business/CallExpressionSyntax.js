import {
  DotToken,
  LeftParenToken,
  NumberToken,
} from '../../../../tokenizer';
import { getVarIdentifierTokens } from '../../utils/TokenUtils';
import Syntax from '../Syntax';

/**
 * 
 */
class CallExpressionSyntax extends Syntax {
  static accept = function (context) {
    let token = context.getToken();
    if (token instanceof DotToken) {
      let index = context.getIndex();
      let tokens = context.getTokens();
      if(index>0){
        const preToken = tokens[index-1];
        if(preToken&&!(preToken instanceof NumberToken)){
            const varTokens = getVarIdentifierTokens(index+1,tokens);
            if(varTokens.length>0){
                const token = tokens[index+varTokens.length+1];
                if(token instanceof LeftParenToken){
                    return true;
                }
            }
        }
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

  constructor(startTokenIndex, endTokenIndex, callee, args, position, context) {
    super(startTokenIndex, endTokenIndex, position, context);
    this.callee = callee;
    this.args = args;
  }
}

export default CallExpressionSyntax;
