/* const ip = '10.1.40.115';
const port = '8889'; */
const origin = window.location.origin;
const path = `module-operation!executeOperation`;
const baseURL = `${origin}/${path}?ajaxRequest=true`;
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
