import Token from '../Token';

class LeftBracketToken extends Token {
  static TOKEN = '['

  constructor(value, lineIndex, colIndex) {
    super(value, lineIndex, colIndex)
  }
}

export default LeftBracketToken
