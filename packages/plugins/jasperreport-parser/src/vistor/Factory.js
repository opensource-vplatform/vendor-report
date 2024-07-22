import BinaryExpressionPrinter from './impls/BinaryExpressionPrinter';
import CallExpressionPrinter from './impls/CallExpressionPrinter';
import ConditionalExpressionPrinter from './impls/ConditionalExpressionPrinter';
import DirectiveLiteralPrinter from './impls/DirectiveLiteralPrinter';
import DirectivePrinter from './impls/DirectivePrinter';
import ExpressionStatementPrinter from './impls/ExpressionStatementPrinter';
import FilePrinter from './impls/FilePrinter';
import MemberExpressionPrinter from './impls/MemberExpressionPrinter';
import NumericLiteralPrinter from './impls/NumericLiteralPrinter';
import ProgramPrinter from './impls/ProgramPrinter';
import StringLiteralPrinter from './impls/StringLiteralPrinter';

const Printers = [
  BinaryExpressionPrinter,
  CallExpressionPrinter,
  ConditionalExpressionPrinter,
  DirectiveLiteralPrinter,
  DirectivePrinter,
  ExpressionStatementPrinter,
  FilePrinter,
  MemberExpressionPrinter,
  NumericLiteralPrinter,
  ProgramPrinter,
  StringLiteralPrinter,
];

export const create = function (node) {
  const type = node.type;
  for (let i = 0; i < Printers.length; i++) {
    const Printer = Printers[i];
    if (Printer.type === type) {
      return new Printer(node);
    }
  }
  throw Error(`未识别节点类型：${type}`);
};
