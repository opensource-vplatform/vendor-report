/**
 * 添加唯一项
 * @param {*} item 
 * @param {*} array 
 */
export const addUniqueItem = function (item, array) {
  if (array.indexOf(item) === -1) {
    array.push(item);
  }
};
