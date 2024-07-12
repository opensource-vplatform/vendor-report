import GreaterOrEqualSyntax from './GreaterOrEqualSyntax';

class EscapeGreaterOrEqualSyntax extends GreaterOrEqualSyntax {
  static SYMBOL = '&gt;='
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

  getOperator() {
    return GreaterOrEqualSyntax.SYMBOL
  }

  getSymbol() {
    return EscapeGreaterOrEqualSyntax.SYMBOL
  }

  getDisplaySymbol() {
    return super.getSymbol()
  }
}

export default EscapeGreaterOrEqualSyntax
