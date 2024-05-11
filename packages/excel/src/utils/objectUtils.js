export const isNullOrUndef = function(obj){
    return obj === null || obj === undefined;
}

export const isObject = function(obj){
    return '[object Object]' === Object.prototype.toString.call(obj);
}

export const isFunction = function(obj){
    return typeof obj == 'function';
}

export const isNotBlank = function(obj){
    return typeof obj == 'string' && obj.trim().length>0;
}