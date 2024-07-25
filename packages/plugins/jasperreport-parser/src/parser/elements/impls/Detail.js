import AreaElement from '../AreaElement';

class Detail extends AreaElement{

    getAreaType(){
        return "detail";
    }
}

Detail.nodeName = "detail";

export default Detail;