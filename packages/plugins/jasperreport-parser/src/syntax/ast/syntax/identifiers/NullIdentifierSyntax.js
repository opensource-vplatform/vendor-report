import Position from '../../Position';
import Syntax from '../Syntax';

/**
 * 布尔常量
 * 规范：True，False
 */
class NullIdentifierSyntax extends Syntax {
  value

  static getWeight = function () {
    return 1000
  }

  static parse = function (context) {
    let token = context.getToken()
    let index = context.getIndex()
    let tokens = context.getTokens()
    let tokenStr = token.toString()
    let value, endToken, endIndex
    value = null
    if (tokenStr == 'n') {
      endIndex = index + 3
      endToken = tokens[endIndex]
    }
    let position = new Position()
    position.parseStartToken(token)
    position.parseEndToken(endToken)
    return new NullIdentifierSyntax(index, endIndex, value, position, context)
  }

  constructor(
    startTokenIndex,
    endTokenIndex,
    value,
    position,
    context
  ) {
    super(startTokenIndex, endTokenIndex, position, context)
    this.value = value
  }

  getValue() {
    return this.value
  }

  toString() {
    return 'null'
  }

  isText(){
    return true;
  }

  visit() {
    const ctx = this.getContext()
    const visitor = ctx.getVisitor()
    if (visitor && visitor.visitNullIdentifierSyntax) {
      visitor.visitNullIdentifierSyntax(this)
    }
  }
}

NullIdentifierSyntax.accept = function (context) {
  let token = context.getToken()
  let str = token.toString()
  if (str == 'n') {
    let index = context.getIndex()
    let tokens = context.getTokens()
    let exp = tokens.slice(index, index + 4).join('')
    if (exp == 'null') {
      return true
    }
  }
  return false
}

export default NullIdentifierSyntax
