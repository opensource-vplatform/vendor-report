import AreaElement from '../AreaElement';

class GroupHeader extends AreaElement{
    getAreaType(){
        return "groupHeader";
    }
}

GroupHeader.nodeName = 'groupHeader';

export default GroupHeader;