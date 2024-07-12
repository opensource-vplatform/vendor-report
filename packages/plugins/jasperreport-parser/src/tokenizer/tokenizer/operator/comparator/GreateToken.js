import OperatorToken from '../OperatorToken';

class GreateToken extends OperatorToken {
  static TOKEN = '>'

  constructor(value, lineIndex, colIndex) {
    super(value, lineIndex, colIndex)
  }
}

export default GreateToken
