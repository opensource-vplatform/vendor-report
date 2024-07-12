import NotEqualSyntax from './NotEqualSyntax';

class EscapeNotEqualSyntax extends NotEqualSyntax {
  static SYMBOL = '&lt;&gt;'
  static getWeight = function () {
    return 501
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
    return EscapeNotEqualSyntax.SYMBOL
  }

  getDisplaySymbol() {
    return super.getSymbol()
  }
}

export default EscapeNotEqualSyntax
