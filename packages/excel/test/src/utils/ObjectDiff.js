import compare from 'js-struct-compare';

import { sortObj } from './util';

class ObjectDiff{

    indentScript = '  ';

    breakScript = '<br>';

    typeAttr = '_$_type_$_';

    constructor(source,target){
        this.source = sortObj(source);
        this.target = sortObj(target);
        this.sourceObject = {};
        this.resultObject = {};
        this.targetObject = {};
    }

    appendIndent(scripts,indent){
        while(indent-->0){
            scripts.push(this.indentScript);
        }
    }

    parseDiff(diff){
        const {type} = diff;
        if(type=='deleted'){
            this.parseDeletedDiff(diff);
        }else if(type == 'changed'){
            this.parseChangedDiff(diff);
        }else if(type == 'added'){
            this.parseAddedDiff(diff);
        }
    }

    appendValue(path,target,source,value,type){
        const attr = path.shift();
        if(path.length>0){
            source = source[attr];
            const temp = target[attr]||{};
            target[attr] = temp;
            target = temp;
            this.appendValue(path,target,source,value,type);
        }else{
            if(type){
                target[attr] = {[this.typeAttr]:type,value};
            }else{
                target[attr] =value;
            }
        }
    }

    parseDeletedDiff(diff){
        const {path,left_value} = diff;
        this.appendValue(path.concat(),this.sourceObject,this.source,left_value);
        this.appendValue(path.concat(),this.resultObject,this.source,left_value,'deleted');
    }

    parseChangedDiff(diff){
        const {path,left_value,right_value} = diff;
        this.appendValue(path.concat(),this.sourceObject,this.source,left_value);
        this.appendValue(path.concat(),this.targetObject,this.target,right_value);
        this.appendValue(path.concat(),this.resultObject,this.source,{old:left_value,new:right_value},'changed');
    }

    parseAddedDiff(diff){
        const {path,right_value} = diff;
        this.appendValue(path.concat(),this.targetObject,this.target,right_value);
        this.appendValue(path.concat(),this.resultObject,this.target,right_value,'added');
    }

    _isObject(obj){
        return obj !== null && typeof obj == 'object';
    }

    _isNullOrUndef(obj){
        return obj === null || obj === undefined;
    }

    _filterNullOrUndefined(differences){
        const result = [];
        differences.forEach((diff)=>{
            const {left_value,right_value} = diff;
            let ignore = false
            if(this._isNullOrUndef(left_value)&&this._isNullOrUndef(right_value)){
                ignore = true;
            }
            if(!ignore){
                result.push(diff);
            }
        });
        return result;
    }

    toDiffHtml(obj,script,indent=0){
        if(Array.isArray(obj)){
            this.toArrayDiffHtml(obj,script,indent);
        }else if(this._isObject(obj)){
            this.toObjectDiffHtml(obj,script,indent);
        }else{
            script.push(JSON.stringify(obj));
        }   
    }

    toArrayDiffHtml(arr,script,indent=0){
        if(arr.length==0){
            script.push('[]');
        }else{
            script.push('[\n');
            arr.forEach(item=>{
                this.toDiffHtml(item,script,indent+1);
            });
            script.push('\n');
            this.appendIndent(script,indent);
            script.push(']');
        }
    }

    toObjectDiffHtml(obj,script,indent=0){
        script.push('{\n');
        for(let [key,val] of Object.entries(obj)){
            this.appendIndent(script,indent+1);
            if(this._isObject(val)&&val[this.typeAttr]){
                const type = val[this.typeAttr];
                if(type=='changed'){
                    script.push('"');
                    script.push(key);
                    script.push('":');
                    const diff = Diff.diffChars(JSON.stringify(val.value.old), JSON.stringify(val.value.new));
                    diff.forEach(function (part) {
                        script.push(
                            `<span class="${
                                part.removed
                                    ? 'removed'
                                    : part.added
                                    ? 'added'
                                    : 'noModify'
                            }">${part.value}</span>`
                        );
                    });
                    script.push(`,`);
                    script.push('\n');
                }else{
                    script.push(`<span class="${type}">`);
                    script.push('"');
                    script.push(key);
                    script.push('":');
                    this.toDiffHtml(val.value,script,indent+1);
                    script.push(`,</span>`);
                    script.push('\n');
                }
            }else{
                script.push("\"");
                script.push(key);
                script.push("\":");
                this.toDiffHtml(val,script,indent+1);
                script.push(',');
                script.push('\n');
            }
        }
        this.appendIndent(script,indent);
        script.push('}');
    }

    toDiffResultHtml(){
        console.time('对比耗时：');
        const script = [];
        this.toDiffHtml(this.resultObject,script);
        const html= script.join('');
        console.timeEnd('对比耗时：');
        return html;
    }

    parse(){
        let differences = compare(this.source,this.target);
        differences = this._filterNullOrUndefined(differences);
        differences.forEach(diff=>{
            this.parseDiff(diff);
        });
        return {
            source:JSON.stringify(sortObj(this.sourceObject),null,"  "),
            result:this.toDiffResultHtml(),
            target:JSON.stringify(sortObj(this.targetObject),null,"  "),
        }
    }

}

export default ObjectDiff;