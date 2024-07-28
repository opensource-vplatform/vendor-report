export const getChild = function (childName, node) {
  const elements = node.elements;
  return elements?.find(
    (element) => element.type == 'element' && element.name == childName
  );
};

export const getText = function (node) {
  const elements = node.elements;
  const cdata = elements?.find((element) => element.type == 'cdata');
  if (cdata) {
    return cdata.cdata;
  }
  const text = elements?.find((element) => element.type == 'text');
  if (text) {
    return text.text;
  }
  return null;
};
