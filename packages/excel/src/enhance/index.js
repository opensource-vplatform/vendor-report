import {
  enhance,
  getTableCodes,
} from './formula/index';
import { execute } from './plugin/index';

/**
 * 执行插件
 * @param {type:"formula"|"text",value:string} value 单元格值
 * @param Array<{type:string,[config:string]:any}> plugins
 * @param Tool tool  工具
 * @returns {type:'formula'|'text',value:string}
 */
export const exePlugins = function (value, plugins, tool) {
    return execute(value,plugins,tool);
};

/**
 * 增强函数
 * @param {type:'formula'|'text',value:string} formula 函数
 * @param Tool tool 工具
 * @returns {type:'formula'|'text',value:string}
 */
export const enhanceFormula = function (formula, tool) {
    if(formula&&formula.type=='formula'){
        return enhance(formula.value,tool);
    }else{
        return formula;
    }
};

/**
 * 从公式中获取绑定的实体编号信息
 * @param string formula 公式
 * @returns Array<string>
 */
export const getTableCodesFromFormula = function(formula){
    if(formula){
        return getTableCodes(formula);
    }else{
        return [];
    }
}
