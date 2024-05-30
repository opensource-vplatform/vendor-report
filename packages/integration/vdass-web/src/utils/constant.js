import {
  getHost,
  getParameter,
  getReportId,
  parameterToUrl,
} from './utils';

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

/**
 * 导出pdf
 * @returns 
 */
export const getExportPdfUrl = function(fileId){
  return `${getHost()}/reportapi/${getAppCode()}/report/exportPdf/${window.location.search}${fileId ? '&fileId=' + fileId : ''}`;
}


/**
 * 查询导出pdf进度
 * @returns 
 */
export const getExportPdfProgressUrl = function(fileId){
  return `${getHost()}/reportapi/${getAppCode()}/report/reportExportStreamProgress/${fileId}${window.location.search}`;
}