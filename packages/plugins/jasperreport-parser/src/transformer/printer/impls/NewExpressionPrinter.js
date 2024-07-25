import { ResultType } from '../Constanst';
import Printer from '../Printer';

class NewExpressionPrinter extends Printer{

    print(context){
        const node = this.getNode();
        const callee = node.callee;
        if(callee.name=="Integer"){
            const args = this.createChildren("arguments");
            return {
                type: ResultType.number,
                text: args[0].print(context).text,
            }
        }else{
            throw Error("未识别场景！");
        }
    }

}

NewExpressionPrinter.type = 'NewExpression'

export default NewExpressionPrinter;