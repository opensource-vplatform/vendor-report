import SimplyNodePrinter from '../SimplyNodePrinter';

class FilePrinter extends SimplyNodePrinter{
    
    getAttrName(){
        return 'program';
    }
}

FilePrinter.type = 'File';

export default FilePrinter;