import Token from './Token';

class UnknownToken extends Token {
  static ORDER = 0

  static accept = function (char) {
    return true
  }

  static parse = function (char, lineIndex, colIndex) {
    return new UnknownToken(char, lineIndex, colIndex)
  }

  constructor(value, lineIndex, colIndex) {
    super(value, lineIndex, colIndex)
  }

  isCanSkip() {
    return false
  }
}

export default UnknownToken
