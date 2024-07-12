import OperatorToken from '../OperatorToken';

class StarToken extends OperatorToken {
  static TOKEN = '*'

  constructor(value, lineIndex, colIndex) {
    super(value, lineIndex, colIndex)
  }
}

export default StarToken
