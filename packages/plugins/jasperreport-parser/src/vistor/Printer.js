import { ResultType } from './Constanst';
import { create } from './Factory';

class Printer {
  constructor(node) {
    this.node = node;
    this.attrInstances = {};
  }

  toArg(result) {
    const type = result.type;
    if (type == ResultType.text) {
      return this.stringToArg(result);
    } else if (type == ResultType.number) {
      return this.numberToArg(result);
    } else if (type == ResultType.bindingPath) {
      return this.bindingPathToArg(result);
    } else {
      return result.text;
    }
  }

  bindingPathToArg(result) {
    const text = result.text;
    let args = text.split('.');
    args = args.map((arg) => `"${arg}"`);
    return `TOONE.GET(${args.join(',')})`;
  }

  stringToArg(result) {
    return `"${result.text}"`;
  }

  numberToArg(result) {
    return result.text;
  }

  print(context) {
    throw Error('未实现print方法，请检查！');
  }

  createChildren(attrName) {
    if (!this.attrInstances[attrName]) {
      const node = this.getNode();
      const value = node[attrName];
      const isArray = Array.isArray(value);
      if (isArray) {
        this.attrInstances[attrName] = [];
        value.forEach((val) => {
          this.attrInstances[attrName].push(create(val));
        });
      } else {
        this.attrInstances[attrName] = create(value);
      }
    }
    return this.attrInstances[attrName];
  }

  getNode() {
    return this.node;
  }

  getValueType() {
    throw Error('未实现getValueType方法，请检查！');
  }
}

export default Printer;
