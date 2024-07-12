import Token from '../Token';

class LeftBraceToken extends Token {
  static TOKEN = '{'

  constructor(value, lineIndex, colIndex) {
    super(value, lineIndex, colIndex)
  }
}

export default LeftBraceToken
