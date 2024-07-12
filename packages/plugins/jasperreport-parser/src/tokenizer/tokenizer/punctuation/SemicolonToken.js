import Token from '../Token';

class SemicolonToken extends Token {
  static TOKEN = ';'

  constructor(value, lineIndex, colIndex) {
    super(value, lineIndex, colIndex)
  }
}

export default SemicolonToken
