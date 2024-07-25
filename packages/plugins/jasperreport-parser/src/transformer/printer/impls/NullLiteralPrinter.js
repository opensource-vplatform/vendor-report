import { ResultType } from '../Constanst';
import Printer from '../Printer';

class NullLiteralPrinter extends Printer{

    print(){
        return {
            type: ResultType.text,
            text: ''
        }
    }

}

NullLiteralPrinter.type = 'NullLiteral';

export default NullLiteralPrinter;