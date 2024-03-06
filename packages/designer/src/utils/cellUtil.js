import {
  applyToSelectedColumn,
  applyToSelectedRow,
  getNamespace,
  withBatchUpdate,
} from './spreadUtil';

const SelectionRangeType = {
    0: 'Sheet',
    1: 'OnlyRow',
    2: 'OnlyColumn',
    3: 'OnlyCells',
    4: 'Mixture',
    Mixture: 4,
    OnlyCells: 3,
    OnlyColumn: 2,
    OnlyRow: 1,
    Sheet: 0,
};

const getSelectionTypeWithSelections = function (selections) {
    let type = undefined;
    for (let index = 0; index < selections.length; index++) {
        const selection = selections[index];
        if (-1 === selection.col && -1 === selection.row) {
            return SelectionRangeType.Sheet;
        }
        if (-1 === selection.row) {
            if (undefined === type) {
                type = SelectionRangeType.OnlyColumn;
            } else if (type !== SelectionRangeType.OnlyColumn) {
                return SelectionRangeType.Mixture;
            }
        } else if (-1 === selection.col) {
            if (undefined === type) {
                type = SelectionRangeType.OnlyRow;
            } else if (t !== SelectionRangeType.OnlyRow) {
                return SelectionRangeType.Mixture;
            }
        } else if (undefined === type) {
            type = SelectionRangeType.OnlyCells;
        } else if (type !== SelectionRangeType.OnlyCells) {
            return SelectionRangeType.Mixture;
        }
    }
    return type;
};

const getSortedColumnSelections = function (selections) {
    for (let i = 0; i < selections.length - 1; i++) {
        for (let j = i + 1; j < selections.length; j++) {
            if (selections[i].col < selections[j].col) {
                const selection = selections[i];
                selections[i] = selections[j];
                selections[j] = selection;
            }
        }
    }
    return selections;
};

const getSortedRowSelections = function (selections) {
    for (let i = 0; i < selections.length - 1; i++) {
        for (let j = i + 1; j < selections.length; j++) {
            if (selections[i].row < selections[j].row) {
                const o = selections[i];
                selections[i] = selections[j];
                selections[j] = o;
            }
        }
    }
    return selections;
};

const canShiftCell = function (sheet, range) {
    const tables = sheet.tables.all();
    for (let index = 0; index < tables.length; index++) {
        let range1 = tables[index].range();
        if (
            !range.containsRange(range1) &&
            !range1.containsRange(range) &&
            range.intersect(
                range1.row,
                range1.col,
                range1.rowCount,
                range1.colCount
            )
        ) {
            return {
                ret: false,
                type: 'table',
            };
        }
    }
};

const canInsertRight = function (selections, sheet) {
    let result = true;
    const GC = getNamespace();
    for (let index = 0; index < selections.length; index++) {
        const selection = selections[index];
        const selections1 = [];
        const row = selection.row;
        const col = selection.col;
        const rowEnd = selection.row + selection.rowCount;
        const colEnd = selection.col + selection.colCount;
        const range = new GC.Spread.Sheets.Range(
            row,
            col,
            rowEnd - row,
            sheet.getColumnCount()
        );
        const res = canShiftCell(sheet, range);
        if (res) {
            return res.ret;
        }
        for (let index1 = row; index1 < rowEnd; index1++) {
            for (let index2 = col; index2 < colEnd; index2++) {
                let index3;
                for (
                    index3 = 0;
                    index3 < selections1.length &&
                    !selections1[index3].contains(index1, index2, 1, 1);
                    index3++
                ) {}
                const info = sheet.getFormulaInformation(index1, index2);
                if (index3 === selections1.length && info.isArrayFormula) {
                    selections1.push(info.baseRange);
                }
            }
        }
        if (0 === selections1.length) {
            return result;
        }
        let col1 = selections1[0].col;
        let row1 = selections1[0].row;
        let rowEnd1 = selections1[0].row + selections1[0].rowCount;
        for (let index1 = 1; index1 < selections1.length; index1++) {
            if (selections1[index1].col < col1) {
                col1 = selections1[index1].col;
            }
            if (selections1[index1].row < row1) {
                row1 = selections1[index1].row;
            }
            if (
                selections1[index1].row + selections1[index1].rowCount <
                rowEnd1
            ) {
                rowEnd1 =
                    selections1[index1].row + selections1[index1].rowCount;
            }
        }
        if (
            col1 < selection.col ||
            row1 < selection.row ||
            rowEnd1 > selection.row + selection.rowCount
        ) {
            result = false;
            break;
        }
    }
    return result;
};

const canInsertDown = function (selections, sheet) {
    let result = true;
    const GC = getNamespace();
    for (let index = 0; index < selections.length; index++) {
        const selection = selections[index];
        const selections1 = [];
        const row = selection.row;
        const col = selection.col;
        const rowEnd = selection.row + selection.rowCount;
        const colEnd = selection.col + selection.colCount;
        const range = new GC.Spread.Sheets.Range(
            row,
            col,
            sheet.getRowCount(),
            colEnd - col
        );
        const res = canShiftCell(sheet, range);
        if (res) {
            return res.ret;
        }
        for (let index1 = row; index1 < rowEnd; index1++)
            for (let index2 = col; index2 < colEnd; index2++) {
                let index3 = undefined;
                for (
                    index3 = 0;
                    index3 < selections1.length &&
                    !selections1[index3].contains(index1, index2, 1, 1);
                    index3++
                ) {}
                const info = sheet.getFormulaInformation(index1, index2);
                if (index3 === selections1.length && info.isArrayFormula) {
                    selections1.push(info.baseRange);
                }
            }
        if (0 === selections1.length) {
            return result;
        }
        let col1 = selections1[0].col;
        let row1 = selections1[0].row;
        let colEnd1 = selections1[0].col + selections1[0].colCount;
        for (let index1 = 1; index1 < selections1.length; index1++) {
            if (selections1[index1].col < col1) {
                col1 = selections1[index1].col;
            }
            if (selections1[index1].row < row1) {
                row1 = selections1[index1].row;
            }
            if (
                selections1[index1].col + selections1[index1].colCount <
                colEnd1
            ) {
                colEnd1 =
                    selections1[index1].row + selections1[index1].rowCount;
            }
        }
        if (
            col1 < selection.col ||
            row1 < selection.row ||
            colEnd1 > selection.col + selection.colCount
        ) {
            result = false;
            break;
        }
    }
    return result;
};

export function insertRightCells(spread) {
    const GC = getNamespace();
    withBatchUpdate(spread, (sheet) => {
        let selections = sheet.getSelections();
        if (
            getSelectionTypeWithSelections(selections) ===
            SelectionRangeType.OnlyCells
        ) {
            selections = getSortedColumnSelections(selections);
            const columnCount = sheet.getColumnCount();
            if (!canInsertRight(selections, sheet)) {
                return;
            }
            for (let index = 0; index < selections.length; index++) {
                const { row, col, rowCount, colCount } = selections[index];
                const option = GC.Spread.Sheets.CopyToOptions.all;
                sheet.addColumns(columnCount, colCount);
                sheet.moveTo(
                    row,
                    col,
                    row,
                    col + colCount,
                    rowCount,
                    columnCount - col,
                    option
                );
            }
        }
    });
}

export function insertDownCells(spread) {
    const GC = getNamespace();
    withBatchUpdate(spread, (sheet) => {
        let selections = sheet.getSelections();
        if (
            SelectionRangeType.OnlyCells ===
            getSelectionTypeWithSelections(selections)
        ) {
            selections = getSortedRowSelections(selections);
            const rowCount = sheet.getRowCount();
            if (!canInsertDown(selections, sheet)) {
                return u.res.insertCellOfTable;
            }
            for (let index = 0; index < selections.length; index++) {
                const selection = selections[index];
                const option = GC.Spread.Sheets.CopyToOptions.all;
                sheet.addRows(rowCount, selection.rowCount);
                sheet.moveTo(
                    selection.row,
                    selection.col,
                    selection.row + selection.rowCount,
                    selection.col,
                    rowCount - selection.row,
                    selection.colCount,
                    option
                );
            }
        }
    });
}

export const insertRows = function (spread) {
    withBatchUpdate(spread, (sheet) => {
        const commandManager = spread.commandManager();
        commandManager.execute({
            cmd: 'gc.spread.contextMenu.insertRows',
            sheetName: sheet.name(),
            selections: sheet.getSelections(),
            activeRow: sheet && sheet.getActiveRowIndex(),
            activeCol: sheet && sheet.getActiveColumnIndex(),
        });
    });
};

export const insertColumns = function (spread) {
    withBatchUpdate(spread, (sheet) => {
        const commandManager = spread.commandManager();
        commandManager.execute({
            cmd: 'gc.spread.contextMenu.insertColumns',
            sheetName: sheet.name(),
            selections: sheet.getSelections(),
            activeRow: sheet && sheet.getActiveRowIndex(),
            activeCol: sheet && sheet.getActiveColumnIndex(),
        });
    });
};

export const insertSheet = function (spread) {
    withBatchUpdate(spread, (sheet) => {
        spread.addSheet(spread.getSheetIndex(sheet.name()));
    });
};

export const deleteLeftCells = function (spread) {
    const GC = getNamespace();
    withBatchUpdate(spread, (sheet) => {
        let selections = sheet.getSelections();
        selections = getSortedColumnSelections(selections);
        for (let index = 0; index < selections.length; index++) {
            const selection = selections[index];
            const option = GC.Spread.Sheets.CopyToOptions.all;
            sheet.moveTo(
                selection.row,
                selection.col + selection.colCount,
                selection.row,
                selection.col,
                selection.rowCount,
                sheet.getColumnCount() - (selection.col + selection.colCount),
                option
            );
        }
    });
};

export const deleteUpCells = function (spread) {
    const GC = getNamespace();
    withBatchUpdate(spread, (sheet) => {
        let selections = sheet.getSelections();
        selections = getSortedRowSelections(selections);
        for (let index = 0; index < selections.length; index++) {
            const selection = selections[index];
            const option = GC.Spread.Sheets.CopyToOptions.all;
            const rowCount =
                sheet.getRowCount() - (selection.row + selection.rowCount);
            sheet.moveTo(
                selection.row + selection.rowCount,
                selection.col,
                selection.row,
                selection.col,
                rowCount,
                selection.colCount,
                option
            );
            if (rowCount < selection.rowCount) {
                const type =
                    GC.Spread.Sheets.StorageType.data |
                    GC.Spread.Sheets.StorageType.axis |
                    GC.Spread.Sheets.StorageType.bindingPath |
                    GC.Spread.Sheets.StorageType.comment |
                    GC.Spread.Sheets.StorageType.hyperlink |
                    GC.Spread.Sheets.StorageType.sparkline |
                    GC.Spread.Sheets.StorageType.style |
                    GC.Spread.Sheets.StorageType.tag;
                this.sheet().clear(
                    selection.row + rowCount,
                    selection.col,
                    selection.rowCount - rowCount,
                    selection.colCount,
                    3,
                    type
                );
            }
        }
    });
};

export const deleteRows = function (spread) {
    withBatchUpdate(spread, (sheet) => {
        const commandManager = spread.commandManager();
        commandManager.execute({
            cmd: 'gc.spread.contextMenu.deleteRows',
            sheetName: sheet.name(),
            selections: sheet.getSelections(),
            activeRow: sheet && sheet.getActiveRowIndex(),
            activeCol: sheet && sheet.getActiveColumnIndex(),
        });
    });
};

export const deleteColumns = function (spread) {
    withBatchUpdate(spread, (sheet) => {
        const commandManager = spread.commandManager();
        commandManager.execute({
            cmd: 'gc.spread.contextMenu.deleteColumns',
            sheetName: sheet.name(),
            selections: sheet.getSelections(),
            activeRow: sheet && sheet.getActiveRowIndex(),
            activeCol: sheet && sheet.getActiveColumnIndex(),
        });
    });
};

export const deleteSheet = function (spread) {
    withBatchUpdate(spread, (sheet) => {
        spread.removeSheet(spread.getSheetIndex(sheet.name()));
    });
};

export const setRowsHeight = function (spread, rowHeight) {
    withBatchUpdate(spread, (sheet) => {
        applyToSelectedRow(sheet, (sheet, row) => {
            sheet.setRowHeight(row, rowHeight);
        });
    });
};

export const setColumnsWidth = function (spread, columnWidth) {
    withBatchUpdate(spread, (sheet) => {
        applyToSelectedColumn(sheet, (sheet, col) => {
            sheet.setColumnWidth(col, columnWidth);
        });
    });
};

export const autofitRows = function (spread) {
    withBatchUpdate(spread, (sheet) => {
        applyToSelectedRow(sheet, (sheet, row) => {
            sheet.autoFitRow(row);
        });
    });
};

export const autofitColumns = function (spread) {
    withBatchUpdate(spread, (sheet) => {
        applyToSelectedColumn(sheet, (sheet, col) => {
            sheet.autoFitColumn(col);
        });
    });
};

export const defaultRowHeight = function (spread, rowHeight) {
    withBatchUpdate(spread, (sheet) => {
        sheet.defaults.rowHeight = rowHeight;
    });
};

export const defaultColWidth = function (spread, colWidth) {
    withBatchUpdate(spread, (sheet) => {
        sheet.defaults.colWidth = colWidth;
    });
};

export const hideRows = function (spread) {
    withBatchUpdate(spread, (sheet) => {
        applyToSelectedRow(sheet, (sheet, row) => {
            sheet.setRowVisible(row, false);
        });
    });
};

export const hideColumns = function (spread) {
    withBatchUpdate(spread, (sheet) => {
        applyToSelectedColumn(sheet, (sheet, col) => {
            sheet.setColumnVisible(col, false);
        });
    });
};

export const unHideRows = function (spread) {
    const GC = getNamespace();
    withBatchUpdate(spread, (sheet) => {
        const selections = sheet.getSelections();
        if (1 === selections.length && 1 === selections[0].rowCount) {
            const selection = selections[0];
            let index = 0;
            for (let i = 0; i <= selection.row; i++) {
                if (sheet.getRowVisible(i)) {
                    index = i;
                    break;
                }
            }
            if (!(selection.row !== index && 0 === index)) {
                sheet.setRowVisible(index - 1, true);
                sheet.showRow(
                    index - 1,
                    GC.Spread.Sheets.VerticalPosition.nearest
                );
            }
        } else {
            applyToSelectedRow(sheet, (sheet, row) => {
                sheet.setRowVisible(row, true);
            });
        }
    });
};

export const unHideColumns = function (spread) {
    const GC = getNamespace();
    withBatchUpdate(spread, (sheet) => {
        const selections = sheet.getSelections();
        if (1 === selections.length && 1 === selections[0].colCount) {
            const selection = selections[0];
            let index = 0;
            for (let  i = 0; i <= selection.col; i++){
                if (sheet.getColumnVisible(i)) {
                    index = i;
                    break
                }
            }
            if(!(selection.col !== index && 0 === index)){
                sheet.setColumnVisible(index - 1, true);
                sheet.showColumn(index - 1, GC.Spread.Sheets.HorizontalPosition.nearest);
            }
        } else{
            applyToSelectedColumn(sheet, (sheet, col) => {
                sheet.setColumnVisible(col, true);
            });
        }
    });
};
