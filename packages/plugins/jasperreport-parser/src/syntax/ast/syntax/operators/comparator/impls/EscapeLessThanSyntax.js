import {
  EqualToken,
  GreateToken,
} from '../../../../../../tokenizer/index';
import LessThanSyntax from './LessThanSyntax';

class EscapeLessThanSyntax extends LessThanSyntax {
  static SYMBOL = '&lt;'

  static extraAccept = function (context) {
    let index = context.getIndex()
    let tokens = context.getTokens()
    let token = tokens[index + 1]
    return !(token instanceof GreateToken) && !(token instanceof EqualToken)
  }

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
    return EscapeLessThanSyntax.SYMBOL
  }

  getDisplaySymbol() {
    return super.getSymbol()
  }
}

export default EscapeLessThanSyntax
