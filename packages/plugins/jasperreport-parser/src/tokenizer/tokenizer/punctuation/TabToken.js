import Token from '../Token';

class TabToken extends Token {
  static TOKEN = '\t'

  constructor(value, lineIndex, colIndex) {
    super(value, lineIndex, colIndex)
  }

  isLineBreaked() {
    return true
  }

  isCanSkip() {
    return true
  }
}

export default TabToken
