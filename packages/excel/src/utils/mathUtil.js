import { getNamespace } from './spreadUtil';

let _Sheet = null;

const getSheet = function(){
    if(_Sheet==null){
        const GC = getNamespace();
        const spread = new GC.Spread.Sheets.Workbook();
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