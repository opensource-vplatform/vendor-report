import Token from '../Token';

class CommaToken extends Token {
  static TOKEN = ','

  constructor(value, lineIndex, colIndex) {
    super(value, lineIndex, colIndex)
  }
}

export default CommaToken
