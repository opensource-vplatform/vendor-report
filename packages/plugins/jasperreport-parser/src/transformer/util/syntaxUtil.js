import { parse as toAST } from '@babel/parser';

import { create } from '../printer/Factory';

const Force_Type_Syntax = /\(Map\)|\(String\)|\((Double)\)|\.doubleValue\(\)/g;

const Parameter_Syntax = /\$P{((\w+))}/g;

const Field_Syntax = /\$F{(\w+)}/g;

const Variable_Syntax = /\$V{(\w+)}/g;

const Break_Line_Syntax = /\n/g;

/**
 * 移除java强制类型转换语法
 */
function removeForceTypeChange(text) {
  return text.replace(Force_Type_Syntax, '');
}

function convertSyntax(text) {
  text = text.replace(Parameter_Syntax, (group, match) => `$P("${match}")`);
  text = text.replace(Field_Syntax, (group, match) => `$F("${match}")`);
  text = text.replace(Variable_Syntax, (group, match) => `$V("${match}")`);
  text = text.replace(Break_Line_Syntax,"");
  return text;
}

/**
 * 调整语法
 * @param {*} text
 */
function adjustSyntax(text) {
  if (typeof text == 'string') {
    text = removeForceTypeChange(text);
    return convertSyntax(text);
  }
  return text;
}

export const parse = function (syntax, context) {
  syntax = adjustSyntax(syntax);
  const node = toAST(syntax);
  const printer = create(node);
  return printer.print(context);
};
