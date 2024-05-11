import { getNamespace } from '../../../utils/spreadUtil';
import FunctionParser from './impls/FunctionParser';
import OperatorParser from './impls/OperatorParser';
import ParenthesesParser from './impls/ParenthesesParser';
import Parser from './Parser';

/**
 * 解析语法树
 * @param {*} ast 
 * @returns 
 */
export const parse = function(ast){
    const type = ast.type;
    const GC = getNamespace();
    const ExpressionType = GC.Spread.CalcEngine.ExpressionType;
    switch(type){
        case ExpressionType.operator:
            return new OperatorParser(ast);
        case ExpressionType.function:
            return new FunctionParser(ast);
        case ExpressionType.parentheses:
            return new ParenthesesParser(ast);
        default:
            return new Parser(ast);
    }
}