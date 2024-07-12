import { isNumberChar } from '../../utils/VarUtils';
import Token from '../Token';

class NumberToken extends Token {
  static accept = function (char) {
    return isNumberChar(char)
  }

  constructor(value, lineIndex, colIndex) {
    super(value, lineIndex, colIndex)
  }
}

export default NumberToken
