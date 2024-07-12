import { isWordChar } from '../../utils/VarUtils';
import Token from '../Token';

class WordToken extends Token {
  constructor(value, lineIndex, colIndex) {
    super(value, lineIndex, colIndex)
  }
}

WordToken.accept = function (char) {
  return isWordChar(char)
}

export default WordToken
