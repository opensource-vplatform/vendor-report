import {
  ResultType,
  ValueType,
} from '../Constanst';
import { create } from '../Factory';
import Printer from '../Printer';

class CallExpressionPrinter extends Printer {
  printParameter(args, context) {
    const child = create(args[0]);
    return {
      type: ResultType.bindingPath,
      text: context.getParameterName() + '.' + child.print(context).text,
    };
  }

  printField(args, context) {
    const child = create(args[0]);
    return {
      type: ResultType.bindingPath,
      text: context.getDetailName() + '.' + child.print(context).text,
    };
  }

  printVariable(args, context) {
    const child = create(args[0]);
    const rest = child.print(context);
    if(rest.text=='index'){
      return {
        type: ResultType.formula,
        text: `TOONE.SEQ("g")`
      }
    }else if(rest.text=='PAGE_NUMBER'){
      return {
        type: ResultType.formula,
        text: 'TOONE.PAGEINDEX()'
      }
    }else{
      throw Error("不支持变量");
    }
  }

  print(context) {
    const node = this.getNode();
    const callee = node.callee;
    if(callee.type=="Identifier"){
        const name = callee.name;
        const args = node.arguments;
        if (name == '$P') {
          return this.printParameter(args, context);
        } else if (name == '$F') {
          return this.printField(args, context);
        } else if (name == '$V') {
          return this.printVariable(args, context);
        } else {
          throw Error('未识别类型：' + name);
        }
    }else{
        const instance = create(callee);
        const result = instance.print(context);
        if(result.type==ResultType.bindingPath){
            const args = this.createChildren("arguments");
            const field = args[0].print(context).text;
            return {
                type: ResultType.bindingPath,
                text: result.text + '.' + field,
            }
        }else if(result.type==ResultType.funcName){
          const args = this.createChildren("arguments");
          args.forEach(arg=>{
            const res = arg.print(context);
            if(res.type == ResultType.text){
              result.args.push(`"${res.text}"`);
            }
          });
          return {
            type: ResultType.formula,
            text: `${result.text}(${result.args.join(',')})`
          }
        }else if(result.type == ResultType.text&&result.text === ''){
          //代表调用方法被忽略（新版的公式无需再执行这些方法）
          const args = this.createChildren("arguments");
          return args[0].print(context);
        }
        return result;
    }
  }
  getValueType() {
    return ValueType.unknow;
  }
}

CallExpressionPrinter.type = 'CallExpression';
export default CallExpressionPrinter;
