import {
  ResultType,
  ValueType,
} from '../Constanst';
import Printer from '../Printer';

class NullLiteralPrinter extends Printer{

    print(){
        return {
            type: ResultType.text,
            valueType: ValueType.string,
            text: ''
        }
    }

}

NullLiteralPrinter.type = 'NullLiteral';

export default NullLiteralPrinter;