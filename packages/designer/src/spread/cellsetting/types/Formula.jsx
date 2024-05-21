import { setFormulaDecoration } from '../utils';

const paintCell = function (context, style, value) {
    const { sheet, row, col } = context;
    const formula = sheet.getFormula(row, col);
    if (formula) {
        setFormulaDecoration(style);
        value = formula;
    }
    return value;
};

function getOptions(sheet){
    return [];
}

export default { paintCell,getOptions };
