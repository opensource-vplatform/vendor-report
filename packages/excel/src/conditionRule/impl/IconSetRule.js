import Rule from './Rule';

class IconSetRule extends Rule{

    constructor(iconSetType){
        this.iconSetType = iconSetType;
    }

    apply(row,rowCount,col,colCount){

    }

    toJson(){
        return {
            _type: 'iconSetRule',
            iconSetType:this.iconSetType,
        }
    }

}

IconSetRule.fromJson = function(json){
    return new IconSetRule(json.iconSetType);
}


export default IconSetRule;