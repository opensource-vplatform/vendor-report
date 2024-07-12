import ComparatorSyntax from '../ComparatorSyntax';

class NotEqualSyntax extends ComparatorSyntax {
  static SYMBOL = '<>'
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
    return NotEqualSyntax.SYMBOL
  }

  toString() {
    const ctx = this.getContext()
    const printer = ctx.getPrinter()
    if (printer && printer.printNotEqualSyntax) {
      return printer.printNotEqualSyntax(this, (syntax) => syntax.toString())
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

export default NotEqualSyntax
