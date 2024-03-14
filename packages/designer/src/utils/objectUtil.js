export const isNull = function(obj){
    return obj === null;
}

export const isUndefined = function(obj){
    return obj === undefined;
}

export const isNullOrUndef = function(obj){
    return isNull(obj)||isUndefined(obj);
}

export const deepClone = function(obj) {
    const isArray = Array.isArray(obj);
    const isObject = '[object Object]' === Object.prototype.toString.call(obj);
    if (isArray) {
        const list = [];
        for (let i = 0; i < obj.length; i++) {
            list[i] = deepClone(obj[i]);
        }
        return list;
    }
    if (isObject) {
        const object = {};
        for (let r in obj) {
            if (obj.hasOwnProperty(r)) {
                object[r] = deepClone(obj[r]);
            }
        }
        return object;
    }
    return obj;
}