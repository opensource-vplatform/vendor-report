import { getBindingPaths as getPaths } from './cellsetting/index';
import DefaultCell from './DefaultCell';

export const enhanceSheet = function (sheet) {
    const defaultStyle = sheet.getDefaultStyle();
    defaultStyle.cellType = new DefaultCell();
    sheet.setDefaultStyle(defaultStyle);
};

/**
 * 从插件配置信息中获取数据绑定信息
 * @param {*} plugins 
 * @returns 
 */
export const getBindingPaths = function(plugins){
    return getPaths(plugins);
}
