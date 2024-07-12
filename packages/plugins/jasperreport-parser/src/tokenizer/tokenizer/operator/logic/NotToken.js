import OperatorToken from '../OperatorToken';

class NotToken extends OperatorToken {
  static TOKEN = '!'

  constructor(value, lineIndex, colIndex) {
    super(value, lineIndex, colIndex)
  }
}

export default NotToken
