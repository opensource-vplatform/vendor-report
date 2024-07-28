import SimplyNodePrinter from '../SimplyNodePrinter';

class ExpressionStatementPrinter extends SimplyNodePrinter {
  getAttrName() {
    return 'expression';
  }
}

ExpressionStatementPrinter.type = 'ExpressionStatement';

export default ExpressionStatementPrinter;
