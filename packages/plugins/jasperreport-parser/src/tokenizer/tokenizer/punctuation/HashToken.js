import Token from '../Token';

class HashToken extends Token {
  static TOKEN = '#'

  constructor(value, lineIndex, colIndex) {
    super(value, lineIndex, colIndex)
  }
}

export default HashToken
