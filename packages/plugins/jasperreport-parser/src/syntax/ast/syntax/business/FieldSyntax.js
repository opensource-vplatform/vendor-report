import Position from '../../Position';
import { isFieldSyntax } from '../../utils/SyntaxUtils';
import { getVarIdentifierTokens } from '../../utils/TokenUtils';
import Syntax from '../Syntax';

class FieldSyntax extends Syntax {
  
  code

  static accept = function (context) {
    let index = context.getIndex()
    let tokens = context.getTokens()
    return isFieldSyntax(index, tokens)
  }

  static parse = function (context) {
    let index = context.getIndex()
    let startIndex = index,
      startToken = context.getToken()
    let tokens = context.getTokens()
    //偏移$F{
    index += 3;
    let fieldTokens = getVarIdentifierTokens(index, tokens)
    let code = fieldTokens.join('')
    //偏移实体编号长度
    index += code.length
    let position = new Position()
    position.parseStartToken(startToken)
    position.parseEndToken(tokens[index])
    return new FieldSyntax(startIndex, index, code, position, context)
  }

  static getWeight = function () {
    return 1100
  }
  constructor(
    startTokenIndex,
    endTokenIndex,
    code,
    position,
    context
  ) {
    super(startTokenIndex, endTokenIndex, position, context)
    this.code = code;
  }

  getCode() {
    return this.code
  }

  toString() {
    const ctx = this.getContext()
    const printer = ctx.getPrinter()
    if (printer && printer.printFieldSyntax) {
      return printer.printFieldSyntax(this, (syntax) => syntax.toString())
    } else {
      return `$F{${this.getCode()}}`
    }
  }

  visit() {
    const ctx = this.getContext(),
      visitor = ctx.getVisitor()
    if (visitor && visitor.visitFieldSyntax) {
      visitor.visitFieldSyntax(this)
    }
  }
}

export default FieldSyntax
