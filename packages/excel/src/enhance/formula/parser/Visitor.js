class Visitor{

    constructor(handlers){
        this.handlers = handlers;
    }

    _visit(type,parser){
        const handler = this.handlers[type];
        if(handler){
            return handler(parser);
        }
    }

    visitFunction(parser){
        return this._visit("function",parser);
    }

    visitOperator(parser){
        return this._visit("operator",parser);
    }

    visitParentheses(parser){
        return this._visit("parentheses",parser);
    }

}

export default Visitor;