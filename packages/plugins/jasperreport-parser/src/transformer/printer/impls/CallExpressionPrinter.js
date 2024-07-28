import { ResultType, ValueType } from '../Constanst';
import { create } from '../Factory';
import Printer from '../Printer';
import { isNumber } from '../../util/metadataUtil';

class CallExpressionPrinter extends Printer {
  printParameter(args, context) {
    const child = create(args[0]);
    const bindingPath =
      context.getParameterName() + '.' + child.print(context).text;
    return {
      type: ResultType.bindingPath,
      valueType: isNumber(context.getMetadata(), bindingPath)
        ? ValueType.number
        : ValueType.text,
      text: bindingPath,
    };
  }

  printField(args, context) {
    const child = create(args[0]);
    const bindingPath =
      context.getDetailName() + '.' + child.print(context).text;
    return {
      type: ResultType.bindingPath,
      valueType: isNumber(context.getMetadata(), bindingPath)
        ? ValueType.number
        : ValueType.text,
      text: bindingPath,
    };
  }

  printVariable(args, context) {
    const child = create(args[0]);
    const rest = child.print(context);
    if (rest.text == 'index') {
      return {
        type: ResultType.formula,
        valueType: ValueType.number,
        text: `TOONE.SEQ("g")`,
      };
    } else if (rest.text == 'PAGE_NUMBER') {
      return {
        type: ResultType.formula,
        valueType: ValueType.number,
        text: 'TOONE.PAGEINDEX()',
      };
    } else {
      throw Error('不支持变量');
    }
  }

  print(context) {
    const node = this.getNode();
    const callee = node.callee;
    if (callee.type == 'Identifier') {
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
    } else {
      const instance = create(callee);
      const result = instance.print(context);
      if (result.type == ResultType.bindingPath) {
        const args = this.createChildren('arguments');
        if (args.length > 0) {
          const field = args[0].print(context).text;
          const bindingPath = result.text + '.' + field;
          const valueType = isNumber(context.getMetadata(), bindingPath)
            ? ValueType.number
            : ValueType.text;
          return {
            type: ResultType.bindingPath,
            valueType,
            text: bindingPath,
          };
        } else {
          return result;
        }
      } else if (result.type == ResultType.handler) {
        const args = this.createChildren('arguments');
        const argList = [];
        args.forEach((arg) => {
          const res = arg.print(context);
          if (res.type == ResultType.text) {
            argList.push(`"${res.text}"`);
          } else if (res.type == ResultType.bindingPath) {
            argList.push(this.bindingPathToArg(res));
          } else {
            throw Error('未识别场景！');
          }
        });
        const handler = result.text;
        return handler(argList.join(','));
      } else if (result.type == ResultType.text && result.text === '') {
        //代表调用方法被忽略（新版的公式无需再执行这些方法）
        const args = this.createChildren('arguments');
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
