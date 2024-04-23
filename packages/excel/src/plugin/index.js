import { create } from './factory';
import { enhance as dealFormula } from './formula/index';
import PluginTool from './Tool';

export const execute = function (value, plugins, tool) {
    plugins.forEach((plugin) => {
        const inst = create(plugin);
        value = inst.execute(value, tool);
    });
    return value;
};

/**
 * 处理公式
 * @param {*} formula 
 * @param {*} tool 
 */
export const enhanceFormula = function(formula,tool){
    if(formula){
        formula = dealFormula(formula,tool);
    }
    return formula;
}

export { PluginTool };
