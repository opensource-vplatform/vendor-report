import LogicSyntax from '../LogicSyntax';

class OrSyntax extends LogicSyntax {
  static SYMBOL = '||'

  static getWeight = function () {
    return 300
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
    return OrSyntax.SYMBOL
  }

  getSymbol() {
    return this.getOperator()
  }

  toString() {
    const ctx = this.getContext()
    const printer = ctx.getPrinter()
    if (printer && printer.printOrSyntax) {
      return printer.printOrSyntax(this, (syntax) => syntax.toString())
    } else {
      return super.toString()
    }
  }
  visit() {
    const ctx = this.getContext(),
      visitor = ctx.getVisitor()
    let res = true
    if (visitor && visitor.visitOrSyntax) {
      res = visitor.visitOrSyntax(this)
    }
    if (res !== false) {
      this.getLeft().visit()
      this.getRight().visit()
    }
  }
}

export default OrSyntax
