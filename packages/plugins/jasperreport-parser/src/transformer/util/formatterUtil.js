const Formatter = {
  '###0.000': '0.000',
  '###0': '0',
  '###0.00': '0.00',
  '0.000': '0.000',
  '###0.00;(-###0.00)': '###0.00;(-###0.00)',
};

export const convertFormatter = function (formatter) {
  /*const result = Formatter[formatter];
  if (typeof result == 'undefined') {
    throw Error('未识别格式：' + formatter);
  }
  return result;*/
  return formatter;
};

const NUM_FORMATTER_REG = /[#0]/;

/**
 * 是否为数值格式
 * @param {*} formatter
 */
export const isNumberFormatter = function (formatter) {
  return formatter && NUM_FORMATTER_REG.test(formatter);
};
