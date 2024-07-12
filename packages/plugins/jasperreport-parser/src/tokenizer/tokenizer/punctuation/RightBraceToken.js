import Token from '../Token';

class RightBraceToken extends Token {
  static TOKEN = '}'

  constructor(value, lineIndex, colIndex) {
    super(value, lineIndex, colIndex)
  }
}

export default RightBraceToken
