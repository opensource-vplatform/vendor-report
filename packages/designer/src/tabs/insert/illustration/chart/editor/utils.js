export const getFieldDefines = function (dsList, code) {
  const define = dsList.find((item) => item.code == code);
  if (define) {
    return define.children || [];
  }
  return [];
};

export const toSelectOptions = function (dsList, code) {
  const defines = getFieldDefines(dsList, code);
  return defines.map((define) => {
    return { value: define.code, text: define.name };
  });
};
