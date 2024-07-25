import {
  ResultType,
  ValueType,
} from '../Constanst';
import Printer from '../Printer';

class StringLiteralPrinter extends Printer {
  print() {
    const node = this.getNode();
    const value = node.value;
    if(value=='OP_PC'){
      return {
        type: ResultType.formula,
        text: `CONCAT("共 ",TOONE.PAGECOUNT()," 页")`,
      }
    }else{
      return { type: ResultType.text, text: `${node.value}` };
    }
  }

  getValueType() {
    return ValueType.string;
  }
}

StringLiteralPrinter.type = 'StringLiteral';

export default StringLiteralPrinter;
