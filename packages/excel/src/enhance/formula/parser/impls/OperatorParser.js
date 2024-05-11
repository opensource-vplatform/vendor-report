import Parser from '../Parser';

class OperatorParser extends Parser{

    parse(tool){
        const ast = this.getAST();
        ast.value = this.parseValue(ast.value,tool);
        ast.value2 = this.parseValue(ast.value2,tool);
        return ast;
    }
}

export default OperatorParser;