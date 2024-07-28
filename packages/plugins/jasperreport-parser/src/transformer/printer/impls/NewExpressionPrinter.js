import Printer from '../Printer';

class NewExpressionPrinter extends Printer{

    newInteger(context){
        const args = this.createChildren("arguments");
        const arg = args[0];
        return arg.print(context);
    }

    newDouble(context){
        return this.newInteger(context);
    }

    print(context){
        const node = this.getNode();
        const callee = node.callee;
        const name = callee.name;
        const methodName = `new${name.charAt(0).toUpperCase()+name.substring(1)}`;
        const handler = this[methodName];
        if(handler){
            return handler.call(this,context);
        }else{
            throw Error("未识别场景！");
        }
    }

}

NewExpressionPrinter.type = 'NewExpression'

export default NewExpressionPrinter;