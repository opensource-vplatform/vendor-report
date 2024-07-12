import Token from '../Token';

class BlankToken extends Token {
  static TOKEN = ' '

  constructor(value, lineIndex, colIndex) {
    super(value, lineIndex, colIndex)
  }

  isCanSkip() {
    return true
  }
}

export default BlankToken
