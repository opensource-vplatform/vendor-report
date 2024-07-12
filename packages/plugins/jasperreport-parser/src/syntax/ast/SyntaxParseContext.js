class SyntaxParseContext {
  index
  tokens
  printer
  visitor
  children = []
  constructor(index, tokens, printer, visitor) {
    this.index = index
    this.tokens = tokens
    this.printer = printer
    this.visitor = visitor
  }

  getIndex() {
    return this.index
  }

  setIndex(index) {
    this.index = index
  }

  getTokens() {
    return this.tokens
  }

  setTokens(tokens) {
    this.tokens = tokens
  }

  getToken() {
    return this.tokens[this.index]
  }

  getPrinter() {
    return this.printer
  }

  setPrinter(printer) {
    this.printer = printer
    this.children.forEach((child) => {
      child.setPrinter(printer)
    })
  }

  setVisitor(visitor) {
    this.visitor = visitor
    this.children.forEach((child) => {
      child.setVisitor(visitor)
    })
  }

  getVisitor() {
    return this.visitor
  }

  joinParentContext(ctx) {
    if (ctx) {
      if (ctx.children.indexOf(this) == -1) {
        ctx.children.push(this)
      }
    }
  }
}

export default SyntaxParseContext
