import Token from '../Token';

class UnderScoreToken extends Token {
  static TOKEN = '_'

  constructor(value, lineIndex, colIndex) {
    super(value, lineIndex, colIndex)
  }
}

export default UnderScoreToken
