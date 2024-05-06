import { genUUID as md5 } from './commonUtil';

const urlSearchParams = new URLSearchParams(window.location.search);
const host = window.location.origin;
const ctxPathKey = "ctxPath"

export const getParameter = function(key){
    return urlSearchParams.get(key);
}

export const getReportId = function(){
    return urlSearchParams.get("id")||md5();
}

export const getHost = function(){
    const ctxPath = getParameter(ctxPathKey);
    return ctxPath ? host+'/'+ctxPath:host;
}

export const getTitle = function(def){
    return getParameter("reportTitle")||def;
}

export const parameterToUrl = function(except){
    except = except||[];
    const url = [];
    for (const [key, value] of urlSearchParams.entries()) {
        if(except.indexOf(key)==-1){
            url.push(`${key}=${encodeURIComponent(value)}`);
        }
    }
   return url.join('&')
}