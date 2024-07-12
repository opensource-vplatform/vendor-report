class Syntax {
  tokenStartIndex;

  tokenEndIndex;

  position;

  context;

  static accept = function (context) {
    return false;
  };

  static parse = function (context) {
    return null;
  };

  static INDENT_CHAR = '\t';

  constructor(tokenStartIndex, tokenEndIndex, position, context) {
    this.tokenStartIndex = tokenStartIndex;
    this.tokenEndIndex = tokenEndIndex;
    this.position = position;
    this.context = context;
  }

  getPosition() {
    return this.position;
  }

  getContext() {
    return this.context;
  }

  toString() {
    return '';
  }

  getTokenStartIndex() {
    return this.tokenStartIndex;
  }

  getTokenEndIndex() {
    return this.tokenEndIndex;
  }

  /**
   * 是否为普通文本
   * @returns 
   */
  isText(){
    return false;
  }

  visit() {}
}

export default Syntax;
