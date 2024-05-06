import {
  getHost,
  parameterToUrl,
} from './utils';

const appendParam = function () {
    const paramUrl = parameterToUrl(['tenant', 'id']);
    return paramUrl != '' ? '&' + paramUrl : '';
};

/**
 * 获取数据源元信息url
 */
export const getTableMetadataUrl = function () {
    return `${getHost()}/webapi/innersysapi/VDassDbmsConsole/report?operate=queryMetadatas${appendParam()}`;
};

/**
 * 获取报表配置url
 * @returns 
 */
export const getReportConfigUrl = function () {
    return `${getHost()}/webapi/innersysapi/VDassDbmsConsole/report?operate=queryReportConfig${appendParam()}`;
};

/**
 * 获取保存报表配置url
 * @returns 
 */
export const getSaveReportUrl = function(){
    return `${getHost()}/webapi/innersysapi/VDassDbmsConsole/report?operate=saveReportConfig${appendParam()}`;
}

/**
 * 获取实体数据
 * @param {*} requestTables 
 * @returns 
 */
export const getTableDataUrl = function(requestTables){
    return `${getHost()}/webapi/innersysapi/VDassDbmsConsole/report?operate=getTableData${appendParam()}&requestTables=${requestTables}`;
}