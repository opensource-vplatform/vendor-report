import { isUndefined } from '@utils/objectUtil';
import { getNamespace } from '@utils/spreadUtil';

import { getBindText } from '../utils';

const hasBindField = function (sheet, row, col) {
    const bindingPath = sheet.getBindingPath(row, col);
    //有绑定信息，且绑定的为实体字段
    return bindingPath && bindingPath.split('.').length == 2;
};

const isShowIcon = function (sheet, row, col) {
    return hasBindField(sheet, row, col);
};

const getCellText = function (context, value) {
    const { sheet, row, col } = context;
    const bindingPath = sheet.getBindingPath(row, col);
    if (!bindingPath) {
        return value;
    }
    const spread = sheet.getParent();
    const text = getBindText(bindingPath, spread);
    return isUndefined(text) ? value : text;
};

/**
 * 绘制单元格
 * @param {*} context
 * @param {*} style
 * @param {*} value
 */
const paintCell = function (context, style, value) {
    const { sheet, row, col } = context;
    if (hasBindField(sheet, row, col)) {
        //绑定字段，添加角标
        const GC = getNamespace();
        const posType = GC.Spread.Sheets.CornerPosition;
        style.decoration = {
            cornerFold: {
                size: 8,
                position: posType.rightBottom,
                color: 'green',
            },
        };
    }
    value = getCellText(context, value);
    return value;
};

export default {
    isShowIcon,
    paintCell,
};
