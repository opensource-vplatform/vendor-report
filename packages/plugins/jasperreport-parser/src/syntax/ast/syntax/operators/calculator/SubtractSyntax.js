import BinaryExpressionSyntax from '../BinaryExpressionSyntax';

/**
 * 减运算符
 */
class SubtractSyntax extends BinaryExpressionSyntax {
  static SYMBOL = '-'
  static getWeight = function () {
    return 601
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
    return SubtractSyntax.SYMBOL
  }

  toString() {
    const ctx = this.getContext()
    const printer = ctx.getPrinter()
    if (printer && printer.printSubtractSyntax) {
      return printer.printSubtractSyntax(this, (syntax) => syntax.toString())
    } else {
      return super.toString()
    }
  }

  visit() {
    const ctx = this.getContext(),
      visitor = ctx.getVisitor()
    let res = true
    if (visitor && visitor.visitSubtractSyntax) {
      res = visitor.visitSubtractSyntax(this)
    }
    if (res !== false) {
      this.getLeft().visit()
      this.getRight().visit()
    }
  }
}

export default SubtractSyntax
