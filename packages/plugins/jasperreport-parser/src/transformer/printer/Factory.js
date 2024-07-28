import BinaryExpressionPrinter from './impls/BinaryExpressionPrinter';
import CallExpressionPrinter from './impls/CallExpressionPrinter';
import ConditionalExpressionPrinter from './impls/ConditionalExpressionPrinter';
import DirectiveLiteralPrinter from './impls/DirectiveLiteralPrinter';
import DirectivePrinter from './impls/DirectivePrinter';
import ExpressionStatementPrinter from './impls/ExpressionStatementPrinter';
import FilePrinter from './impls/FilePrinter';
import IdentifierPrinter from './impls/IdentifierPrinter';
import MemberExpressionPrinter from './impls/MemberExpressionPrinter';
import NewExpressionPrinter from './impls/NewExpressionPrinter';
import NullLiteralPrinter from './impls/NullLiteralPrinter';
import NumericLiteralPrinter from './impls/NumericLiteralPrinter';
import ProgramPrinter from './impls/ProgramPrinter';
import StringLiteralPrinter from './impls/StringLiteralPrinter';

const Printers = {
  [BinaryExpressionPrinter.type]: BinaryExpressionPrinter,
  [CallExpressionPrinter.type]: CallExpressionPrinter,
  [ConditionalExpressionPrinter.type]: ConditionalExpressionPrinter,
  [DirectiveLiteralPrinter.type]: DirectiveLiteralPrinter,
  [DirectivePrinter.type]: DirectivePrinter,
  [ExpressionStatementPrinter.type]: ExpressionStatementPrinter,
  [FilePrinter.type]: FilePrinter,
  [MemberExpressionPrinter.type]: MemberExpressionPrinter,
  [NumericLiteralPrinter.type]: NumericLiteralPrinter,
  [ProgramPrinter.type]: ProgramPrinter,
  [StringLiteralPrinter.type]: StringLiteralPrinter,
  [IdentifierPrinter.type]: IdentifierPrinter,
  [NewExpressionPrinter.type]: NewExpressionPrinter,
  [NullLiteralPrinter.type]: NullLiteralPrinter,
};

export const create = function (node) {
  const type = node.type;
  const Printer = Printers[type];
  if (Printer) {
    return new Printer(node);
  }
  throw Error(`未识别节点类型：${type}`);
};
