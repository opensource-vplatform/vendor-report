import { ResultType } from '../Constanst';
import { create } from '../Factory';
import Printer from '../Printer';

class BinaryExpressionPrinter extends Printer {
  getOperatorArgs(context) {
    const left = this.getLeft();
    const right = this.getRight();
    const leftRes = left.print(context);
    const rightRes = right.print(context);
    const leftArg = this.toArg(leftRes);
    const rightArg = this.toArg(rightRes);
    return [leftArg, rightArg];
  }

  printAdd(context) {
    const args = this.getOperatorArgs(context);
    if(args[0]==='TOONE.PAGEINDEX()'&&args[1]===0){
      return {
        type: ResultType.formula,
        text: `TOONE.PAGEINDEX()`,
      }
    }else{
      return {
        type: ResultType.formula,
        text: `CONCAT(${args[0]},${args[1]})`,
      };
    }
  }

  printEqual(context) {
    const args = this.getOperatorArgs(context);
    return {
      type: ResultType.formula,
      text: `${args[0]}=${args[1]}`,
    };
  }

  printDiv(context) {
    const args = this.getOperatorArgs(context);
    return {
      type: ResultType.formula,
      text: `${args[0]}/${args[1]}`,
    };
  }

  printSub(context) {
    const args = this.getOperatorArgs(context);
    return {
      type: ResultType.formula,
      text: `${args[0]}-${args[1]}`,
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
    } else if (operator === '-') {
      return this.printSub(context);
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
