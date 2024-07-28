export const isNumber = function (metadata, bindingPath) {
  const type = metadata.getType(bindingPath);
  return 'decimals' == type;
};
