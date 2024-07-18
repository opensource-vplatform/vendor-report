import {
  formulaToAST,
  toAST,
} from '../../utils';

export function execute(ast, tool) {
  const args = ast.arguments;

  if (args && args.length > 1) {
    throw Error('TOONE.SEQ函数参数个数最多只能一个，请检查配置！');
  }

  const parameter = args.reduce((res, cur) => {
    if (cur.value) {
      res.push(cur.value);
    }
    return res;
  }, []);
  const result = tool.seq(...parameter);
  if (result.type == 'text') {
    return toAST(result.value);
  } else {
    return formulaToAST(result.value);
  }
}
