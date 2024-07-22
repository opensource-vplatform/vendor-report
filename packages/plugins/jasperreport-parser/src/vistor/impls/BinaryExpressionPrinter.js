import { ResultType } from '../Constanst';
import { create } from '../Factory';
import Printer from '../Printer';

class BinaryExpressionPrinter extends Printer {
  printAdd(context) {
    const left = this.getLeft();
    const right = this.getRight();
    const leftRes = left.print(context);
    const rightRes = right.print(context);
    const leftArg = this.toArg(leftRes);
    const rightArg = this.toArg(rightRes);
    return {
      type: ResultType.formula,
      text: `CONCAT(${leftArg},${rightArg})`,
    };
  }

  printEqual(context) {
    const left = this.getLeft();
    const right = this.getRight();
    const leftRes = left.print(context);
    const rightRes = right.print(context);
    const leftArg = this.toArg(leftRes);
    const rightArg = this.toArg(rightRes);
    return {
      type: ResultType.formula,
      text: `${leftArg}=${rightArg}`,
    };
  }

  printDiv(context) {
    const left = this.getLeft();
    const right = this.getRight();
    const leftRes = left.print(context);
    const rightRes = right.print(context);
    const leftArg = this.toArg(leftRes);
    const rightArg = this.toArg(rightRes);
    return {
      type: ResultType.formula,
      text: `${leftArg}/${rightArg}`,
    };
  }

  getLeft() {
    if (!this.leftInstance) {
      const node = this.getNode();
      this.leftInstance = create(node.left);
    }
    return this.leftInstance;
  }

  getRight() {
    if (!this.rightInstance) {
      const node = this.getNode();
      this.rightInstance = create(node.right);
    }
    return this.rightInstance;
  }

  print(context) {
    const node = this.getNode();
    const operator = node.operator;
    if (operator === '+') {
      return this.printAdd(context);
    } else if (operator === '==') {
      return this.printEqual(context);
    } else if (operator === '/') {
      return this.printDiv(context);
    } else {
      throw Error('未识别操作符：' + operator);
    }
  }

  getValueType() {
    const left = this.getLeft();
    let type = left.getValueType();
    const right = this.getRight();
    if (right.getValueType() > type) {
      type = right.getValueType();
    }
    return type;
  }
}

BinaryExpressionPrinter.type = 'BinaryExpression';

export default BinaryExpressionPrinter;
