class Position {
  startLine

  endLine

  startCol

  endCol

  constructor(startLine, startCol, endLine, endCol) {
    this.startLine = startLine || 0
    this.startCol = startCol || 0
    this.endLine = endLine || 0
    this.endCol = endCol || 0
  }

  getStartLine() {
    return this.startLine
  }

  setStartLine(startLine) {
    this.startLine = startLine
    if (this.startLine > this.endLine) {
      this.endLine = this.startLine
    }
  }

  setLineOffset(offset) {
    this.startLine = this.startLine + offset
    this.endLine = this.endLine + offset
  }

  setColOffset(offset) {
    this.startCol = this.startCol + offset
    this.endCol = this.endCol + offset
  }

  getStartCol() {
    return this.startCol
  }

  setStartCol(startCol) {
    this.startCol = startCol
    if (this.startCol > this.endCol) {
      this.endCol = this.startCol
    }
  }

  getEndLine() {
    return this.endLine
  }

  setEndLine(endLine) {
    this.endLine = endLine
    if (this.endLine < this.startLine) {
      this.startLine = this.endLine
    }
  }

  getEndCol() {
    return this.endCol
  }

  clone() {
    return new Position(this.startLine, this.startCol, this.endLine, this.endCol)
  }

  parseStartToken(token) {
    this.startLine = token.getLineIndex()
    this.startCol = token.getColIndex()
  }

  parseStartSyntax(syntax) {
    let position = syntax.getPosition()
    this.startLine = position.getStartLine()
    this.startCol = position.getStartCol()
  }

  parseEndToken(token) {
    this.endLine = token.getLineIndex()
    this.endCol = token.getColIndex()
  }

  parseEndSyntax(syntax) {
    let position = syntax.getPosition()
    this.endLine = position.getEndLine()
    this.endCol = position.getEndCol()
  }

  has(lineIndex, columnIndex) {
    if (this.startLine == this.endLine) {
      return this.startLine == lineIndex && columnIndex >= this.startCol && columnIndex <= this.endCol
    } else {
      if (lineIndex > this.startLine && lineIndex < this.endLine) {
        return true
      } else if (lineIndex == this.startLine && columnIndex >= this.startCol) {
        return true
      } else if (lineIndex == this.endLine && columnIndex <= this.endCol) {
        return true
      }
    }
    return false
  }
}

export default Position
