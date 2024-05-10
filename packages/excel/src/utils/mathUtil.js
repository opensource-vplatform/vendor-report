import { getNamespace } from './spreadUtil';

export const sum = function(...args){
    const expression = args.join('+');
    const GC = getNamespace();
    const spread = new GC.Spread.Sheets.Workbook();
    const sheet = spread.getSheet(0);
    return GC.Spread.Sheets.CalcEngine.evaluateFormula(sheet,expression);
}