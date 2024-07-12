const Attr_Prefix = '@_';

const Text_Attr = '#text';

export const isAttr = function (attr) {
  return attr && attr.startsWith(Attr_Prefix);
};

export const toAttrName = function (attr) {
  return Attr_Prefix + attr;
};

export const isText = function(attr){
    return attr === Text_Attr;
}

export const isChild = function(attr){
    return !(isAttr(attr)||isText(attr))
}

export const getTextName = function(){
    return Text_Attr;
}
