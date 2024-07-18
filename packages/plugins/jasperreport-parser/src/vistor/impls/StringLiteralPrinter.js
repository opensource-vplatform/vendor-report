import {
  ResultType,
  ValueType,
} from '../Constanst';
import Printer from '../Printer';

class StringLiteralPrinter extends Printer {
  print() {
    const node = this.getNode();
    return { type: ResultType.text, text: `${node.value}` };
  }

  getValueType() {
    return ValueType.string;
  }
}

StringLiteralPrinter.type = 'StringLiteral';

export default StringLiteralPrinter;
