import AreaElement from '../AreaElement';

class ColumnHeader extends AreaElement{
    getAreaType(){
        return "columnHeader";
    }
}

ColumnHeader.nodeName = 'columnHeader';

export default ColumnHeader;