import { parse } from './parser/index';
import Visitor from './parser/Visitor';
import { formulaToAST } from './utils';

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
    let ast = formulaToAST(formula);
    const parser = parse(ast);
    const tableCodes = [];
    const visitor = new Visitor({
        function:(parser)=>{
            const ast = parser.getAST();
            const functionName = ast.functionName; 
            if(functionName=="TOONE.GET"){
                const args = ast.arguments;
                if(args.length == 2){
                    tableCodes.push(args[0].value);
                }
                return false;
            }
        }
    });
    parser.visit(visitor);
    return tableCodes;
}
