import AreaElement from '../AreaElement';

class Title extends AreaElement{
    getAreaType(){
        return "title";
    }
}

Title.nodeName = 'title';

export default Title;