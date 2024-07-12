import BinaryExpressionSyntax from '../BinaryExpressionSyntax';

/**
 * 除运算符
 */
class DivideSyntax extends BinaryExpressionSyntax {
  static SYMBOL = '/'
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
    return DivideSyntax.SYMBOL
  }

  toString() {
    const ctx = this.getContext()
    const printer = ctx.getPrinter()
    if (printer && printer.printDivideSyntax) {
      return printer.printDivideSyntax(this, (syntax) => syntax.toString())
    } else {
      return super.toString()
    }
  }

  visit() {
    const ctx = this.getContext()
    const visitor = ctx.getVisitor()
    let res = true
    if (visitor && visitor.visitDivideSyntax) {
      res = visitor.visitDivideSyntax(this)
    }
    if (res !== false) {
      this.getLeft().visit()
      this.getRight().visit()
    }
  }
}

export default DivideSyntax
