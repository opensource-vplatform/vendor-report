import jsonpath from 'jsonpath';

import ParseReportJson from '../../../src/template/ParseReportJson';
import { getUnits } from '../units/index';

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

export const sortObj = function (object) {
    if (getType(object) == 'Object') {
        let keys = Object.keys(object);
        keys = keys.sort();
        const result = {};
        keys.forEach((key) => {
            result[key] = sortObj(object[key]);
        });
        return result;
    }
    return object;
};

const ignorePath = [
    {
        code: 'style',
        expression: '$..dataTable..[?(@.style)]',
    },
    {
        code: 'name',
        expression: '$..namedStyles..[?(@.name)]',
    },
];

export const testUnits = function () {
    const units = getUnits();
    const errors = [];
    units.forEach((unit) => {
        const { title, source, test, datas, setting } = unit;
        new ParseReportJson({
            ...setting,
            reportJson: source,
            datas: datas,
        });

        ignorePath.forEach(function ({ code, expression }) {
            const filteredSourceObj = jsonpath.query(source, expression);
            filteredSourceObj.forEach((item) => {
                delete item[code];
            });

            const filteredTestObj = jsonpath.query(test, expression);
            filteredTestObj.forEach((item) => {
                delete item[code];
            });
        });

        if (!equals(source, test)) {
            errors.push({
                title,
                source,
                test,
                datas,
                setting,
            });
        }
    });
    return errors;
};
