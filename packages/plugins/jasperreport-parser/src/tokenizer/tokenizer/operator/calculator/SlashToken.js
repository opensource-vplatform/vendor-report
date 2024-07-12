import OperatorToken from '../OperatorToken';

class SlashToken extends OperatorToken {
  static TOKEN = '/'

  constructor(value, lineIndex, colIndex) {
    super(value, lineIndex, colIndex)
  }
}

export default SlashToken
