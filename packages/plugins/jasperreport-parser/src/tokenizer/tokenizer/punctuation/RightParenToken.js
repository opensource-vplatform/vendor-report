import Token from '../Token';

class RightParenToken extends Token {
  static TOKEN = ')'

  constructor(value, lineIndex, colIndex) {
    super(value, lineIndex, colIndex)
  }
}

export default RightParenToken
