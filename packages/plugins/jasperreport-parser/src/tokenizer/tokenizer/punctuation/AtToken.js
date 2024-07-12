import Token from '../Token';

class AtToken extends Token {
  static TOKEN = '@'

  constructor(value, lineIndex, colIndex) {
    super(value, lineIndex, colIndex)
  }
}

export default AtToken
