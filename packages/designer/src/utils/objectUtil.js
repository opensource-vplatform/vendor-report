const is = function (obj, type) {
    return typeof obj === type;
};

export const isArray = function (obj) {
    return Array.isArray(obj);
};

export const isFunction = function (obj) {
    return is(obj, 'function');
};

export const isString = function(obj){
    return is(obj,'string');
}

export const isNull = function (obj) {
    return obj === null;
};

export const isUndefined = function (obj) {
    return obj === undefined;
};

export const isNullOrUndef = function (obj) {
    return isNull(obj) || isUndefined(obj);
};

export const isObject = function (obj) {
    return '[object Object]' === Object.prototype.toString.call(obj);
};

export const deepClone = function (obj) {
    if (isArray(obj)) {
        const list = [];
        for (let i = 0; i < obj.length; i++) {
            list[i] = deepClone(obj[i]);
        }
        return list;
    }
    if (isObject(obj)) {
        const object = {};
        for (let r in obj) {
            if (obj.hasOwnProperty(r)) {
                object[r] = deepClone(obj[r]);
            }
        }
        return object;
    }
    return obj;
};

export const unoin = function (source, target) {
    if (!isArray(source) || !isArray(target)) {
        throw Error('并集对象必须为数组');
    }
    const result = [];
    const handler = (item) => {
        if (result.indexOf(item) == -1) {
            result.push(item);
        }
    };
    source.forEach(handler);
    target.forEach(handler);
    return result;
};

export const diff = function (source, target, except = []) {
    if (!isObject(source) || !isObject(target)) {
        throw Error('差异化对象必须为Object');
    }
    const targetKeys = Object.keys(target);
    let result = null;
    targetKeys.forEach((key) => {
        if (except.indexOf(key) == -1) {
            const val = source[key];
            const val1 = target[key];
            if (isObject(val) && isObject(val1)) {
                const res = diff(val, val1);
                if (res !== null) {
                    result = result ? result : {};
                    result[key] = res;
                }
            } else {
                if (val !== val1) {
                    result = result ? result : {};
                    result[key] = val1;
                }
            }
        }
    });
    return result;
};
