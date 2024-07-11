import { createChildren as create } from './Factory';

class Element {
  constructor(node, context) {
    this.node = node;
    this.context = context;
  }

  createChildren() {
    return create(this.node);
  }

  getIntegerAttr(attr, node) {
    return parseInt(this.getAttribute(attr, node));
  }

  toAttrName(attr) {
    return '@_' + attr;
  }

  getAttribute(attr, node) {
    node = node || this.node;
    return node[this.toAttrName(attr)];
  }

  getNode() {
    return this.node;
  }

  parse(context) {}
}

export default Element;
