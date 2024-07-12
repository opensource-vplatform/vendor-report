import OperatorToken from '../OperatorToken';

class MinusToken extends OperatorToken {
  static TOKEN = '-'

  constructor(value, lineIndex, colIndex) {
    super(value, lineIndex, colIndex)
  }
}

export default MinusToken
