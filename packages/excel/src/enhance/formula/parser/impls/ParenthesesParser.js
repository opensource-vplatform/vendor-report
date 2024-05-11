import Parser from '../Parser';

class ParenthesesParser extends Parser{

    parse(tool){
        const ast = this.getAST();
        ast.value = this.parseValue(ast.value,tool);
        return ast;
    }
}

export default ParenthesesParser;