import { ResultType, ValueType } from '../Constanst';
import { create } from '../Factory';
import Printer from '../Printer';

class BinaryExpressionPrinter extends Printer {
  getOperatorArgObjects(context) {
    const left = this.getLeft();
    const right = this.getRight();
    const leftRes = left.print(context);
    const rightRes = right.print(context);
    return [leftRes, rightRes];
  }

  getOperatorArgs(context) {
    const [leftRes, rightRes] = this.getOperatorArgObjects(context);
    const leftArg = this.toArg(leftRes);
    const rightArg = this.toArg(rightRes);
    return [leftArg, rightArg];
  }

  genCalResult(context, operator, valueType) {
    const args = this.getOperatorArgs(context);
    return {
      type: ResultType.formula,
      valueType,
      text: `${args[0]}${operator}${args[1]}`,
    };
  }

  printAdd(context) {
    const args = this.getOperatorArgs(context);
    if (args[0] === 'TOONE.PAGEINDEX()' && args[1] === 0) {
      return {
        type: ResultType.formula,
        text: `TOONE.PAGEINDEX()`,
      };
    } else {
      const argList = this.getOperatorArgObjects(context);
      const leftValueType = argList[0].valueType;
      const rightValueType = argList[1].valueType;
      const numeric =
        leftValueType == ValueType.number && rightValueType == ValueType.number;
      let text = '';
      if (numeric) {
        text = `${args[0]}+${args[1]}`;
      } else {
        text = `CONCAT(${args[0]},${args[1]})`;
      }
      return {
        type: ResultType.formula,
        valueType: numeric ? ValueType.number : ValueType.text,
        text,
      };
    }
  }

  printEqual(context) {
    return this.genCalResult(context, '=', ValueType.boolean);
  }

  printDiv(context) {
    return this.genCalResult(context, '/', ValueType.number);
  }

  printSub(context) {
    return this.genCalResult(context, '-', ValueType.number);
  }

  printMult(context) {
    return this.genCalResult(context, '*', ValueType.number);
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
    } else if (operator === '-') {
      return this.printSub(context);
    } else if (operator === '*') {
      return this.printMult(context);
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
