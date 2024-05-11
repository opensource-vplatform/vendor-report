import { toAST } from '../../utils';

export function execute(ast, tool) {
    const args = ast.arguments;
    if (!args || args.length == 0) {
        throw Error('TOONE.GET函数未传递参数，请检查配置！');
    }
    let code = null,
        fieldCode = undefined;
    code = args[0].value;
    fieldCode = args[1]?.value;
    const value = tool.getValue(code, fieldCode);
    return toAST(value);
}
