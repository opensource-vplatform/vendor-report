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

    toParser(value){
        if(value&&typeof value.type == 'number'){
            return parse(value);
        }
        return null;
    }

    parseValue(value,tool){
        const parser = this.toParser(value);
        if(parser){
            return parser.parse(tool);
        }
        return value;
    }

    /**
     * 获取需要访问的子元素，如函数的参数
     * @returns 
     */
    _getVisitChildren(){
        return [];
    }

    /**
     * 获取访问函数名称
     * @returns 
     */
    _getVisitHandlerName(){
        return null;
    }

    visit(visitor){
        const handlerName = this._getVisitHandlerName();
        const handler = visitor[handlerName];
        let visitChildren = true;
        if(typeof handler == 'function'){
            visitChildren = handler(this)!==false; 
        }
        if(visitChildren){
            const children = this._getVisitChildren();
            children.forEach(child=>{
                const parser = this.toParser(child);
                if(parser){
                    parser.visit(visitor);
                }
            });
        }
    }
    
}

export default Parser;
