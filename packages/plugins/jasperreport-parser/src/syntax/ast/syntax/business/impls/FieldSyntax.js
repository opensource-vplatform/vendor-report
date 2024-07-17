import AbstractValueSyntax from '../AbstractValueSyntax';

class FieldSyntax extends AbstractValueSyntax {

  static SYMBOL = '$F';

  getSymbol(){
    return FieldSyntax.SYMBOL;
  }

  visit() {
    const ctx = this.getContext(),
      visitor = ctx.getVisitor()
    if (visitor && visitor.visitFieldSyntax) {
      visitor.visitFieldSyntax(this)
    }
  }
}

export default FieldSyntax
