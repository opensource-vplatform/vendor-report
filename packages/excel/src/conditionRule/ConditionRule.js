import { create } from './factory';

class ConditionRule{

    constructor(json){
        this.json = json;
    }

    bind(sheet){
        this.sheet = sheet;
    }

    apply(row,rowCount,col,colCount){
        if(!this.sheet){
            throw Error("请先使用bind接口绑定工作表，例：conditionRule.bind(sheet);");
        }
        const rule = create(this.json);
        if(rule){
            rule.bind(this.sheet);
            rule.apply(row,rowCount,col,colCount);
        }
    }

    applySelections(selections){
        if(!this.sheet){
            throw Error("请先使用bind接口绑定工作表，例：conditionRule.bind(sheet);");
        }
        const rule = create(this.json);
        if(rule){
            rule.bind(this.sheet);
            rule.applySelections(selections);
        }
    }

    toJson(){
        return this.json;
    }

}

export default ConditionRule;