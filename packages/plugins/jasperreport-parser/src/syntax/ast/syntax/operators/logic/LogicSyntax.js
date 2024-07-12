import BinaryExpressionSyntax from '../BinaryExpressionSyntax';

class LogicSyntax extends BinaryExpressionSyntax {
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
}

export default LogicSyntax
