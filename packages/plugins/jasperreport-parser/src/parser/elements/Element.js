import { createChildren as create } from './Factory';

class Element {
  constructor(node, context) {
    this.node = node;
    this.context = context;
  }

  createChildren(node) {
    node = node || this.node;
    return create(node);
  }

  getIntegerAttr(attr, node) {
    return parseInt(this.getAttribute(attr, node));
  }

  getBooleanAttr(attr,node){
    const val = this.getAttribute(attr,node);
    return val == 'true';
  }

  getAttribute(attr, node, def=null) {
    node = node || this.node;
    const attributes = node.attributes;
    return attributes ? attributes[attr] : def;
  }

  getNode() {
    return this.node;
  }

  parse(context) {}
}

export default Element;
