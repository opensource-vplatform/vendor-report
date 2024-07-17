import AbstractValueSyntax from '../AbstractValueSyntax';

class ParameterSyntax extends AbstractValueSyntax {
  
  static SYMBOL = '$P';

  getSymbol(){
    return ParameterSyntax.SYMBOL;
  }

  visit() {
    const ctx = this.getContext(),
      visitor = ctx.getVisitor()
    if (visitor && visitor.visitParameterSyntax) {
      visitor.visitParameterSyntax(this)
    }
  }
}
/*import Position from '../../../Position';
import { isParameterSyntax } from '../../../utils/SyntaxUtils';
import { getVarIdentifierTokens } from '../../../utils/TokenUtils';
import Syntax from '../../Syntax';

class ParameterSyntax extends Syntax {
  
  code

  static accept = function (context) {
    let index = context.getIndex()
    let tokens = context.getTokens()
    return isParameterSyntax(index, tokens)
  }

  static parse = function (context) {
    let index = context.getIndex()
    let startIndex = index,
      startToken = context.getToken()
    let tokens = context.getTokens()
    //偏移$P{
    index += 3;
    let parameterTokens = getVarIdentifierTokens(index, tokens)
    let code = parameterTokens.join('')
    //偏移实体编号长度
    index += code.length
    let position = new Position()
    position.parseStartToken(startToken)
    position.parseEndToken(tokens[index])
    return new ParameterSyntax(startIndex, index, code, position, context)
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
    if (printer && printer.printParameterSyntax) {
      return printer.printParameterSyntax(this, (syntax) => syntax.toString())
    } else {
      return `$P{${this.getCode()}}`
    }
  }

  visit() {
    const ctx = this.getContext(),
      visitor = ctx.getVisitor()
    if (visitor && visitor.visitParameterSyntax) {
      visitor.visitParameterSyntax(this)
    }
  }
}*/

export default ParameterSyntax
