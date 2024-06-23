export const getNavConfig = function (context, attr) {
  return context?.conf?.nav?.[attr] === false;
};

export const getNavViewConfig = function (context, attr) {
  return context?.conf?.nav?.view?.[attr] === false;
};

export const getNavTableConfig = function (context, attr) {
  return context?.conf?.nav?.table?.[attr] === false;
};

export const getNavStartConfig = function (context, attr) {
  return context?.conf?.nav?.start?.[attr] === false;
};

export const getNavFileConfig = function (context, attr) {
  return context?.conf?.nav?.file?.[attr] === false;
};

export const getNavSparklinesConfig = function (context, attr) {
  return context?.conf?.nav?.sparklines?.[attr] === false;
};

export const getNavFormulaConfig = function (context, attr) {
  return context?.conf?.nav?.sparklines?.[attr] === false;
};

export const getDataSourceConfig = function (context, attr) {
  return context?.conf?.dataSource?.[attr] === false;
};

export const getLicense = function (context) {
  return context?.conf?.license;
};

export const isLocalLicenseUnCheck = function (context) {
  return context?.conf?.localLicenseUnCheck;
};

export const getToolbar = function (context) {
  return Array.isArray(context?.conf?.toolbar) ? context?.conf?.toolbar : [];
};

export const getNavToolbarIsShow = function (context, attr) {
  return context?.conf?.nav?.toolbar?.[attr] === false;
};

/**
 * 获取整数字段默认格式
 * @param {*} context
 * @returns
 */
export const getIntegerFieldFormatter = function (context) {
  return context?.conf?.defaults?.formatter?.integer;
};

/**
 * 获取小数字段默认格式
 * @param {*} context
 * @returns
 */
export const getDecimalsFieldFormatter = function (context) {
  return context?.conf.defaults?.formatter?.decimals;
};

/**
 * 获取文本字段默认格式
 * @param {*} context
 * @returns
 */
export const getTextFieldFormatter = function (context) {
  return context?.conf?.defaults?.formatter?.text;
};
