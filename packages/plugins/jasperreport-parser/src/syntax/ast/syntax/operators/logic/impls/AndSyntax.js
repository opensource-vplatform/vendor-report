import LogicSyntax from '../LogicSyntax';

class AndSyntax extends LogicSyntax {
  static SYMBOL = '&&'
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

  getSymbol() {
    return AndSyntax.SYMBOL
  }

  toString() {
    const ctx = this.getContext()
    const printer = ctx.getPrinter()
    if (printer && printer.printAndSyntax) {
      return printer.printAndSyntax(this, (syntax) => syntax.toString())
    } else {
      return super.toString()
    }
  }
  visit() {
    const ctx = this.getContext(),
      visitor = ctx.getVisitor()
    let res = true
    if (visitor && visitor.visitAndSyntax) {
      res = visitor.visitAndSyntax(this)
    }
    if (res !== false) {
      this.getLeft().visit()
      this.getRight().visit()
    }
  }
}

export default AndSyntax
