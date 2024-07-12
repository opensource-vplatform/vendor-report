import Token from '../Token';

class BackSlashToken extends Token {
  static TOKEN = '\\'

  constructor(value, lineIndex, colIndex) {
    super(value, lineIndex, colIndex)
  }
}

export default BackSlashToken
