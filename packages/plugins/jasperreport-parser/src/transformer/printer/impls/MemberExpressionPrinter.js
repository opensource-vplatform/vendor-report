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

    callGet(result){
        const args = this.getArguments();
        if(args&&args.length>0){
            const arg = args[0].print(context);
            return {
                type: ResultType.bindingPath,
                text: result.text+'.'+arg.text,
            }
        }else{
            return {
                type: ResultType.bindingPath,
                text: result.text,
            }
        }
    }

    callReplaceAll(result){
        return {
            type: ResultType.funcName,
            text: "SUBSTITUTE",
            args: [`TOONE.GET(${result.text.split('.').map(code=>`"${code}"`).join(',')})`]
        }
    }

    callTrim(result){
        return {
            type: ResultType.formula,
            text: `TRIM(TOONE.GET(${result.text.split('.').map(code=>`"${code}"`).join(',')}))`
        }
    }

    print(context){
        const object = this.getObject();
        const res = object.print(context);
        const resType = res.type;
        if(resType == ResultType.bindingPath){
            const node = this.getNode();
            const property = node.property;
            const name = property.name;
            switch(name){
                case 'get':
                    return this.callGet(res);
                case 'replaceAll':
                    return this.callReplaceAll(res);
                case 'trim':
                    return this.callTrim(res);
                default:
                    throw Error("未识别场景！");
            }
        }else if(resType == ResultType.text||resType == ResultType.formula || resType == ResultType.number){
            return res;
        }else{
            throw Error("未识别场景！");
        }
    }

}

MemberExpressionPrinter.type = "MemberExpression";

export default MemberExpressionPrinter;