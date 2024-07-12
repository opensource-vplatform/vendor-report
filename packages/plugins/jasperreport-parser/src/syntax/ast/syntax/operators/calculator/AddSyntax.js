import BinaryExpressionSyntax from '../BinaryExpressionSyntax';

/**
 * 加法运算符
 * 规范：**+**
 */
class AddSyntax extends BinaryExpressionSyntax {
  static SYMBOL = '+'

  static getWeight = function () {
    return 600
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
    return AddSyntax.SYMBOL
  }

  toString() {
    const ctx = this.getContext()
    const printer = ctx.getPrinter()
    if (printer && printer.printAddSyntax) {
      return printer.printAddSyntax(this, (syntax) => syntax.toString())
    } else {
      return super.toString()
    }
  }

  visit() {
    const ctx = this.getContext()
    const visitor = ctx.getVisitor()
    let res = true
    if (visitor && visitor.visitAddSyntax) {
      res = visitor.visitAddSyntax(this)
    }
    if (res !== false) {
      this.getLeft().visit()
      this.getRight().visit()
    }
  }
}

export default AddSyntax
