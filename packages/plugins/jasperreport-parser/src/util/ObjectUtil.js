/**
 * 深度克隆对象
 * @param {*} object 
 * @returns 
 */
export const clone = function(object){
    return JSON.parse(JSON.stringify(object));
}