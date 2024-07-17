import {
  parse as parse2ken,
  Token,
} from '../../tokenizer/index';
import {
  AddSyntax,
  AndSyntax,
  BooleanIdentifierSyntax,
  BracketSyntax,
  DivideSyntax,
  EqualSyntax,
  EscapeAndSyntax,
  EscapeGreaterOrEqualSyntax,
  EscapeGreaterThanSyntax,
  EscapeLessOrEqualSyntax,
  EscapeLessThanSyntax,
  EscapeNotEqualSyntax,
  FieldSyntax,
  GreaterOrEqualSyntax,
  GreaterThanSyntax,
  LessOrEqualSyntax,
  LessThanSyntax,
  MultiplySyntax,
  NotEqualSyntax,
  NotSyntax,
  NullIdentifierSyntax,
  NumberIdentifierSyntax,
  OrSyntax,
  ParameterSyntax,
  ParseResultSyntax,
  StringIdentifierSyntax,
  SubtractSyntax,
  Syntax,
  UnknownSyntax,
  VariableSyntax,
} from '../syntaxImports';
import Position from './Position';
import SyntaxParseContext from './SyntaxParseContext';

let Synatx_Constructor_Cache = [
  UnknownSyntax,
  FieldSyntax,
  NullIdentifierSyntax,
  BracketSyntax,
  BooleanIdentifierSyntax,
  NumberIdentifierSyntax,
  StringIdentifierSyntax,
  AddSyntax,
  EscapeAndSyntax,
  DivideSyntax,
  MultiplySyntax,
  SubtractSyntax,
  GreaterOrEqualSyntax,
  GreaterThanSyntax,
  LessOrEqualSyntax,
  LessThanSyntax,
  NotEqualSyntax,
  EscapeGreaterOrEqualSyntax,
  EscapeGreaterThanSyntax,
  EscapeLessOrEqualSyntax,
  EscapeLessThanSyntax,
  EscapeNotEqualSyntax,
  AndSyntax,
  EqualSyntax,
  NotSyntax,
  OrSyntax,
  ParameterSyntax,
  //FunctionSyntax,
  VariableSyntax,
]

Synatx_Constructor_Cache = Synatx_Constructor_Cache.sort((item1, item2) => {
  return item2.getWeight() - item1.getWeight()
})

const getSyntaxs = function () {
  return Synatx_Constructor_Cache
}

/**
 *
 */
const parseToToken = function (expression) {
  return parse2ken(expression)
}

/**
 * 语义解析
 * 优先级(参考java)如下,越往下走,优先级越低
 * ====================================================================================================================
 * 1400:    字符串（"**"）
 * ====================================================================================================================
 * 1100:    变量($P{**}),
 *          字段($F{**}),
 * ====================================================================================================================
 * 1000:    布尔（True/False:要在平台变量后，防止平台变量名中字符被识别成布尔）,
 *          数值（要在平台变量后，防止平台变量名中字符被识别成数值）
 * ====================================================================================================================
 * 900:     括号,
 * ====================================================================================================================
 * 800:     非
 * ====================================================================================================================
 * 700:     乘,除
 * ====================================================================================================================
 * 600:     加,减
 * ====================================================================================================================
 * 500:     大于等于,小于等于,等于,不等于
 * ====================================================================================================================
 * 400:     大于,小于
 * ====================================================================================================================
 * 300:     与,或
 * ====================================================================================================================
 * @param {Array<Word>} tokens
 */
const parseToSyntax = function (tokens, parentContext) {
  if (!tokens || tokens.length == 0) {
    return null
  }
  let syntaxList = getSyntaxs()
  const parseContext = new SyntaxParseContext()
  parseContext.joinParentContext(parentContext)
  for (let i = 0, l = syntaxList.length; i < l; i++) {
    let SyntaxConstructor = syntaxList[i]
    let tokenNotSyntaxed = true
    for (let j = 0; j < tokens.length; j++) {
      let token = tokens[j]
      if (token instanceof Syntax) {
        continue
      } else {
        tokenNotSyntaxed = false
        parseContext.setIndex(j)
        parseContext.setTokens(tokens)
        if (SyntaxConstructor.accept(parseContext)) {
          let syntax = SyntaxConstructor.parse(parseContext)
          let startIndex = syntax.getTokenStartIndex()
          let endIndex = syntax.getTokenEndIndex()
          let deleteCount = endIndex - startIndex + 1
          tokens.splice(startIndex, deleteCount, syntax)
          j = startIndex
        }
      }
    }
    if (tokenNotSyntaxed) {
      break
    }
  }
  //检查没有被解析的token
  let unknownTokens = []
  for (let i = 0; i < tokens.length; i++) {
    let token = tokens[i]
    if (token instanceof Token) {
      tokens.splice(i, 1)
      i--
      if (!token.isCanSkip()) {
        unknownTokens.push(token)
      }
    } else if (unknownTokens.length != 0) {
      let position = new Position()
      position.parseStartToken(unknownTokens[0])
      position.parseEndToken(unknownTokens[unknownTokens.length - 1])
      parseContext.setIndex(i)
      parseContext.setTokens(tokens)
      let syntax = new UnknownSyntax(
        i - unknownTokens.length,
        i--,
        '未识别表达式',
        unknownTokens,
        position,
        parseContext
      )
      tokens.splice(i - unknownTokens.length, unknownTokens.length, syntax)
      unknownTokens = []
    }
  }
  if (unknownTokens.length > 0) {
    let position = new Position()
    position.parseStartToken(unknownTokens[0])
    position.parseEndToken(unknownTokens[unknownTokens.length - 1])
    parseContext.setIndex(0)
    parseContext.setTokens(tokens)
    let syntax = new UnknownSyntax(
      tokens.length - unknownTokens.length,
      tokens.length - 1,
      '未识别表达式',
      unknownTokens,
      position,
      parseContext
    )
    tokens.splice(tokens.length - unknownTokens.length, unknownTokens.length, syntax)
  }
  const syntaxs = []
  tokens.forEach((token) => {
    if (token instanceof Syntax) {
      syntaxs.push(token)
    } else {
      throw Error('表达式识别失败！')
    }
  })
  parseContext.setIndex(0)
  parseContext.setTokens(syntaxs)
  return new ParseResultSyntax(syntaxs, parseContext)
}

/**
 * 解析表达式
 * @param {String} expression 表达式
 * @param {SyntaxContext} context 解析上下文
 * @returns {Syntax}
 */
const parse = function (expression) {
  if (typeof expression == 'string' && expression.trim() != '') {
    try {
      return parseToSyntax(parseToToken(expression))
    } catch (e) {
      throw Error('表达式识别失败！表达式：' + expression)
    }
  }
  return null
}

export { parse, parseToSyntax };
