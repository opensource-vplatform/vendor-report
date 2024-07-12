import Token from '../Token';

class OperatorToken extends Token {
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

export default OperatorToken
