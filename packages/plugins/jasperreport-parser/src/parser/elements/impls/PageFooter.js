import AreaElement from '../AreaElement';

class PageFooter extends AreaElement{

    getAreaType(){
        return "pageFooter";
    }

}

PageFooter.nodeName = 'pageFooter';

export default PageFooter;