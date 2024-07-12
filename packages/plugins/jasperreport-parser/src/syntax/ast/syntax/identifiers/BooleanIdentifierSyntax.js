import Position from '../../Position';
import Syntax from '../Syntax';

/**
 * 布尔常量
 * 规范：True，False
 */
class BooleanIdentifierSyntax extends Syntax {
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
    if (tokenStr == 't') {
      value = true
      endIndex = index + 3
      endToken = tokens[endIndex]
    } else {
      value = false
      endIndex = index + 4
      endToken = tokens[endIndex]
    }
    let position = new Position()
    position.parseStartToken(token)
    position.parseEndToken(endToken)
    return new BooleanIdentifierSyntax(index, endIndex, value, position, context)
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
    const ctx = this.getContext()
    const printer = ctx.getPrinter()
    if (printer && printer.printBooleanIdentifierSyntax) {
      return printer.printBooleanIdentifierSyntax(this, (syntax) => syntax.toString())
    } else {
      return this.getValue() ? 'true' : 'false'
    }
  }

  isText(){
    return true;
  }

  visit() {
    const ctx = this.getContext()
    const visitor = ctx.getVisitor()
    if (visitor && visitor.visitBooleanIdentifierSyntax) {
      visitor.visitBooleanIdentifierSyntax(this)
    }
  }
}

BooleanIdentifierSyntax.accept = function (context) {
  let token = context.getToken()
  let str = token.toString()
  if (str == 't' || str == 'f') {
    let index = context.getIndex()
    let tokens = context.getTokens()
    let exp = tokens.slice(index, index + 4).join('')
    if (exp == 'true') {
      return true
    } else if ((exp == 'fals') && index + 4 < tokens.length && tokens[index + 4].toString() == 'e') {
      return true
    }
  }
  return false
}

export default BooleanIdentifierSyntax
