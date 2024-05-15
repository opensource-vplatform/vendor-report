import { getOffsetFromBody } from './domUtil';
import { isObject } from './objectUtil';

/**
 * 批量更新数据到spread
 * @param {*} spread
 * @param {*} updateHandler
 */
export const withBatchUpdate = function (spread, updateHandler) {
    if (spread) {
        spread.suspendPaint();
        const sheet = spread.getActiveSheet();
        if (sheet) {
            try {
                updateHandler(sheet);
            } finally {
                spread.resumePaint();
            }
        }
    }
};

const withTransaction = function (handler, cmd, context, options, isUndo) {
    const GC = getNamespace();
    const Commands = GC.Spread.Sheets.Commands;
    if (isUndo) {
        const config = { cmd, ...options };
        Commands.undoTransaction(context, config);
        return true;
    } else {
        Commands.startTransaction(context, options);
        try {
            handler(options);
        } catch (e) {}
        Commands.endTransaction(context, options);
        return true;
    }
};

export const withBatchSettingInTransaction = function (
    spread,
    handler,
    ...args
) {
    return withTransaction(
        (options) => {
            withBatchCalcUpdate(spread, handler, options);
        },
        ...args
    );
};

export const exeCommandImpl = function (handler, context, options, isUndo) {
    const GC = getNamespace();
    var Commands = GC.Spread.Sheets.Commands;
    //options.cmd = cmdName;
    if (isUndo) {
        Commands.undoTransaction(context, options);
        return true;
    } else {
        Commands.startTransaction(context, options);
        const sheet = options.sheet;
        if (sheet) {
            const config = options.options;
            sheet.suspendPaint();
            sheet.suspendCalcService();
            handler(sheet, config);
            sheet.resumeCalcService();
            sheet.resumePaint();
            Commands.endTransaction(context, options);
            return true;
        }
    }
};

/**
 * 执行命令
 * @param {*} spread
 * @param {*} cmd
 * @param {*} options
 */
export const exeCommand = function (spread, cmd, options) {
    const commandManager = spread.commandManager();
    const sheet = spread.getActiveSheet();
    if (sheet) {
        const sheetName = sheet.name();
        commandManager.execute({ cmd, sheetName, sheet, options });
    }
};

export const withBatchCalcUpdate = function (spread, updateHandler, ...args) {
    if (spread) {
        spread.suspendPaint();
        spread.suspendCalcService();
        const sheet = spread.getActiveSheet();
        if (sheet) {
            try {
                args && args.length > 0
                    ? updateHandler(...args)
                    : updateHandler(sheet);
            } finally {
                spread.resumeCalcService(false);
                spread.resumePaint();
            }
        }
    }
};

/**
 * 将样式应用到选择的单元格
 * @returns
 */
export const applyStyleToSelectedCell = function (sheet, func) {
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
 * @returns
 */
export const applyToSelectedCell = function (sheet, func) {
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

export const applyToSelectedRow = function (sheet, func) {
    const selections = sheet.getSelections();
    for (let index = 0; index < selections.length; index++) {
        const selection = selections[index];
        const rowStart = -1 === selection.row ? 0 : selection.row;
        for (let index1 = 0; index1 < selection.rowCount; index1++) {
            func(sheet, rowStart + index1);
        }
    }
};

export const applyToSelectedColumn = function (sheet, func) {
    const selections = sheet.getSelections();
    for (let index = 0; index < selections.length; index++) {
        const selection = selections[index];
        const colStart = -1 === selection.col ? 0 : selection.col;
        for (let index1 = 0; index1 < selection.colCount; index1++) {
            func(sheet, colStart + index1);
        }
    }
};

/**
 * 获取命令空间
 */
export const getNamespace = function () {
    return window.GC;
};

export const SelectionTypes = {
    Mixture: 4,
    OnlyCells: 3,
    OnlyColumn: 2,
    OnlyRow: 1,
    Sheet: 0,
};

/**
 * 获取选择类型
 * @param {} selections
 */
export const getSelectionType = function (selections) {
    let type = null;
    for (let index = 0; index < selections.length; index++) {
        const selection = selections[index];
        if (-1 === selection.col && -1 === selection.row)
            return SelectionTypes.Sheet;
        if (-1 === selection.row) {
            if (type === null) {
                type = SelectionTypes.OnlyColumn;
            } else if (type !== SelectionTypes.OnlyColumn) {
                return SelectionTypes.Mixture;
            }
        } else if (-1 === selection.col) {
            if (type === null) {
                type = SelectionTypes.OnlyRow;
            } else if (type !== SelectionTypes.OnlyRow) {
                return SelectionTypes.Mixture;
            }
        } else if (type === null) {
            type = SelectionTypes.OnlyCells;
        } else if (type !== SelectionTypes.OnlyCells) {
            return SelectionTypes.Mixture;
        }
    }
    return type;
};

export function isTableSheet(sheet) {
    const GC = getNamespace();
    if (GC.Spread.Sheets.TableSheet && GC.Spread.Sheets.TableSheet.TableSheet) {
        return sheet instanceof GC.Spread.Sheets.TableSheet.TableSheet;
    }
    return false;
}

export function getWorkSheetForTableSheetFreeHeaderArea(
    sheet,
    notSyncSelections
) {
    let freeHeaderSheet = sheet._freeHeaderSheet;
    const freeHeaderArea = sheet.applyFreeHeaderArea();
    if (!freeHeaderSheet || sheet._freeHeaderSheetJson !== freeHeaderArea)
        try {
            const workbook = new on.Spread.Sheets.Workbook(
                document.createElement('div'),
                {
                    sheetCount: 1,
                }
            );
            freeHeaderSheet = workbook.getActiveSheet();
            sheet._freeHeaderSheet = freeHeaderSheet;
            sheet._freeHeaderSheetJson = freeHeaderArea;
            freeHeaderSheet.suspendPaint();
            freeHeaderSheet.suspendCalcService();
            freeHeaderSheet.suspendDirty();
            freeHeaderSheet.suspendEvent();
            freeHeaderArea.keepUnknownFormulas = true;
            freeHeaderSheet.fromJSON(freeHeaderArea);
        } catch (e) {}
    if (!notSyncSelections) {
        const selections = sheet.getSelections(
            on.Spread.Sheets.SheetArea.colHeader
        );
        if (selections.length > 0) {
            const selection = selections[0];
            if (freeHeaderSheet != null) {
                freeHeaderSheet.setSelection(
                    selection.row,
                    selection.col,
                    selection.rowCount,
                    selection.colCount
                );
            }
        }
    }
    return freeHeaderSheet;
}

export function setTableSheetFreeHeader(sheet, json) {
    sheet.applyFreeHeaderArea(json);
}

export function getExcelVersion() {
    const GC = getNamespace();
    return GC.Spread.Sheets.productInfo.productVersion;
}

export function getSpecifiedRect(spread, range, position, sheet) {
    let pos;
    if (position) {
        if (isObject(position)) {
            pos = position;
        }
    } else {
        let el = spread.getHost().querySelector('canvas[gcuielement]');
        const offset = getOffsetFromBody(el);
        pos = {
            left: offset.offsetLeft,
            top: offset.offsetTop,
        };
    }
    const result = [];
    const GC = getNamespace();
    for (let i = 0; i <= 2; i++)
        for (let j = 0; j <= 2; j++) {
            const leftCol = sheet.getViewportLeftColumn(j);
            const rightCol = sheet.getViewportRightColumn(j);
            const topRow = sheet.getViewportTopRow(i);
            const rowCount = sheet.getViewportBottomRow(i) - topRow + 1;
            const colCount = rightCol - leftCol + 1;
            if (!(rowCount <= 0 || colCount <= 0)) {
                const rg = new GC.Spread.Sheets.Range(
                    topRow,
                    leftCol,
                    rowCount,
                    colCount
                );
                const rang = range.getIntersect(
                    rg,
                    Math.max(rg.rowCount, range.rowCount),
                    Math.max(rg.colCount, range.colCount)
                );
                if (rang) {
                    const rect = new GC.Spread.Sheets.Rect(0, 0, 0, 0);
                    const rangeRect = sheet.getRangeRect(i, j, rang);
                    (rect.x = rangeRect.x + ((pos && pos.left) || 0)),
                        (rect.y = rangeRect.y + ((pos && pos.top) || 0)),
                        (rect.width = rangeRect.width - 2),
                        (rect.height = rangeRect.height - 2),
                        result.push(rect);
                }
            }
        }
    return result;
}
