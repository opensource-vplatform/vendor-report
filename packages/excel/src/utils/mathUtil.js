import { getNamespace } from './spreadUtil';

let _Sheet = null;

const getSheet = function(){
    if(_Sheet==null){
        const GC = getNamespace();
        const spread = new GC.Spread.Sheets.Workbook();
        spread.addSheet(0);
        _Sheet = spread.getSheet(0);
    }
    return _Sheet;
}

export const sum = function(args){
    if(args.length==0)return 0;
    const expression = args.join('+');
    const sheet = getSheet();
    return GC.Spread.Sheets.CalcEngine.evaluateFormula(sheet,expression);
}

/**
 * 除法
 * @param {*} dividend 被除数
 * @param {*} divisor 除数
 * @returns 
 */
export const div = function(dividend,divisor){
    const sheet = getSheet();
    return GC.Spread.Sheets.CalcEngine.evaluateFormula(sheet,`${dividend}/${divisor}`);
}

/**
 * 最大值
 * @param {*} args 
 */
export const max = function(args){
    let rest = undefined;
    args.forEach(arg=>{
        if(rest === undefined || arg > rest){
            rest = arg;
        }
    });
    return rest;
}

/**
 * 最小值
 * @param {*} args 
 * @returns 
 */
export const min = function(args){
    let rest = undefined;
    args.forEach(arg=>{
        if(rest === undefined || arg < rest){
            rest = arg;
        }
    });
    return rest;
}