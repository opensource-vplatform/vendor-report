import { parse } from './index';

/**
 * 基础解析器定义
 */
class Parser {
    constructor(ast) {
        this.ast = ast;
    }

    getAST(){
        return this.ast;
    }

    parse(tool) {
        return this.ast;
    }

    parseValue(value,tool){
        if(value&&typeof value.type == 'number'){
            const parser = parse(value);
            return parser.parse(tool);
        }
        return value;
    }

    
}

export default Parser;
