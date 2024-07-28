import { getChild } from '../util/XmlUtil';
import Element from './Element';

class AreaElement extends Element{

    fillCellAreaType(cell){
        if(Array.isArray(cell)){
            cell.forEach(item=>this.fillCellAreaType(item));
        }else{
            const config = cell.getConfig();
            config.areaType = this.getAreaType();
        }
    }

    parse(context){
        let cells = [];
        const children = this.createChildren();
        children.forEach(child=>{
            const cell = child.parse(context);
            if(cell){
                this.fillCellAreaType(cell);
                if(Array.isArray(cell)){
                    cells = cells.concat(cell);
                }else if(cell){
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

    getAreaType(){
        throw Error("未实现getAreaType方法，请检查！");
    }

}

export default AreaElement;