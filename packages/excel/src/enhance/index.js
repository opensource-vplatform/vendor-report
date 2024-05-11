import { enhance } from './formula/index';
import { exePlugins } from './plugin/index';

/**
 * 执行插件
 * @param {type:"formula"|"text",value:string} value 单元格值
 * @param Array<{type:string,[config:string]:any}> plugins
 * @param Tool tool  工具
 * @returns {type:'formula'|'text',value:string}
 */
export const exePlugins = function (value, plugins, tool) {
    return exePlugins(value,plugins,tool);
};

/**
 * 增强函数
 * @param string formula 函数
 * @param Tool tool 工具
 * @returns {type:'formula'|'text',value:string}
 */
export const enhanceFormula = function (formula, tool) {
    return enhance(formula,tool);
};
