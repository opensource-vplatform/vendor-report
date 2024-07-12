import {
  EqualToken,
  GreateToken,
} from '../../../../../../tokenizer/index';
import ComparatorSyntax from '../ComparatorSyntax';

class LessThanSyntax extends ComparatorSyntax {
  static SYMBOL = '<'

  static extraAccept = function (context) {
    let index = context.getIndex()
    let tokens = context.getTokens()
    let token = tokens[index + 1]
    return !(token instanceof GreateToken) && !(token instanceof EqualToken)
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
    return LessThanSyntax.SYMBOL
  }

  toString() {
    const ctx = this.getContext()
    const printer = ctx.getPrinter()
    if (printer && printer.printLessThanSyntax) {
      return printer.printLessThanSyntax(this, (syntax) => syntax.toString())
    } else {
      return super.toString()
    }
  }
  visit() {
    const ctx = this.getContext(),
      visitor = ctx.getVisitor()
    let res = true
    if (visitor && visitor.visitLessThanSyntax) {
      res = visitor.visitLessThanSyntax(this)
    }
    if (res !== false) {
      this.getLeft().visit()
      this.getRight().visit()
    }
  }
}

export default LessThanSyntax
