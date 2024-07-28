import { ResultType, ValueType } from '../Constanst';
import { create } from '../Factory';
import Printer from '../Printer';

class MemberExpressionPrinter extends Printer {
  getObject() {
    if (!this.objectInstance) {
      const node = this.getNode();
      const obj = node.object;
      this.objectInstance = create(obj);
    }
    return this.objectInstance;
  }

  getProperty() {
    if (!this.propertyInstance) {
      const node = this.getNode();
      const property = node.property;
      this.propertyInstance = create(property);
    }
    return this.propertyInstance;
  }

  getArguments() {
    if (!this.argumentInstances) {
      this.argumentInstances = [];
      const node = this.getNode();
      const args = node.arguments;
      if (args && args.length > 0) {
        args.forEach((arg) => {
          this.argumentInstances.push(create(arg));
        });
      }
    }
    return this.argumentInstances;
  }

  callGet(result) {
    const args = this.getArguments();
    if (args && args.length > 0) {
      const arg = args[0].print(context);
      return {
        type: ResultType.bindingPath,
        text: result.text + '.' + arg.text,
      };
    } else {
      return {
        type: ResultType.bindingPath,
        text: result.text,
      };
    }
  }

  callReplaceAll(result) {
    return {
      type: ResultType.handler,
      text: function (args) {
        return {
          type: ResultType.formula,
          text: `SUBSTITUTE(TOONE.GET(${result.text
            .split('.')
            .map((code) => `"${code}"`)
            .join(',')}),${args})`,
        };
      },
    };
  }

  callReplaceFirst(result) {
    return {
      type: ResultType.handler,
      text: function (args) {
        return {
          type: ResultType.formula,
          text: `SUBSTITUTE(TOONE.GET(${result.text
            .split('.')
            .map((code) => `"${code}"`)
            .join(',')}),${args},1)`,
        };
      },
    };
  }

  callTrim(result) {
    return {
      type: ResultType.formula,
      text: `TRIM(TOONE.GET(${result.text
        .split('.')
        .map((code) => `"${code}"`)
        .join(',')}))`,
    };
  }

  callEqualsIgnoreCase(result) {
    return {
      type: ResultType.handler,
      text: function (args) {
        return {
          type: ResultType.formula,
          text: `ISNUMBER(SUBSTITUTE(TOONE.GET(${result.text
            .split('.')
            .map((code) => `"${code}"`)
            .join(',')}),${args}))`,
        };
      },
    };
  }

  callGet(result, methodName, context) {
    let code = methodName.substring(3);
    code = code.charAt(0).toLowerCase() + code.substring(1);
    if ((result.type = ResultType.bindingPath)) {
      const bindingPath = result.text + '.' + code;
      return {
        type: ResultType.bindingPath,
        valueType: context.getMetadata().getType(bindingPath),
        text: bindingPath,
      };
    } else {
      throw Error('未识别场景！');
    }
  }

  handleBindingPathResult(result, context) {
    const property = this.createChildren('property');
    const propertyRes = property.print(context);
    const propResType = propertyRes.type;
    switch (propResType) {
      case ResultType.identifier:
        const name = propertyRes.text;
        const methodName = `call${
          name.charAt(0).toUpperCase() + name.substring(1)
        }`;
        const handler = this[methodName];
        if (handler) {
          return handler.call(this, result);
        } else if (name.startsWith('get')) {
          return this.callGet(result, name, context);
        } else {
          throw Error('未识别场景！');
        }
      case ResultType.number:
        return {
          type: ResultType.bindingPath,
          text: result.text,
          index: propertyRes.text,
        };
      default:
        throw Error('未识别场景！');
    }
  }

  handleIdentifierResult(result, context) {
    const property = this.createChildren('property');
    const propertyRes = property.print(context);
    if (`${result.text}.${propertyRes.text}` == 'String.valueOf') {
      return {
        type: ResultType.text,
        valueType: ValueType.string,
        text: '',
      };
    } else if (
      `${result.text}.${propertyRes.text}` == 'StringUtil.trimWhitespace'
    ) {
      return {
        type: ResultType.handler,
        valueType: ValueType.string,
        text: function (args) {
          return {
            type: ResultType.formula,
            valueType: ValueType.string,
            text: `TRIM(${args})`,
          };
        },
      };
    } else {
      throw Error('未识别场景！');
    }
  }

  print(context) {
    const object = this.getObject();
    const res = object.print(context);
    const resType = res.type;
    switch (resType) {
      case ResultType.number:
      case ResultType.text:
      case ResultType.formula:
        return res;
      case ResultType.bindingPath:
        return this.handleBindingPathResult(res, context);
      case ResultType.identifier:
        return this.handleIdentifierResult(res, context);
      default:
        throw Error('未识别场景！');
    }
  }
}

MemberExpressionPrinter.type = 'MemberExpression';

export default MemberExpressionPrinter;
