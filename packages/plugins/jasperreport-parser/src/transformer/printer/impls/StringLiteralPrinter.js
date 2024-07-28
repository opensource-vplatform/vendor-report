import {
  ResultType,
  ValueType,
} from '../Constanst';
import Printer from '../Printer';

class StringLiteralPrinter extends Printer {
  print() {
    const node = this.getNode();
    const value = node.value;
    if (value == 'OP_PC') {
      return {
        type: ResultType.formula,
        valueType: ValueType.string,
        text: `CONCAT("共 ",TOONE.PAGECOUNT()," 页")`,
      };
    } else {
      return {
        type: ResultType.text,
        valueType: ValueType.string,
        text: `${node.value}`,
      };
    }
  }
}

StringLiteralPrinter.type = 'StringLiteral';

export default StringLiteralPrinter;
