class SyntaxParseResult {
  syntax

  postion

  constructor(syntax, postion) {
    this.syntax = syntax
    this.postion = postion
  }

  getSyntax() {
    return this.syntax
  }

  getPosition() {
    return this.postion
  }
}

export default SyntaxParseResult
