import OperatorToken from '../OperatorToken';

class AndToken extends OperatorToken {
  static TOKEN = '&'

  constructor(value, lineIndex, colIndex) {
    super(value, lineIndex, colIndex)
  }
}

export default AndToken
