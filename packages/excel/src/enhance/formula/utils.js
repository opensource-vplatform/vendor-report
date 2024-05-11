import { getNamespace } from '../../utils/spreadUtil';

function _getType(type) {
    const GC = getNamespace();
    return GC.Spread.CalcEngine.ExpressionType[type];
}

/**
 * 转换成字符语法树
 * @param string value
 * @returns object
 */
export function toStringAST(value) {
    return {
        lMt: true,
        type: _getType('string'),
        value,
    };
}

/**
 * 转换成数值语法树
 * @param number value
 * @returns object
 */
export function toNumberAST(value) {
    return {
        lMt: true,
        originalValue: value + '',
        type: _getType('number'),
        value,
    };
}

/**
 * 转换成布尔语法树
 * @param boolean value
 * @returns object
 */
export function toBooleanAST(value) {
    return { lMt: true, type: _getType('boolean'), value };
}

export function toAST(value){
    const type = typeof value;
    switch(type){
        case 'number':
            return toNumberAST(value);
        case "boolean":
            return toBooleanAST(value);
        default:
            return toStringAST(value);
    }
}
