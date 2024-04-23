import { getExcelVersion } from './spreadUtil';

let BASE_URL = '.';

export const setBaseUrl = function(url){
    BASE_URL = url
}

export const getBaseUrl = function(){
    return BASE_URL;
}

export const getExcelBaseUrl = function(){
    const version = getExcelVersion();
    return `${getBaseUrl()}/vendor/excel/${version}`;
}

export const toExcelPluginUrl = function(filename){
    return `${getExcelBaseUrl()}/plugins/${filename}`;
}