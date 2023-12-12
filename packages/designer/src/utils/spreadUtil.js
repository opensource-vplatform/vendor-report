/**
 * 批量更新数据到spread
 * @param {*} spread
 * @param {*} updateHandler
 */
export const withBatchUpdate = function (spread, updateHandler) {
    if (spread) {
        spread.suspendPaint();
        try {
            updateHandler(spread);
        } finally {
            spread.resumePaint();
        }
    }
};

/**
 * 将样式应用到选择的单元格
 * @param {*} spread 
 * @param {*} func 
 * @returns 
 */
export const applyStyleToSelectedCell = function (spread, func) {
    if (!spread) return;
    const sheet = spread.getActiveSheet();
    if (!sheet) return;
    let i, j;
    const selections = sheet.getSelections();
    for (let k = 0; k < selections.length; k++) {
        const selection = selections[k];
        const col = selection.col,
            row = selection.row,
            rowCount = selection.rowCount,
            colCount = selection.colCount;
        let style, r, c;
        if (col === -1 || row === -1) {
            if (col === -1 && row === -1) {
                for (r = 0; r < rowCount; r++) {
                    func(sheet, r, -1);
                }
                for (c = 0; c < colCount; c++) {
                    func(sheet, -1, c);
                }
                for (r = 0; r < rowCount; r++) {
                    for (c = 0; c < colCount; c++) {
                        style = sheet.getStyle(r, c);
                        if (style) {
                            func(sheet, r, c);
                        }
                    }
                }
            } else if (col === -1) {
                for (r = 0; r < rowCount; r++) {
                    func(sheet, r + row, -1);
                }
                for (r = 0; r < rowCount; r++) {
                    for (c = 0; c < colCount; c++) {
                        style = sheet.getStyle(r + row, c);
                        if (style) {
                            func(sheet, r + row, c);
                        }
                    }
                }
            } else if (row === -1) {
                for (c = 0; c < colCount; c++) {
                    func(sheet, -1, c + col);
                }
                for (r = 0; r < rowCount; r++) {
                    for (c = 0; c < colCount; c++) {
                        style = sheet.getStyle(r, c + col);
                        if (style) {
                            func(sheet, r, c + col);
                        }
                    }
                }
            }
        } else {
            for (i = 0; i < rowCount; i++) {
                for (j = 0; j < colCount; j++) {
                    func(sheet, row + i, col + j);
                }
            }
        }
    }
};

/**
 * 将更新应用到选中的单元格
 * @param {*} spread 
 * @param {*} func 
 * @returns 
 */
export const applyToSelectedCell = function (spread, func) {
    if (!spread) return;
    const sheet = spread.getActiveSheet();
    if (!sheet) return;
    let i, j;
    const selections = sheet.getSelections();
    for (let k = 0; k < selections.length; k++) {
        const selection = selections[k];
        const col = selection.col,
            row = selection.row,
            rowCount = selection.rowCount,
            colCount = selection.colCount;
        if (col === -1 && row === -1) {
            func(sheet, -1, -1);
        } else if (row === -1) {
            for (i = 0; i < colCount; i++) {
                func(sheet, -1, col + i);
            }
        } else if (col === -1) {
            for (i = 0; i < rowCount; i++) {
                func(sheet, row + i, -1);
            }
        } else {
            for (i = 0; i < rowCount; i++) {
                for (j = 0; j < colCount; j++) {
                    func(sheet, row + i, col + j);
                }
            }
        }
    }
};
