export const isNull = function(obj){
    return obj === null;
}

export const isUndefined = function(obj){
    return obj === undefined;
}

export const isNullOrUndef = function(obj){
    return isNull(obj)||isUndefined(obj);
}