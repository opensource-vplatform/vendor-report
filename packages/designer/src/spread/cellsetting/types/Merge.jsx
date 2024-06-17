import { getCellTag } from '@utils/worksheetUtil';

import { setIconDecoration } from '../utils';

function paintCell(context, style, value) {
    const { sheet, row, col } = context;
    const colMerge = getCellTag(sheet, row, col, 'columnMerge');
    const rowMerge = getCellTag(sheet, row, col, 'rowMerge');
    let type = rowMerge
        ? colMerge
            ? 'rowColMerge'
            : 'rowMerge'
        : colMerge
          ? 'colMerge'
          : null;
    if (type !== null) {
        setIconDecoration(style, type);
    }
    return value;
}

/**
 * 获取单元格扩展方向
 * @param {*} sheet
 * @param {*} row
 * @param {*} col
 * @returns
 */
function getDirection(sheet, row, col) {
    return null;
}

export default { paintCell, getDirection };
