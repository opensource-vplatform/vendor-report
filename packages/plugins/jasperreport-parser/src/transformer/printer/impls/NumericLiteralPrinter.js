import { ResultType } from '../Constanst';
import Printer from '../Printer';

class NumericLiteralPrinter extends Printer{


    print(context){
        const node = this.getNode();
        return {
            type: ResultType.number,
            text: node.value,
        }
    }

}

NumericLiteralPrinter.type = 'NumericLiteral';

export default NumericLiteralPrinter;