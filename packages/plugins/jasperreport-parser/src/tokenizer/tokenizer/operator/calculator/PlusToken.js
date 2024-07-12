import OperatorToken from '../OperatorToken';

class PlusToken extends OperatorToken {
  static TOKEN = '+'

  constructor(value, lineIndex, colIndex) {
    super(value, lineIndex, colIndex)
  }
}

export default PlusToken
