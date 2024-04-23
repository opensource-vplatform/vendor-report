import {
  getSortedColumnSelections,
  getSortedRowSelections,
} from '@utils/cellUtil';
import { getNamespace } from '@utils/spreadUtil';

import { genCommandImpl } from '../../util';

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

function getSelectionTypeWithSelections(selections) {
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
}

function canInsertRight(selections, sheet) {
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
}

function canShiftCell(sheet, range) {
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
}

function canInsertDown(selections, sheet) {
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
}

const dispatcher = {
    right: function (sheet) {
        const GC = getNamespace();
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
    },
    down: function (sheet) {
        const GC = getNamespace();
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
    },
};

export default genCommandImpl('toone.insert.cell', function (sheet, options) {
    const { position } = options;
    const handler = dispatcher[position];
    handler(sheet);
});
