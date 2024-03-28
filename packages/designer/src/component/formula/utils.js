import { getNamespace } from '@utils/spreadUtil';

/**
 * 生成下一个名称
 * name->name1
 * name1->name2
 * [name]->[name1]
 * [name1]->[name2]
 * @param {*} name
 * @returns
 */
export const nextName = function (name) {
    let nameStr = name.trim();
    const isBrack = nameStr.startsWith('[') && nameStr.endsWith(']');
    if (isBrack) {
        nameStr = nameStr.substring(1, nameStr.length - 1);
    }
    const indexs = [];
    let index = nameStr.length - 1;
    while (index > -1) {
        const code = nameStr.charCodeAt(index);
        if (code > 47 && code < 58) {
            indexs.push(nameStr.charAt(index));
        } else {
            break;
        }
        index--;
    }
    if (indexs.length == 0) {
        return isBrack ? `[${nameStr}1]` : nameStr + '1';
    } else {
        let index = parseInt(indexs.reverse().join(''));
        nameStr = nameStr.substring(0, nameStr.length - (index + '').length);
        index++;
        return isBrack ? `[${nameStr}${index}]` : `${nameStr}${index}`;
    }
};

/**
 * 获取非动态参数个数
 * @param {*} args
 */
const getUnDynamicCount = function (metadataArgs) {
    let count = 0;
    if (metadataArgs && metadataArgs.length > 0) {
        for (let index = 0; index < metadataArgs.length; index++) {
            const element = metadataArgs[index];
            if (element.dynamic) {
                break;
            }
            count++;
        }
    }
    return count;
};

export const selectionToRang = function (selections, sheet, spread) {
    const rangs = [];
    if (selections && selections.length > 0) {
        const GC = getNamespace();
        const r1c1Style =
            GC.Spread.Sheets.ReferenceStyle.r1c1 ===
            spread.options.referenceStyle;
        const allRelative =
            GC.Spread.Sheets.CalcEngine.RangeReferenceRelative.allRelative;
        const rangeToFormula = GC.Spread.Sheets.CalcEngine.rangeToFormula;
        selections.forEach((selection) => {
            const { row, col } = selection;
            rangs.push(
                rangeToFormula(selection, row, col, allRelative, r1c1Style)
            );
        });
    }
    return rangs.join(',');
};

const expressionArgToFormulaArg = function (expressionArg, sheet) {
    if (expressionArg) {
        return GC.Spread.Sheets.CalcEngine.expressionToFormula(
            sheet,
            expressionArg
        );
    }
    return '';
};

/**
 * 生成参数
 * 如果表达式参数个数大于元数据中固定参数个数时，
 * 元数据先添加动态参数，添加的动态参数转换成固定参数，直到固定参数个数大于等于表达式参数个数为止
 * @param {*} metadataArgs 元数据参数
 * @param {*} expressionArgs 表达式参数
 */
export const toArgs = function (metadataArgs, expressionArgs, sheet, spread) {
    if (!expressionArgs || expressionArgs.length == 0) {
        //表达式参数不存在，则返回元数据参数定义信息
        return metadataArgs && metadataArgs.length > 0
            ? metadataArgs.map((metadataArg) => {
                  return {
                      ...metadataArg,
                      exp: '',
                  };
              })
            : [];
    }
    if (!metadataArgs || metadataArgs.length == 0) {
        //无元数据或元数据中参数定义为空，则直接返回空数组
        return [];
    }
    const defArgs = [...metadataArgs];
    const expArgCount = expressionArgs.length;
    do {
        const count = getUnDynamicCount(defArgs);
        if (count >= expArgCount) {
            break;
        }
        for (let i = 0, len = defArgs.length; i < len; i++) {
            const arg = defArgs[i];
            if (arg.dynamic) {
                defArgs.push({
                    ...arg,
                    name: nextName(arg.name),
                    dynamic: true,
                    exp: '',
                });
            }
            defArgs[i] = {
                ...arg,
                dynamic: false,
            };
        }
    } while (true);
    for (let i = 0, len = defArgs.length; i < len; i++) {
        const arg = expressionArgs[i];
        defArgs[i] = {
            ...defArgs[i],
            exp: expressionArgToFormulaArg(arg, sheet),
        };
    }
    return defArgs;
};
