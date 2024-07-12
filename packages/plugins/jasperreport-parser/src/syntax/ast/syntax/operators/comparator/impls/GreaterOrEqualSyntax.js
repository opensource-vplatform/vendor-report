import ComparatorSyntax from '../ComparatorSyntax';

class GreaterOrEqualSyntax extends ComparatorSyntax {
  static SYMBOL = '>='
  static getWeight = function () {
    return 500
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

  getOperator() {
    return GreaterOrEqualSyntax.SYMBOL
  }

  getSymbol() {
    return GreaterOrEqualSyntax.SYMBOL
  }

  toString() {
    const ctx = this.getContext()
    const printer = ctx.getPrinter()
    if (printer && printer.printGreaterOrEqualSyntax) {
      return printer.printGreaterOrEqualSyntax(this, (syntax) => syntax.toString())
    } else {
      return super.toString()
    }
  }
  visit() {
    const ctx = this.getContext(),
      visitor = ctx.getVisitor()
    let res = true
    if (visitor && visitor.visitGreaterOrEqualSyntax) {
      res = visitor.visitGreaterOrEqualSyntax(this)
    }
    if (res !== false) {
      this.getLeft().visit()
      this.getRight().visit()
    }
  }
}

export default GreaterOrEqualSyntax
