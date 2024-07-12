import OperatorToken from '../OperatorToken';

class LessToken extends OperatorToken {
  static TOKEN = '<'

  constructor(value, lineIndex, colIndex) {
    super(value, lineIndex, colIndex)
  }
}

export default LessToken
