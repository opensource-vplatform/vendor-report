import AreaElement from '../AreaElement';

class GroupFooter extends AreaElement{
    getAreaType(){
        return "groupFooter";
    }
}

GroupFooter.nodeName = 'groupFooter';

export default GroupFooter;