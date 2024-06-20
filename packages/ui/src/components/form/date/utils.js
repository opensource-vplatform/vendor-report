/**
 * 转换成日期字符串
 * 例子：2024-05-02
 * @param {*} date 
 * @returns 
 */
export const dateToStr = function (date) {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const d = date.getDate();
    return `${year}-${month < 10 ? '0' + month : month}-${
        d < 10 ? '0' + d : d
    }`;
};

/**
 * 获取当前日期的字符串
 * @returns 
 */
export const getNowDateStr = function(){
    return dateToStr(new Date());
}

/**
* 获取指定月份有多少天
* 例子：getDateCount("2024-02-01") -> 29
* @param {*} date
* @returns
*/
export const getDateCount = function (date) {
   const d = new Date(date);
   return new Date(d.getFullYear(), d.getMonth() + 1, 0).getDate();
};