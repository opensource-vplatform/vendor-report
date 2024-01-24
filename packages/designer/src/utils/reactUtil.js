export const isReactNode = function(node){
  return typeof node === 'object' && typeof node.$$typeof === 'symbol' && node.$$typeof.toString() === 'Symbol(react.element)';
};