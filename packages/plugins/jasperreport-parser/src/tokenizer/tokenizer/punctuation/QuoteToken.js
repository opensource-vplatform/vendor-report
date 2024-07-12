import Token from '../Token';

class QuoteToken extends Token {
  static TOKEN = '"'

  constructor(value, lineIndex, colIndex) {
    super(value, lineIndex, colIndex)
  }
}

export default QuoteToken
