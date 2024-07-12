import {
  EqualToken,
  LessToken,
} from '../../../../../../tokenizer/index';
import ComparatorSyntax from '../ComparatorSyntax';

class GreaterThanSyntax extends ComparatorSyntax {
  static SYMBOL = '>'
  static extraAccept = function (context) {
    let index = context.getIndex()
    let tokens = context.getTokens()
    let token = tokens[index + 1]
    if (!(token instanceof EqualToken)) {
      token = tokens[index - 1]
      return !(token instanceof LessToken)
    }
    return false
  }

  static getWeight = function () {
    return 400
  }
  constructor(
    tokenStartIndex,
    tokenEndIndex,
    left,
    right,
    position,
    context
  ) {
    super(tokenStartIndex, tokenEndIndex, left, right, position, context)
  }

  getSymbol() {
    return GreaterThanSyntax.SYMBOL
  }

  toString() {
    const ctx = this.getContext()
    const printer = ctx.getPrinter()
    if (printer && printer.printGreaterThanSyntax) {
      return printer.printGreaterThanSyntax(this, (syntax) => syntax.toString())
    } else {
      return super.toString()
    }
  }

  visit() {
    const ctx = this.getContext(),
      visitor = ctx.getVisitor()
    let res = true
    if (visitor && visitor.visitGreaterThanSyntax) {
      res = visitor.visitGreaterThanSyntax(this)
    }
    if (res !== false) {
      this.getLeft().visit()
      this.getRight().visit()
    }
  }
}

export default GreaterThanSyntax
