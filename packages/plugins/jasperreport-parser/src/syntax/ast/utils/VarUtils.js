const isVarChar = function (chr) {
  return isWordChar(chr) || isNumberChar(chr) || isUnderScoreChar(chr)
}

const isVarCharToken = function (token) {}

const isWordChar = function (chr) {
  return isLowerCaseWordChar(chr) || isUpperCaseWordChar(chr)
}

const isLowerCaseWordChar = function (chr) {
  return chr >= 'a' && chr <= 'z'
}

const isUpperCaseWordChar = function (chr) {
  return chr >= 'A' && chr <= 'Z'
}

const isNumberChar = function (chr) {
  return chr >= '0' && chr <= '9'
}

const isUnderScoreChar = function (chr) {
  return chr == '_'
}

const getWordIdentifier = function (startIndex, expression) {
  let word = '',
    index = startIndex
  while (true) {
    let chr = expression.charAt(index++)
    if (isWordChar(chr)) {
      word += chr
    } else {
      break
    }
  }
  return word
}

/**
 * 获取非负数值
 */
const getPositiveNumber = function (startIndex, expression) {
  let code = [],
    index = startIndex
  while (true) {
    let chr = expression.charAt(index++)
    if (isNumberChar(chr) || (chr == '.' && chr.indexOf('.') == -1)) {
      code.push(chr)
    } else {
      break
    }
  }
  let res = ''
  while (code.length > 0) {
    res = code.join('')
    if (res == new Number(res).toString()) {
      break
    } else {
      code.pop()
    }
  }
  return res
}

export {
  getPositiveNumber,
  getWordIdentifier,
  isLowerCaseWordChar,
  isNumberChar,
  isUnderScoreChar,
  isUpperCaseWordChar,
  isVarChar,
  isVarCharToken,
  isWordChar,
};
