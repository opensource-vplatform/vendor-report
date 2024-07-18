import { create } from './Factory';

class Printer{

    constructor(node){
        this.node = node;
        this.attrInstances = {};
    }

    print(context){
        throw Error("未实现print方法，请检查！");
    }

    createChildren(attrName){
        if(!this.attrInstances[attrName]){
            const node = this.getNode();
            const value = node[attrName];
            const isArray = Array.isArray(value);
            if(isArray){
                this.attrInstances[attrName] = [];
                value.forEach(val=>{
                    this.attrInstances[attrName].push(create(val));
                });
            }else{
                this.attrInstances[attrName] = create(value);
            }
        }
        return this.attrInstances[attrName];
    }

    getNode(){
        return this.node;
    }
    
    getValueType(){
        throw Error("未实现getValueType方法，请检查！");
    }

}

export default Printer;