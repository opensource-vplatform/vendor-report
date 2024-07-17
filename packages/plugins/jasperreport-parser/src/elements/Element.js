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

  getAttribute(attr, node) {
    node = node || this.node;
    const attributes = node.attributes;
    return attributes ? attributes[attr] : null;
  }

  getNode() {
    return this.node;
  }

  parse(context) {}
}

export default Element;