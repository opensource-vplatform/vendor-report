import AndSyntax from './AndSyntax';

class EscapeAndSyntax extends AndSyntax {
  static SYMBOL = '&amp;&amp;'
  static getWeight = function () {
    return 301
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
    return EscapeAndSyntax.SYMBOL
  }

  getDisplaySymbol() {
    return super.getSymbol()
  }
}

export default EscapeAndSyntax
