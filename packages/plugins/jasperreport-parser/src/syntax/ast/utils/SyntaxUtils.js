import {
  DollarToken,
  LeftBracketToken,
  RightBraceToken,
  RightBracketToken,
} from '../../../tokenizer/index';
import { getVarIdentifierTokens } from './TokenUtils';

export const isParameterSyntax = function(index, tokens){
    let token = tokens[index];
    if(token instanceof DollarToken){
      index++;
      let tks = tokens.slice(index,index+2);
      if(tks.join('')=='P{'){
        index += 2;
        let codeTokens = getVarIdentifierTokens(index, tokens)
          if (codeTokens && codeTokens.length > 0) {
            index += codeTokens.length
            token = tokens[index]
            if (token instanceof RightBraceToken) {
              return true
            }
          }
      }
    }
  }
  
  export const isFieldSyntax = function(index, tokens){
    let token = tokens[index];
    if(token instanceof DollarToken){
      index++;
      let tks = tokens.slice(index,index+2);
      if(tks.join('')=='F{'){
        index += 2;
        let codeTokens = getVarIdentifierTokens(index, tokens)
          if (codeTokens && codeTokens.length > 0) {
            index += codeTokens.length
            token = tokens[index]
            if (token instanceof RightBraceToken) {
              return true
            }
          }
      }
    }
  }
  
  const isEntityFieldSyntax = function (index, tokens) {
    let token = tokens[index]
    if (token instanceof LeftBracketToken) {
      index++
      let entityCodeTokens = getVarIdentifierTokens(index, tokens)
      if (entityCodeTokens && entityCodeTokens.length > 0) {
        index += entityCodeTokens.length
        let tks = tokens.slice(index, index + 3)
        if (tks.join('') == '].[') {
          index += 3
          let fieldCodeTokens = getVarIdentifierTokens(index, tokens)
          if (fieldCodeTokens && fieldCodeTokens.length > 0) {
            index += fieldCodeTokens.length
            token = tokens[index]
            if (token instanceof RightBracketToken) {
              return true
            }
          }
        }
      }
    }
    return false
  }
  
  const parseEntityFieldSyntax = function (index, tokens){
    index++
    let entityCodeTokens = getVarIdentifierTokens(index, tokens)
    let entityCode = entityCodeTokens.join('')
    //偏移实体编号长度
    index += entityCode.length
    //偏移].[
    index += 3
    let fieldCodeTokens = getVarIdentifierTokens(index,tokens)
    let fieldCode = fieldCodeTokens.join('')
    return {
      entityCode,
      fieldCode
    }
  }

export { isEntityFieldSyntax, parseEntityFieldSyntax };