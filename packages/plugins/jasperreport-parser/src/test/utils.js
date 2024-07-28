
const getType = function (obj) {
    const str = Object.prototype.toString.call(obj);
    const type = str.match(/\b\w+\b/g);
    return type.length < 2 ? 'Undefined' : type[1];
};

export const equals = function (source, target) {
    if (source === target) {
        return true;
    } else if (
        (source === null && target !== null) ||
        (source !== null && target === null)
    ) {
        return false;
    }
    const sourceType = getType(source);
    const targetType = getType(target);
    if (sourceType !== targetType) {
        return false;
    }
    if (sourceType == 'Object' || sourceType == 'Array') {
        const sourceKeys = Object.keys(source);
        const sourceKeyLen = sourceKeys.length;
        const targetKeys = Object.keys(target);
        const targetKeyLen = targetKeys.length;
        if (sourceKeyLen == 0 && targetKeyLen == 0) {
            return true;
        }
        if (sourceKeyLen !== targetKeyLen) {
            return false;
        }
        for (let index = 0; index < sourceKeyLen; index++) {
            const key = sourceKeys[index];
            if (!equals(source[key], target[key])) {
                return false;
            }
        }
        return true;
    } else {
        return source === target;
    }
};