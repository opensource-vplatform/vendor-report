import { getChild } from '../util/XmlUtil';
import Element from './Element';

class AreaElement extends Element{

    parse(context){
        let cells = [];
        const children = this.createChildren();
        children.forEach(child=>{
            const cell = child.parse(context);
            if(cell){
                if(Array.isArray(cell)){
                    cells = cells.concat(cell);
                }else{
                    cells.push(cell);
                }
            }
        });
        return cells;
    }

    getHeight(){
        const node = this.getNode();
        const band = getChild("band",node);
        if(band){
            return this.getIntegerAttr("height",band);
        }
        return 0;
    }

}

export default AreaElement;