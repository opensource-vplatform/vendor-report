import Parser from '../Parser';

class ParenthesesParser extends Parser{

    parse(tool){
        const ast = this.getAST();
        ast.value = this.parseValue(ast.value,tool);
        return ast;
    }

    _getVisitHandlerName(){
        return 'visitParentheses'
    }

    _getVisitChildren(){
        const ast = this.getAST();
        return [ast.value]
    }
}

export default ParenthesesParser;