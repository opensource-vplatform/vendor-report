import { createSlice } from '@reduxjs/toolkit';
import { applyToSelectedCell, withBatchUpdate } from './spreadUtil';
/**
 * 设置显示省略号
 * @param {*} spread
 * @param {*} delta
 */
export function setShowEllipsis(spread, isShow) {
    withBatchUpdate(spread, (sheet) => {
        applyToSelectedCell(sheet, (sheet, row, col) => {
            const style = sheet.getActualStyle(row, col);
            style.showEllipsis = isShow;
            sheet.setStyle(row, col, style);
        });
    });
}

export function setShrinkToFit(spread, isSet) {
    withBatchUpdate(spread, (sheet) => {
        applyToSelectedCell(sheet, (sheet, row, col) => {
            const style = sheet.getActualStyle(row, col);
            style.shrinkToFit = isSet;
            sheet.setStyle(row, col, style);
        });
    });
}
