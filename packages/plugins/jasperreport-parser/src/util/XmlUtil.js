export const getChild = function (childName, node) {
  const elements = node.elements;
  return elements?.find(
    (element) => element.type == 'element' && element.name == childName
  );
};

const removeBreakLine = function(text){
  if(typeof text == 'string'){
    return text.replaceAll('\n','');
  }
  return text;
}

export const getText = function (node) {
  const elements = node.elements;
  const cdata = elements?.find((element) => element.type == 'cdata');
  if (cdata) {
    return removeBreakLine(cdata.cdata);
  }
  const text = elements?.find((element) => element.type == 'text');
  if (text) {
    return removeBreakLine(text.text);
  }
  return null;
};
