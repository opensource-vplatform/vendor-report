import { ResultType } from '../Constanst';
import Printer from '../Printer';

class IdentifierPrinter extends Printer{

    print(context){
        return {
            type: ResultType.text,
            text: '',
        }
    }

}

IdentifierPrinter.type = 'Identifier';

export default IdentifierPrinter;