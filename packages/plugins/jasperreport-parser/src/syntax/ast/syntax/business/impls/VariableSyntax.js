import AbstractValueSyntax from '../AbstractValueSyntax';

class VariableSyntax extends AbstractValueSyntax {
  static SYMBOL = '$V';

  getSymbol() {
    return VariableSyntax.SYMBOL;
  }

  visit() {
    const ctx = this.getContext(),
      visitor = ctx.getVisitor();
    if (visitor && visitor.visitVariableSyntax) {
      visitor.visitVariableSyntax(this);
    }
  }
}

export default VariableSyntax;
