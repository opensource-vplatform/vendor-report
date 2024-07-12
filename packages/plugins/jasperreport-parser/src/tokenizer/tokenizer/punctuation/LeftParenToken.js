import Token from '../Token';

class LeftParenToken extends Token {
  static TOKEN = '('

  constructor(value, lineIndex, colIndex) {
    super(value, lineIndex, colIndex)
  }
  /**
   * 如果当前词后面跟‘-’字符时，true识别成减号，false识别为负号
   */
  isSubtractAhead() {
    return false
  }
}

export default LeftParenToken
