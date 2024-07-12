import GreaterThanSyntax from './GreaterThanSyntax';

class EscapeGreaterThanSyntax extends GreaterThanSyntax {
  static SYMBOL = '&gt;'

  static getWeight = function () {
    return 401
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
    return GreaterThanSyntax.SYMBOL
  }

  getDisplaySymbol() {
    return super.getSymbol()
  }
}

export default EscapeGreaterThanSyntax
