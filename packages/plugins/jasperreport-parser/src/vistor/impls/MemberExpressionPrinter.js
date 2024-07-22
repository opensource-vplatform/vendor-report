import { ResultType } from '../Constanst';
import { create } from '../Factory';
import Printer from '../Printer';

class MemberExpressionPrinter extends Printer{

    getObject(){
        if(!this.objectInstance){
            const node = this.getNode();
            const obj = node.object;
            this.objectInstance = create(obj);
        }
        return this.objectInstance;
    }

    getProperty(){
        if(!this.propertyInstance){
            const node = this.getNode();
            const property = node.property;
            this.propertyInstance = create(property);
        }
        return this.propertyInstance;
    }

    getArguments(){
        if(!this.argumentInstances){
            this.argumentInstances = [];
            const node = this.getNode();
            const args = node.arguments;
            if(args&&args.length>0){
                args.forEach(arg=>{
                    this.argumentInstances.push(create(arg));
                });
            }
        }
        return this.argumentInstances;
    }

    print(context){
        const object = this.getObject();
        const res = object.print(context);
        if(res.type == ResultType.bindingPath){
            const node = this.getNode();
            const property = node.property;
            if(property.name=='get'){
                const args = this.getArguments();
                if(args&&args.length>0){
                    const arg = args[0].print(context);
                    return {
                        type: ResultType.bindingPath,
                        text: res.text+'.'+arg.text,
                    }
                }else{
                    return {
                        type: ResultType.bindingPath,
                        text: res.text,
                    }
                }
            }else if(property.name=='replaceAll'){
                return {
                    type: ResultType.funcName,
                    text: "SUBSTITUTE",
                    args: [`TOONE.GET(${res.text.split('.').map(code=>`"${code}"`).join(',')})`]
                }
            }
        }else{
            throw Error("未识别场景！");
        }
    }

}

MemberExpressionPrinter.type = "MemberExpression";

export default MemberExpressionPrinter;