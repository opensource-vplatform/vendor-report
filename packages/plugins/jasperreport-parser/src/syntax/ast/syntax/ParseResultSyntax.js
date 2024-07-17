import Position from '../Position';
import Syntax from './Syntax';

class ParseResultSyntax extends Syntax {
  syntaxs

  constructor(syntaxs, context) {
    let tokenStartIndex, tokenEndIndex, position
    if (syntaxs.length > 0) {
      let first = syntaxs[0],
        last = syntaxs[syntaxs.length - 1]
      tokenStartIndex = first.getTokenStartIndex()
      tokenEndIndex = last.getTokenEndIndex()
      let firstPosition = first.getPosition()
      let lastPosition = last.getPosition()
      position = new Position(
        firstPosition.getStartLine(),
        firstPosition.getStartCol(),
        lastPosition.getEndLine(),
        lastPosition.getEndCol()
      )
    } else {
      tokenEndIndex = tokenStartIndex = 0
      position = new Position(0, 0, 0, 0)
    }
    super(tokenStartIndex, tokenEndIndex, position, context)
    this.syntaxs = syntaxs
  }

  toString() {
    const ctx = this.getContext()
    const printer = ctx.getPrinter()
    if (printer && printer.printParseResultSyntax) {
      return printer.printParseResultSyntax(this, (syntax) => syntax.toString())
    } else {
      let script = []
      this.syntaxs.forEach((syntax) => {
        script.push(syntax.toString())
      })
      return script.join('')
    }
  }

  getSyntaxs() {
    return this.syntaxs
  }

  visit() {
    const ctx = this.getContext()
    const visitor = ctx.getVisitor()
    if (visitor && visitor.visitParseResultSyntax) {
      return visitor.visitParseResultSyntax(this)
    } else {
      this.syntaxs.forEach((syntax) => {
        syntax.visit()
      })
    }
  }
}

export default ParseResultSyntax