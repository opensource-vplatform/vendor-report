export const getChild = function (childName, node) {
  const elements = node.elements;
  return elements?.find(
    (element) => element.type == 'element' && element.name == childName
  );
};

export const getChildByPath = function(paths,node){
  const [path] = paths.splice(0,1);
  const child = getChild(path,node);
  if(paths.length>0){
    return getChildByPath(paths,child);
  }else{
    return child;
  }
}

const removeBreakLine = function(text){
  if(typeof text == 'string'){
    return text.replaceAll('\\n','');
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
