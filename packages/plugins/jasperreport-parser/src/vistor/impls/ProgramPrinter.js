import SimplyNodePrinter from '../SimplyNodePrinter';

class ProgramPrinter extends SimplyNodePrinter{

    getAttrName(){
        return ['body','directives']
    }
}

ProgramPrinter.type = 'Program';

export default ProgramPrinter;