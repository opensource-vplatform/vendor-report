import { getNamespace } from './spreadUtil';
/**
 * 将公式解析成语法树
 * @param {*} formula
 * @returns
 */
export const formulaToAST = function (formula) {
    const GC = getNamespace();
    return GC.Spread.Sheets.CalcEngine.formulaToExpression(null, formula, 0, 0);
};

const argList = [
    ['url', ''],
    ['mode', 1],
    ['height', 0],
    ['width', 0],
    ['clipX', 0],
    ['clipY', 0],
    ['clipHeight', 0],
    ['clipWidth', 0],
    ['vAlign', 1],
    ['hAlign', 1],
];

/**
 * 解析Image函数参数
 * @param {*} args
 * @returns
 */
export const parseImageArgs = function (args) {
    const params = {};
    const GC = getNamespace();
    const ExpType = GC.Spread.CalcEngine.ExpressionType;
    args.forEach((arg, index) => {
        if (arg) {
            const argDef = argList[index];
            const argName = argDef[0];
            const def = argDef[1];
            const argType = arg.type;
            let val = undefined;
            switch (argType) {
                case ExpType.string:
                case ExpType.number:
                    val = arg.value;
                    break;
                case ExpType.missingArgument:
                    val = def;
                    break;
                default:
                    throw Error('未识别IMAGE函数参数，请检查！');
            }
            params[argName] = val;
        }
    });
    return params;
};
