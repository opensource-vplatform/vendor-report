import {
  LeftParenToken,
  RightParenToken,
} from '../../../../tokenizer/index';
import { parseToSyntax } from '../../Parser';
import Position from '../../Position';
import Syntax from '../Syntax';
import UnknownSyntax from '../UnknownSyntax';

const findBodyTokens = function (index, tokens, context) {
  let endIndex,
    rightParenToken,
    bodyTokens = []
  const start = index
  const bracket = []
  let hasError = false
  let error = null
  let syntax = null
  while (true) {
    let token = tokens[index]
    if (token instanceof LeftParenToken) {
      bracket.push(token)
    } else if (token instanceof RightParenToken) {
      if (bracket.length > 0) {
        let iden = bracket.pop()
        if (iden instanceof LeftParenToken) {
          if (bracket.length == 0) {
            endIndex = index
            rightParenToken = token
            break
          }
        } else {
          if (iden) bracket.push(iden)
          bracket.push(token)
        }
      } else {
        bracket.push(token)
      }
    }
    index++
    if (index == tokens.length) {
      //超出表达式长度还未找到闭合括号
      let startToken = tokens[start]
      let endToken = tokens[tokens.length - 1]
      let position = new Position()
      position.parseStartToken(startToken)
      if (endToken instanceof Syntax) {
        position.parseEndSyntax(endToken)
      } else {
        position.parseEndToken(endToken)
      }
      syntax = new UnknownSyntax(
        start,
        tokens.length - 1,
        '未找到闭合括号',
        tokens.slice(index, tokens.length),
        position,
        context
      )
      error = new Error('未找到闭合括号')
      hasError = true
      break
    }
  }
  bodyTokens = tokens.slice(start + 1, endIndex)
  return {
    hasError,
    error,
    syntax,
    endIndex,
    rightParenToken,
    bodyTokens
  }
}

/**
 * 括号语法
 * 规范：(**)
 */
class BracketSyntax extends Syntax {
  static accept = function (context) {
    let token = context.getToken()
    return token instanceof LeftParenToken
  }

  static parse = function (context) {
    let index = context.getIndex()
    let leftParenToken = context.getToken()
    let result = findBodyTokens(index,context.getTokens(), context)
    if (result.hasError) {
      return result.syntax
    } else if (result.rightParenToken && result.endIndex) {
      let rightParenToken = result.rightParenToken
      let body = parseToSyntax(result.bodyTokens, context)
      let position = new Position()
      position.parseStartToken(leftParenToken)
      position.parseEndToken(rightParenToken)
      return new BracketSyntax(index, result.endIndex, body, position, context)
    } else {
      return null
    }
  }

  static getWeight = function () {
    return 900
  }

  body

  constructor(
    tokenStartIndex,
    tokenEndIndex,
    body,
    position,
    context
  ) {
    super(tokenStartIndex, tokenEndIndex, position, context)
    this.body = body
  }

  getBody() {
    return this.body
  }

  toString() {
    const ctx = this.getContext()
    const printer = ctx.getPrinter()
    if (printer && printer.printBacketSyntax) {
      return printer.printBacketSyntax(this, (syntax) => syntax.toString())
    } else {
      return `(${this.getBody().toString()})`
    }
  }

  isText(){
    return this.body.isText();
  }

  visit() {
    const ctx = this.getContext()
    const visitor = ctx.getVisitor()
    let res = true
    if (visitor && visitor.visitBacketSyntax) {
      res = visitor.visitBacketSyntax(this)
    }
    if (res !== false) {
      this.getBody().visit()
    }
  }
}

export default BracketSyntax
