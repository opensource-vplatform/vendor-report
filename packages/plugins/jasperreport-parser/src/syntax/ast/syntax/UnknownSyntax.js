import Syntax from './Syntax';

class UnknownSyntax extends Syntax {
  message

  tokens

  static accept = function (context) {
    return false
  }

  static parse = function (context){
    return null
  }

  static getWeight = function () {
    return 0
  }

  constructor(
    tokenStartIndex,
    tokenEndIndex,
    message,
    tokens,
    position,
    context
  ) {
    super(tokenStartIndex, tokenEndIndex, position, context)
    this.message = message
    this.tokens = tokens
  }

  getMessasge() {
    return this.message
  }

  toString() {
    const ctx = this.getContext()
    const printer = ctx.getPrinter()
    if (printer && printer.printUnknownSyntax) {
      return printer.printUnknownSyntax(this, (syntax) => syntax.toString())
    } else {
      const script = []
      if (this.tokens) {
        this.tokens.forEach((token) => {
          script.push(token.toString())
        })
      }
      return script.join('')
    }
  }

  visit() {
    const ctx = this.getContext()
    const visitor = ctx.getVisitor()
    if (visitor && visitor.visitUnknownSyntax) {
      throw Error('当前表达式解析错误！')
    }
  }
}

export default UnknownSyntax
