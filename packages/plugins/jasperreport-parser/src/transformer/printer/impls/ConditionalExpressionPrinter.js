import { ResultType } from '../Constanst';
import Printer from '../Printer';

class ConditionalExpressionPrinter extends Printer {
  print(context) {
    const test = this.createChildren('test');
    const consequent = this.createChildren('consequent');
    const alternate = this.createChildren('alternate');
    const testExp = test.print(context);
    const consequentExp = consequent.print(context);
    const alternateExp = alternate.print(context);
    return {
      type: ResultType.formula,
      text: `IF(${testExp.text},${this.toArg(consequentExp)},${this.toArg(
        alternateExp
      )})`,
    };
  }
}

ConditionalExpressionPrinter.type = 'ConditionalExpression';

export default ConditionalExpressionPrinter;
