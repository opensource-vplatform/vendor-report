import BinaryExpressionSyntax from '../BinaryExpressionSyntax';

/**
 * 乘运算符
 */
class MultiplySyntax extends BinaryExpressionSyntax {
  static SYMBOL = '*'
  static getWeight = function () {
    return 700
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
    return MultiplySyntax.SYMBOL
  }

  toString() {
    const ctx = this.getContext()
    const printer = ctx.getPrinter()
    if (printer && printer.printMultiplySyntax) {
      return printer.printMultiplySyntax(this, (syntax) => syntax.toString())
    } else {
      return super.toString()
    }
  }

  visit() {
    const ctx = this.getContext(),
      visitor = ctx.getVisitor()
    let res = true
    if (visitor && visitor.visitMultiplySyntax) {
      res = visitor.visitMultiplySyntax(this)
    }
    if (res !== false) {
      this.getLeft().visit()
      this.getRight().visit()
    }
  }
}

export default MultiplySyntax
