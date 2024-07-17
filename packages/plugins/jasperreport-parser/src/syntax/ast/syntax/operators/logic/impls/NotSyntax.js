import {
  BlankToken,
  NotToken,
} from '../../../../../../tokenizer/index';
import { parseToSyntax } from '../../../../Parser';
import Position from '../../../../Position';
import Syntax from '../../../Syntax';

const getRightSyntax = function (index, tokens) {
  let result
  while (true) {
    index++
    if (index < tokens.length) {
      let token = tokens[index]
      if (!(token instanceof BlankToken)) {
        if (token instanceof Syntax) {
          result = {
            syntax: token,
            index: index
          }
        }
        break
      }
    } else {
      break
    }
  }
  return result
}

class NotSyntax extends Syntax {
  right

  static accept = function (context) {
    let token = context.getToken()
    return token instanceof NotToken
  }

  static parse = function (context) {
    let tokens = context.getTokens()
    let index = context.getIndex()
    let right = getRightSyntax(index, tokens)
    let tokenEndIndex, rightSyntax
    if (right) {
      tokenEndIndex = right.index
      rightSyntax = right.syntax
    } else {
      rightSyntax = parseToSyntax(tokens.slice(index + 1, tokens.length), context)
      tokenEndIndex = tokens.length - 1
    }
    let position = new Position()
    position.parseStartToken(tokens[index])
    position.parseEndToken(tokens[index])
    return new NotSyntax(index, tokenEndIndex, rightSyntax, position, context)
  }

  static getWeight = function () {
    return 800
  }
  constructor(
    tokenStartIndex,
    tokenEndIndex,
    right,
    position,
    context
  ) {
    super(tokenStartIndex, tokenEndIndex, position, context)
    this.right = right
  }

  getRight() {
    return this.right
  }

  toString() {
    const ctx = this.getContext()
    const printer = ctx.getPrinter()
    if (printer && printer.printNotSyntax) {
      return printer.printNotSyntax(this, (syntax) => syntax.toString())
    } else {
      let rigthSyntax = this.getRight()
      return `!${rigthSyntax ? rigthSyntax.toString() : ''}`
    }
  }

  visit() {
    const ctx = this.getContext(),
      visitor = ctx.getVisitor()
    let res = true
    if (visitor && visitor.visitNotSyntax) {
      res = visitor.visitNotSyntax(this)
    }
    if (res !== false) {
      this.getRight().visit()
    }
  }
}

export default NotSyntax