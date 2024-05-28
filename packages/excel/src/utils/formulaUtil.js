import { getNamespace } from './spreadUtil';

/**
 * 将公式解析成语法树
 * @param {*} formula
 * @returns
 */
export const formulaToAST = function (formula) {
    const GC = getNamespace();
    return GC.Spread.Sheets.CalcEngine.formulaToExpression(null, formula, 0, 0);
};
