import { ResultType } from '../Constanst';
import Printer from '../Printer';

class IdentifierPrinter extends Printer{

    print(context){
        const node = this.getNode();
        return {
            type: ResultType.identifier,
            text: node.name,
        }
    }

}

IdentifierPrinter.type = 'Identifier';

export default IdentifierPrinter;