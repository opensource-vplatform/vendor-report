import {
  formulaToAST,
  toAST,
} from '../../utils';

export function execute(ast, tool) {
  const args = ast.arguments;
  if (!args || args.length == 0) {
    throw Error('TOONE.GET函数未传递参数，请检查配置！');
  }

  const parameter = args.reduce((res, cur) => {
    let _res = res;
    if (cur.value) {
      if (_res) {
        _res = `${_res}.${cur.value}`;
      } else {
        _res = cur.value;
      }
    }
    return _res;
  }, '');
  const result = tool.getValue(parameter);

  if (result.type == 'text') {
    return toAST(result.value);
  } else {
    return formulaToAST(result.value);
  }
}
