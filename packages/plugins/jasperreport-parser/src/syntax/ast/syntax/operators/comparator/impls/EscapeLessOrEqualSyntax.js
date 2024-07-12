import LessOrEqualSyntax from './LessOrEqualSyntax';

class EscapeLessOrEqualSyntax extends LessOrEqualSyntax {
  static SYMBOL = '&lt;='
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
    return EscapeLessOrEqualSyntax.SYMBOL
  }

  getDisplaySymbol() {
    return super.getSymbol()
  }
}

export default EscapeLessOrEqualSyntax
