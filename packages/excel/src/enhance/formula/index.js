import { getNamespace } from '../../utils/spreadUtil';
import { parse } from './parser/index';

/**
 * 将公式解析成语法树
 * @param {*} formula
 * @returns
 */
const formulaToAST = function (formula) {
    const GC = getNamespace();
    return GC.Spread.Sheets.CalcEngine.formulaToExpression(null, formula, 0, 0);
};

/**
 * 处理公式
 * @param {*} formula
 * @param {*} tool
 */
export const enhance = function (formula, tool) {
    if (formula) {
        let ast = formulaToAST(formula);
        const parser = parse(ast);
        ast = parser.parse(tool);
        formula = GC.Spread.Sheets.CalcEngine.expressionToFormula(
            null,
            ast,
            0,
            0
        );
        return { type: 'formula', value: formula };
    } else {
        return { type: 'formula', value: formula };
    }
};

export const getTableCodes = function(formula){

}
