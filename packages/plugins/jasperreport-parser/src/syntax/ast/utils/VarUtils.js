export const isVarChar = function (chr) {
  return isWordChar(chr) || isNumberChar(chr) || isUnderScoreChar(chr)
}

export const isFuncVarChar = function(chr){
  return isVarChar(chr) || isDotChar(chr);
}

export const isWordChar = function (chr) {
  return isLowerCaseWordChar(chr) || isUpperCaseWordChar(chr)
}

export const isLowerCaseWordChar = function (chr) {
  return chr >= 'a' && chr <= 'z'
}

export const isUpperCaseWordChar = function (chr) {
  return chr >= 'A' && chr <= 'Z'
}

export const isNumberChar = function (chr) {
  return chr >= '0' && chr <= '9'
}

export const isUnderScoreChar = function (chr) {
  return chr == '_'
}

const isDotChar = function(chr){
  return chr == '.';
}

export const getWordIdentifier = function (startIndex, expression) {
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
export const getPositiveNumber = function (startIndex, expression) {
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
