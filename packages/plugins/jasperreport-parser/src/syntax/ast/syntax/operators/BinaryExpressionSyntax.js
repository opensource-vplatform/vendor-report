import { BlankToken } from '../../../../tokenizer/index';
import { parseToSyntax } from '../../Parser';
import Position from '../../Position';
import Syntax from '../Syntax';

const getLeftSyntax = function (index, tokens) {
  let result
  while (true) {
    index--
    if (index > -1) {
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

/**
 * 二元表达式基类
 */
class BinaryExpressionSyntax extends Syntax {
  left

  right

  static SYMBOL = ''

  static accept = function (context) {
    let tokens = context.getTokens()
    let index = context.getIndex()
    let symbols = tokens.slice(index, index + this.SYMBOL.length)
    return symbols.join('') == this.SYMBOL && this.extraAccept(context)
  }

  static extraAccept = function (context) {
    return true
  }

  static parse = function (context) {
    let tokens = context.getTokens()
    let index = context.getIndex()
    let left = getLeftSyntax(index, tokens)
    let tokenStartIndex, tokenEndIndex, leftSyntax, rightSyntax
    let position = new Position()
    if (left) {
      tokenStartIndex = left.index
      leftSyntax = left.syntax
    } else {
      tokenStartIndex = 0
      leftSyntax = parseToSyntax(tokens.slice(0, index), context)
    }
    let right = getRightSyntax(index + this.SYMBOL.length - 1, tokens)
    if (right) {
      tokenEndIndex = right.index
      rightSyntax = right.syntax
    } else {
      tokenEndIndex = tokens.length - 1
      rightSyntax = parseToSyntax(tokens.slice(index + 2, tokens.length), context)
    }
    position.parseStartToken(tokens[index])
    position.parseEndToken(tokens[index + this.SYMBOL.length - 1])
    return new this(tokenStartIndex, tokenEndIndex, leftSyntax, rightSyntax, position, context)
  }

  constructor(
    tokenStartIndex,
    tokenEndIndex,
    left,
    right,
    position,
    context
  ) {
    super(tokenStartIndex, tokenEndIndex, position, context)
    this.left = left
    this.right = right
  }

  getLeft() {
    return this.left
  }

  getRight() {
    return this.right
  }

  getSymbol(){}

  getDisplaySymbol() {
    return
  }

  toString() {
    let script = []
    let leftSyntax = this.getLeft()
    if (leftSyntax) {
      //script.push(' ')
      script.push(leftSyntax.toString())
    }
    this.constructor.toString()
    let displaySymbol = this.getDisplaySymbol()
    if (typeof displaySymbol == 'undefined') {
      displaySymbol = this.getSymbol()
    }
    script.push(displaySymbol)
    let rightSyntax = this.getRight()
    if (rightSyntax) {
      script.push(rightSyntax.toString())
      //script.push(' ')
    }
    return script.join('')
  }
}

export default BinaryExpressionSyntax
