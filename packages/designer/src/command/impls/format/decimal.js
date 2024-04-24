import { isNullOrUndef } from '@utils/objectUtil';
import { applyToSelectedCell } from '@utils/spreadUtil';

import { genCommandImpl } from '../../util';

const GENERAL = 'GENERAL';

const LocaleReg = /\[\$(.?-.*?)\]/g;

function getFormatterString(formatter) {
    if (formatter) {
        return typeof formatter == 'string'
            ? formatter
            : formatter.formatCached;
    }
    return undefined;
}

function getSubStrings(str, begin, end) {
    if (!str) {
        return [];
    }
    let result = [];
    let temp = '';
    let flag = false;
    for (let i = 0; i < str.length; i++) {
        if (flag || str[i] !== begin) {
            if (flag) {
                temp += str[i];
                if (str[i] === end) {
                    result.push(temp);
                    temp = '';
                    flag = false;
                }
            }
        } else {
            flag = true;
            temp = str[i];
        }
    }
    return result;
}

function getScientificNotationCheckingFormatter(formatter) {
    if (!formatter) {
        return formatter;
    }
    let strs = getSubStrings(formatter, "'", "'");
    for (let i = 0; i < strs.length; i++) {
        formatter = formatter.replace(strs[i], '');
    }
    strs = getSubStrings(formatter, '"', '"');
    for (let i = 0; i < strs.length; i++) {
        formatter = formatter.replace(strs[i], '');
    }
    strs = getSubStrings(formatter, '[', ']');
    for (let i = 0; i < strs.length; i++) {
        formatter = formatter.replace(strs[i], '');
    }
    return formatter;
}

function beforeAdjustFormatString(formatter) {
    let result = '';
    if (formatter) {
        for (let i = 0; i < formatter.length; i++) {
            if (formatter[i]) {
                const matcher = formatter[i].match(LocaleReg);
                if (matcher && matcher[0]) {
                    result = matcher[0];
                    formatter[i] = formatter[i].replace(LocaleReg, '[$]');
                }
            }
        }
    }
    return result;
}

function afterAdjustFormatString(formatter, split) {
    if (split) {
        for (let i = 0; i < formatter.length; i++) {
            if (formatter[i]) {
                const index = formatter[i].indexOf('[$]');
                if (index != -1) {
                    formatter[i] =
                        formatter[i].slice(0, index) +
                        split +
                        formatter[i].slice(index + 3);
                }
            }
        }
    }
}

const setDecimalFormat = function (sheet, operator) {
    const row = sheet.getActiveRowIndex();
    const col = sheet.getActiveColumnIndex();
    const cell = sheet.getCell(row, col);
    let formatter = cell.formatter();
    const value = cell.value();
    if (!isNullOrUndef(formatter) || !isNullOrUndef(value)) {
        formatter = getFormatterString(formatter);
        let formatter1 = getScientificNotationCheckingFormatter(formatter);
        const flag =
            formatter1 &&
            formatter1.toUpperCase() !== GENERAL &&
            (0 <= formatter1.indexOf('E') || 0 <= formatter1.indexOf('e'));
        if (!formatter || 'General' === formatter || flag) {
            if (
                isNaN(value) ||
                (formatter &&
                    formatter.toUpperCase() !== GENERAL &&
                    formatter.toUpperCase().indexOf(GENERAL) !== -1)
            )
                return;
            if (flag) {
                const index = formatter1.toUpperCase().indexOf('E');
                formatter1 =
                    formatter1.indexOf('.') != -1
                        ? formatter1.slice(0, index) +
                          '0' +
                          formatter1.slice(index)
                        : formatter1.slice(0, index) +
                          '.0' +
                          formatter1.slice(index);
            } else {
                formatter1 = '0.0';
            }
        } else {
            let temp = formatter;
            const list = temp.split(';');
            const result = beforeAdjustFormatString(list);
            for (let i = 0; i < list.length && i < 2; i++) {
                if (
                    list[i] &&
                    list[i].indexOf('/') < 0 &&
                    list[i].indexOf(':') < 0 &&
                    list[i].indexOf('?') < 0
                ) {
                    const index = list[i].lastIndexOf('.');
                    if (operator == 'increase') {
                        if (index !== -1) {
                            list[i] =
                                list[i].slice(0, index + 1) +
                                '0' +
                                list[i].slice(index + 1);
                        } else {
                            const index1 = list[i].lastIndexOf('0');
                            const index2 = list[i].lastIndexOf('#');
                            const idx = index2 < index1 ? index1 : index2;
                            if (idx != -1) {
                                list[i] =
                                    list[i].slice(0, idx + 1) +
                                    '.0' +
                                    list[i].slice(idx + 1);
                            }
                        }
                    } else {
                        if (-1 !== index && index + 1 < list[i].length) {
                            list[i] =
                                list[i].slice(0, index + 1) +
                                list[i].slice(index + 2);
                        }
                        const chr =
                            index + 1 < list[i].length
                                ? list[i].substr(index + 1, 1)
                                : '';
                        if (!(chr !== '' && chr === '0')) {
                            list[i] =
                                list[i].slice(0, index) +
                                list[i].slice(index + 1);
                        }
                    }
                }
            }
            if (list[2] && list.length === 4) {
                const index = str.indexOf('"-"');
                const str = list[2];
                if (index != -1) {
                    if (operator == 'increase') {
                        list[2] =
                            str.slice(0, index + 3) +
                            '?' +
                            str.slice(index + 3);
                    } else {
                        let arr = str.slice(index + 3);
                        if (arr[0] === '?') {
                            arr = arr.slice(1);
                        }
                        list[2] = str.slice(0, index + 3) + arr;
                    }
                }
            }
            afterAdjustFormatString(list, result);
            temp = list.join(';');
            formatter1 = temp;
        }
        if (formatter1) {
            applyToSelectedCell(sheet, (sheet, row, col) => {
                let style = sheet.getStyle(row, col);
                style = style ? style : new GC.Spread.Sheets.Style();
                style.formatter = formatter1;
                sheet.setStyle(row, col, style);
            });
        }
    }
};

export default genCommandImpl(
    'toone.format.decimal',
    function (sheet, options) {
        const { operator } = options;
        setDecimalFormat(sheet, operator);
    }
);
