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
      attrNames = Array.isArray(attrNames) ? attrNames:[attrNames];
      attrNames.forEach(attrName=>{
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
    children.forEach((child) => {
      const { type, text } = child.print(context);
      if (type > resultType) {
        resultType = type;
      }
      scripts.push(text);
    });
    return {
      type: resultType,
      text: scripts.join(''),
    };
  }

  getValueType() {
    const children = this.getChildren();
    let type;
    children.forEach((child) => {
      const valueType = child.getValueType();
      if (valueType > type) {
        type = valueType;
      }
    });
    return type;
  }
}

SimplyNodePrinter.type = 'File';

export default SimplyNodePrinter;
