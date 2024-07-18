import SimplyNodePrinter from '../SimplyNodePrinter';

class DirectivePrinter extends SimplyNodePrinter{

    getAttrName(){
        return 'value';
    }
}

DirectivePrinter.type = 'Directive'

export default DirectivePrinter;