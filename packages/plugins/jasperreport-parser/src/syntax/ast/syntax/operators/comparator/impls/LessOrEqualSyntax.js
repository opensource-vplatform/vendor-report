import ComparatorSyntax from '../ComparatorSyntax';

class LessOrEqualSyntax extends ComparatorSyntax {
  static SYMBOL = '<='
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

  getSymbol() {
    return LessOrEqualSyntax.SYMBOL
  }

  toString() {
    const ctx = this.getContext()
    const printer = ctx.getPrinter()
    if (printer && printer.printLessOrEqualSyntax) {
      return printer.printLessOrEqualSyntax(this, (syntax) => syntax.toString())
    } else {
      return super.toString()
    }
  }
  visit() {
    const ctx = this.getContext(),
      visitor = ctx.getVisitor()
    let res = true
    if (visitor && visitor.visitLessOrEqualSyntax) {
      res = visitor.visitLessOrEqualSyntax(this)
    }
    if (res !== false) {
      this.getLeft().visit()
      this.getRight().visit()
    }
  }
}

export default LessOrEqualSyntax
