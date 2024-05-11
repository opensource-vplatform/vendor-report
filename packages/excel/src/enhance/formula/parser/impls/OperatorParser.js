import Parser from '../Parser';

class OperatorParser extends Parser{

    parse(tool){
        const ast = this.getAST();
        ast.value = this.parseValue(ast.value,tool);
        ast.value2 = this.parseValue(ast.value2,tool);
        return ast;
    }

    _getVisitHandlerName(){
        return 'visitOperator';
    }

    _getVisitChildren(){
        const ast = this.getAST();
        return [ast.value,ast.value2];
    }

}

export default OperatorParser;