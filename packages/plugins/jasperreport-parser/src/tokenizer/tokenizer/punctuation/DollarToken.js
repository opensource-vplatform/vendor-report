import Token from '../Token';

class DollarToken extends Token {
  static TOKEN = '$'

  constructor(value, lineIndex, colIndex) {
    super(value, lineIndex, colIndex)
  }
}

export default DollarToken