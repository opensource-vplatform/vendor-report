class SyntaxParseError {
  error

  syntax

  constructor(error, syntax) {
    this.error = error
    this.syntax = syntax
  }

  getError() {
    return this.error
  }

  getSyntax() {
    return this.syntax
  }
}

export default SyntaxParseError
