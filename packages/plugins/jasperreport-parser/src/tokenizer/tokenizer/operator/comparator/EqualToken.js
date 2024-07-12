import OperatorToken from '../OperatorToken';

class EqualToken extends OperatorToken {
  static TOKEN = '='

  constructor(value, lineIndex, colIndex) {
    super(value, lineIndex, colIndex)
  }
}

export default EqualToken
