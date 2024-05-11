import { exeFormula } from '../../formula/index';
import Parser from '../Parser';

class FunctionParser extends Parser{

    parse(tool){
        const ast = this.getAST();
        const result = exeFormula(ast,tool);
        if(result!==null){
            //代表函数已被增强处理，无需再递归处理参数
            return result;
        }else{
            //递归处理参数
            const args = ast.arguments;
            if(Array.isArray(args)){
                const newArgs = args.map((arg)=>{
                    return this.parseValue(arg,tool)
                });
                ast.arguments = newArgs;
            }
            return ast;
        }
    }

    _getVisitHandlerName(){
        return 'visitFunction';
    }

    _getVisitChildren(){
        const ast = this.getAST();
        const args = ast.arguments;
        return Array.isArray(args) ? args:[];
    }

}

export default FunctionParser;