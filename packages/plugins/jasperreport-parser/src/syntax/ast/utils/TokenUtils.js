import {
  NumberToken,
  UnderScoreToken,
  WordToken,
} from '../../../tokenizer/index';

const isVarToken = function (token) {
  return isWordToken(token) || isNumberToken(token) || isUnderScoreToken(token)
}

const isWordToken = function (token) {
  return token instanceof WordToken
}

const isNumberToken = function (token) {
  return token instanceof NumberToken
}

const isUnderScoreToken = function (token) {
  return token instanceof UnderScoreToken
}

const getVarIdentifierTokens = function (index, tokens) {
  let varTokens = []
  while (true) {
    let token = tokens[index++]
    if (isVarToken(token)) {
      varTokens.push(token)
    } else {
      break
    }
  }
  return varTokens
}

/**
 * 是否符合变量定义
 * 规范:由a-z，A-Z,0-9及_组成，不能以0-9开头，不能以_结尾
 */
const _checkVar = function (tokens) {
  if (tokens) {
    let token = tokens[0]
    if (isWordToken(token)) {
      token = tokens[tokens.length - 1]
      if (!isUnderScoreToken(token)) {
        for (let i = 1, l = tokens.length - 1; i < l; i++) {
          token = tokens[i]
          if (!isVarToken(token)) {
            return false
          }
        }
        return true
      }
    }
  }
  return false
}

export {
  _checkVar,
  getVarIdentifierTokens,
  isNumberToken,
  isUnderScoreToken,
  isVarToken,
  isWordToken,
};
