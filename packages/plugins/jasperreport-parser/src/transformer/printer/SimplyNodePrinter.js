import { create } from './Factory';
import Printer from './Printer';

class SimplyNodePrinter extends Printer {
  getAttrName() {
    return '';
  }

  getChildren() {
    if (!this.childrenInstances) {
      this.childrenInstances = [];
      const node = this.getNode();
      let attrNames = this.getAttrName();
      attrNames = Array.isArray(attrNames) ? attrNames : [attrNames];
      attrNames.forEach((attrName) => {
        let children = node[attrName];
        children = Array.isArray(children) ? children : [children];
        children.forEach((child) => {
          const printer = create(child);
          this.childrenInstances.push(printer);
        });
      });
    }
    return this.childrenInstances;
  }

  print(context) {
    const scripts = [];
    const children = this.getChildren();
    let resultType = 0;
    let resultValueType = -1;
    const attrs = {};
    children.forEach((child) => {
      const { type, text, valueType, ...others } = child.print(context);
      if (type > resultType) {
        resultType = type;
        if (others) {
          Object.assign(attrs, others);
        }
      }
      if (valueType > resultValueType) {
        resultValueType = valueType;
      }
      scripts.push(text);
    });
    return {
      ...attrs,
      type: resultType,
      valueType: resultValueType,
      text: scripts.length == 1 ? scripts[0] : scripts.join(''),
    };
  }
}

SimplyNodePrinter.type = 'File';

export default SimplyNodePrinter;
