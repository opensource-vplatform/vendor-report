import Token from '../Token';

class DotToken extends Token {
  static TOKEN = '.'

  constructor(value, lineIndex, colIndex) {
    super(value, lineIndex, colIndex)
  }
}

export default DotToken
