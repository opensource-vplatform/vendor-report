import AreaElement from '../AreaElement';

class PageHeader extends AreaElement{
    getAreaType(){
        return "pageHeader";
    }
}

PageHeader.nodeName = 'pageHeader';

export default PageHeader;