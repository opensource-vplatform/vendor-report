export const isUndef = function (obj) {
    return obj === undefined;
};

export const isNull = function (obj) {
    return obj === null;
};

export const isNullOrUndef = function (obj) {
    return isNull(obj) || isUndef(obj);
};

export const isObject = function (obj) {
    return '[object Object]' === Object.prototype.toString.call(obj);
};

export const isString = function (obj) {
    return typeof obj == 'string';
};

export const isFunction = function (obj) {
    return typeof obj == 'function';
};

export const isNotBlank = function (obj) {
    return typeof obj == 'string' && obj.trim().length > 0;
};
