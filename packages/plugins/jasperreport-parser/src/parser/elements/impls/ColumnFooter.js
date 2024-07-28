import AreaElement from '../AreaElement';

class ColumnFooter extends AreaElement{

    getAreaType(){
        return "columnFooter";
    }
}

ColumnFooter.nodeName = 'columnFooter';

export default ColumnFooter;