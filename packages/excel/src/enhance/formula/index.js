/**
 * 处理公式
 * @param {*} formula 
 * @param {*} tool 
 */
export const enhance = function(formula,tool){
    if(formula){
        formula = dealFormula(formula,tool);
    }
    return {type:'',value:''};
}