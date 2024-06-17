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

/**
 * 获取单元格扩展方向
 * @param {*} sheet 
 * @param {*} row 
 * @param {*} col 
 * @returns 
 */
function getDirection(sheet, row, col){
    return null;
}

export default { paintCell,getOptions,getDirection };
