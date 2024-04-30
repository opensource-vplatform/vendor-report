import {
  getHost,
  getParameter,
  getReportId,
  parameterToUrl,
} from './utils';

/* //获取数据集数据url
const batchGetDatasURL = `${baseURL}&operation=GetVDataWebExcelDatas`;
//获取数据集url
const queryAllDataNodesURI = `${baseURL}&operation=QueryAllDataNodes`;
//保存报表配置数据
const saveReportConfigURI = `${baseURL}&operation=SaveVDataWebExcel`;
//获取报表配置数据
const getReportConfigURI = `${baseURL}&operation=GetVDataWebExcel`; */

//获取数据集数据url
export const batchGetDatasURL = `/api/GetVDataWebExcelDatas`;
//获取数据集url
export const queryAllDataNodesURI = `/api/QueryAllDataNodes`;
//保存报表配置数据
export const saveReportConfigURI = `/api/SaveVDataWebExcel`;
//获取报表配置数据
export const getReportConfigURI = `/api/GetVDataWebExcel`;

const appendParam = function () {
    const paramUrl = parameterToUrl(['tenant', 'id']);
    return `?tenant=${getParameter('tenant')}&id=${getReportId()}${
        paramUrl != '' ? '&' + paramUrl : ''
    }`;
};

const getAppCode = function(){
    return getParameter('appcode');
}

/**
 * 获取数据源元信息url
 */
export const getTableMetadataUrl = function () {
    return `${getHost()}/sysapi/${getAppCode()}/report/queryMetadatas${appendParam()}`;
};

/**
 * 获取报表配置url
 * @returns 
 */
export const getReportConfigUrl = function () {
    return `${getHost()}/sysapi/${getAppCode()}/report/queryReportConfig${appendParam()}`;
};

/**
 * 获取保存报表配置url
 * @returns 
 */
export const getSaveReportUrl = function(){
    return `${getHost()}/sysapi/${getAppCode()}/report/saveReportConfig${appendParam()}`;
}

/**
 * 获取实体数据
 * @param {*} requestTables 
 * @returns 
 */
export const getTableDataUrl = function(requestTables){
    return `${getHost()}/sysapi/${getAppCode()}/report/getTableData${appendParam()}&requestTables=${requestTables}`;
}