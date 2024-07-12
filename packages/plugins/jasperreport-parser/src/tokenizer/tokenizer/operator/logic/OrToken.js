import OperatorToken from '../OperatorToken';

class OrToken extends OperatorToken {
  static TOKEN = '|'

  constructor(value, lineIndex, colIndex) {
    super(value, lineIndex, colIndex)
  }
}

export default OrToken
