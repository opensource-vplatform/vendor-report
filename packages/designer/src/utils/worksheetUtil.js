import { genUUID } from './commonUtil';
import {
  getNamespace,
  withBatchUpdate,
} from './spreadUtil';

//设置表单的标签值
export function setSheetTag(sheetInstance, key, vlaue) {
    if (!sheetInstance) {
        return;
    }
    const _tag = sheetInstance.tag();
    const _tagJson = _tag ? JSON.parse(_tag) : {};
    //生成表单的实例id
    if (!_tagJson.hasOwnProperty('instanceId')) {
        _tagJson['instanceId'] = genUUID();
    }

    if (key) {
        _tagJson[key] = vlaue;
    }

    sheetInstance.tag(JSON.stringify(_tagJson));
    return _tagJson;
}

//获取表单的标签值
export function getSheetTag(sheetInstance, key) {
    if (!sheetInstance) {
        return;
    }
    const _tag = sheetInstance.tag();
    const _tagJson = _tag ? JSON.parse(_tag) : {};
    if (key) {
        return _tagJson[key];
    }
    return;
}

//获取表单的实例id
export function getSheetInstanceId(sheetInstance) {
    if (!sheetInstance) {
        return;
    }

    let instanceId = getSheetTag(sheetInstance, 'instanceId');
    if (instanceId) {
        return instanceId;
    }

    //还没有实例id，则创建实例id并且输出示例id
    return setSheetTag(sheetInstance)['instanceId'];
}

//设置表单单元格的标签值
export function setCellTag(sheetInstance, row, col, key, vlaue) {
    if (!sheetInstance) {
        return;
    }

    const _tag = sheetInstance.getTag(row, col);
    const _tagJson = _tag ? JSON.parse(_tag) : {};
    //生成表单的实例id
    if (!_tagJson.hasOwnProperty('instanceId')) {
        _tagJson['instanceId'] = genUUID();
    }

    if (key) {
        _tagJson[key] = vlaue;
    }

    sheetInstance.setTag(row, col, JSON.stringify(_tagJson));
    return _tagJson;
}

//获取表单单元格的标签值
export function getCellTag(sheetInstance, row, col, key) {
    if (!sheetInstance) {
        return;
    }
    const _tag = sheetInstance.getTag(row, col);
    const _tagJson = _tag ? JSON.parse(_tag) : {};
    if (key) {
        return _tagJson[key];
    }
    return;
}

//获取表单单元格的实例id
export function getCellInstanceId(sheetInstance, row, col) {
    if (!sheetInstance) {
        return;
    }

    let instanceId = getCellTag(sheetInstance, row, col, 'instanceId');
    if (instanceId) {
        return instanceId;
    }

    //还没有实例id，则创建实例id并且输出示例id
    return setCellTag(sheetInstance, row, col)['instanceId'];
}

/**
 * 是否在表格区域
 */
export function inTableArea(sheet, row, col) {
    const tables = sheet.tables.all();
    if (tables && tables.length > 0) {
        for (let i = 0, l = tables.length; i < l; i++) {
            const table = tables[i];
            const range = table.range();
            if (range.contains(row, col)) {
                return true;
            }
        }
    }
    return false;
}

/**
 * 是否绑定了表格
 * @param {*} sheet
 */
export function isBindingTable(sheet) {
    const row = sheet.getActiveRowIndex();
    const col = sheet.getActiveColumnIndex();
    return inTableArea(sheet, row, col);
}

/**
 * 缩放工作表
 * @param {*} spread
 * @param {*} zoom
 */
export function zoom(spread, zoom) {
    withBatchUpdate(spread, (sheet) => {
        sheet.zoom(zoom);
        //showCellInView(spread);
    });
}

/**
 * 根据选择区域获取缩放比率
 * @param {*} spread
 * @returns
 */
export function getRatioBySelection(spread) {
    let zoomRatio = 1;
    const GC = getNamespace();
    const sheet = spread.getActiveSheet();
    if (sheet) {
        const selections = sheet.getSelections();
        if (selections && selections.length > 0) {
            let viewportWidth = sheet.getViewportWidth(1);
            let viewportHeight = sheet.getViewportHeight(1);
            let rowHeight = 0;
            let columnWidth = 0;
            const rowCount = sheet.getRowCount(
                GC.Spread.Sheets.SheetArea.colHeader
            );
            for (let index = 0; index < rowCount; index++) {
                rowHeight += sheet.getRowHeight(
                    index,
                    GC.Spread.Sheets.SheetArea.colHeader
                );
            }
            const columnCount = sheet.getColumnCount(
                GC.Spread.Sheets.SheetArea.rowHeader
            );
            for (let index = 0; index < columnCount; index++) {
                columnWidth += sheet.getColumnWidth(
                    index,
                    GC.Spread.Sheets.SheetArea.rowHeader
                );
            }
            let selection = selections[0];
            let selectionColumnWidth = 0;
            let selectionRowHeight = 0;
            if (selections.length > 1) {
                for (let index = 1; index < selections.length; index++) {
                    selection = selection.union(selections[index]);
                }
            }
            for (let index = 0; index < selection.rowCount; index++) {
                selectionRowHeight += +sheet.getRowHeight(
                    selection.row + index
                );
            }
            for (let index = 0; index < selection.colCount; index++) {
                selectionColumnWidth += +sheet.getColumnWidth(
                    selection.col + index
                );
            }
            const frozenRowCount = sheet.frozenRowCount();
            const frozenColumnCount = sheet.frozenColumnCount();
            for (let index = 0; index < frozenRowCount; index++) {
                selectionRowHeight += sheet.getRowHeight(index);
                viewportHeight += sheet.getRowHeight(index) * sheet.zoom();
            }
            for (let index = 0; index < frozenColumnCount; index++) {
                selectionColumnWidth += sheet.getColumnWidth(index);
                viewportWidth += sheet.getColumnWidth(index) * sheet.zoom();
            }
            zoomRatio = Math.min(
                (viewportWidth + columnWidth * sheet.zoom()) /
                    (selectionColumnWidth + columnWidth),
                (viewportHeight + rowHeight * sheet.zoom()) /
                    (selectionRowHeight + rowHeight)
            );
        }
    }
    return zoomRatio;
}

const showCellInView = function (spread) {
    const sheet = spread.getActiveSheet();
    if (sheet) {
        let topRow = 0;
        let leftColumn = 0;
        const GC = getNamespace();
        let vPosition = GC.Spread.Sheets.VerticalPosition.top;
        let hPosition = GC.Spread.Sheets.HorizontalPosition.left;
        const selections = sheet.getSelections();
        if (selections && selections.length > 0) {
            let selection = selections[0];
            for (let index = 1; index < selections.length; index++) {
                selection = selection.union(selections[index]);
            }
            topRow = selection.row;
            leftColumn = selection.col;
        }
        sheet.showCell(topRow, leftColumn, vPosition, hPosition);
    }
};

/**
 * 根据选择区域缩放
 * @param {*} spread
 * @returns
 */
export function zoomBySelection(spread) {
    withBatchUpdate(spread, (sheet) => {
        sheet.zoom(getRatioBySelection(spread));
        showCellInView(spread);
    });
}

const handleFrozenRowCount = function (rowCount, sheet) {
    const count = sheet.frozenRowCount();
    if (rowCount !== undefined && count !== rowCount) {
        const topRow1 = sheet.getViewportTopRow(0);
        const topRow2 = sheet.getViewportTopRow(1);
        const topRow = count ? topRow1 : topRow2;
        sheet.frozenRowCount(rowCount, topRow);
    }
};

const handleFrozenColumnCount = function (colCount, sheet) {
    const count = sheet.frozenColumnCount();
    if (colCount !== undefined && colCount !== count) {
        const leftColumn1 = sheet.getViewportLeftColumn(0);
        const leftColumn2 = sheet.getViewportLeftColumn(1);
        const leftColumn = count ? leftColumn1 : leftColumn2;
        sheet.frozenColumnCount(colCount, leftColumn);
    }
};

/**
 * 冻结行、列
 * @param {*} spread
 * @param {*} params
 */
export function frozen(spread, params) {
    withBatchUpdate(spread, (sheet) => {
        const { rowCount, colCount, trailingRowCount, trailingColCount } =
            params;
        handleFrozenRowCount(rowCount, sheet);
        handleFrozenColumnCount(colCount, sheet);
        if (trailingRowCount !== undefined) {
            sheet.frozenTrailingRowCount(
                trailingRowCount,
                sheet.getFrozenTrailingState(true)
            );
        }
        if (trailingColCount !== undefined) {
            sheet.frozenTrailingColumnCount(
                trailingColCount,
                sheet.getFrozenTrailingState()
            );
        }
    });
}

export function frozenBySelection(spread) {
    const sheet = spread.getActiveSheet();
    if (sheet) {
        const rowIndex = sheet.getActiveRowIndex();
        const columnIndex = sheet.getActiveColumnIndex();
        const frozenRowCount = sheet.frozenRowCount();
        const frozenColumnCount = sheet.frozenColumnCount();
        const topRow0 = sheet.getViewportTopRow(0);
        const topRow1 = sheet.getViewportTopRow(1);
        const leftColumn0 = sheet.getViewportLeftColumn(0);
        const leftColumn1 = sheet.getViewportLeftColumn(1);
        const bottomRow = sheet.getViewportBottomRow(1);
        const rightColumn = sheet.getViewportRightColumn(1);
        const topRow = frozenRowCount ? topRow0 : topRow1;
        const leftColumn = frozenColumnCount ? leftColumn0 : leftColumn1;
        let rowCount = rowIndex;
        let colCount = columnIndex;
        if (
            rowIndex < topRow ||
            bottomRow < rowIndex ||
            columnIndex < leftColumn ||
            rightColumn < columnIndex
        ) {
            rowCount = topRow + Math.round((bottomRow - topRow) / 2);
            colCount = leftColumn + Math.round((rightColumn - leftColumn) / 2);
        }
        frozen(spread, {
            rowCount,
            colCount,
        });
    }
}

export function unFrozen(spread) {
    withBatchUpdate(spread, (sheet) => {
        const rowCount = sheet.frozenRowCount();
        const colCount = sheet.frozenColumnCount();
        if (rowCount > 0) {
            sheet.frozenRowCount(0);
        }
        if (colCount > 0) {
            sheet.frozenColumnCount(0);
        }
        sheet.frozenTrailingColumnCount(0), sheet.frozenTrailingRowCount(0);
    });
}

export function setShowFormulas(spread, isShow) {
    withBatchUpdate(spread, (sheet) => {
        sheet.options.showFormulas = isShow;
    });
}

export function setRowFilter(spread) {
    withBatchUpdate(spread, (sheet) => {
        const selections = sheet.getSelections();
        if (selections && selections.length > 0) {
            let selection = selections[0];
            const GC = getNamespace();
            if (selection.rowCount === 1 && selection.colCount === 1) {
                selection = sheet.expandSelection(sheet, selection);
                sheet.deleteBlankContent(sheet, selection);
            }
            sheet.rowFilter(
                new GC.Spread.Sheets.Filter.HideRowFilter(selection)
            );
        }
    });
}

export function clearRowFilter(spread) {
    withBatchUpdate(spread, (sheet) => {
        const selections = sheet.getSelections();
        if (selections && selections.length > 0) {
            let selection = selections[0];
            const GC = getNamespace();
            if (selection.rowCount === 1 && selection.colCount === 1) {
                selection = sheet.expandSelection(sheet, selection);
                sheet.deleteBlankContent(sheet, selection);
            }
            if (sheet.rowFilter()) {
                sheet.rowFilter().unfilter();
                sheet.rowFilter(undefined);
            }
        }
    });
}

export function sortRange(spread, ascending) {
    withBatchUpdate(spread, (sheet) => {
        const selections = sheet.getSelections();
        if (selections && selections.length > 0) {
            const { row, col, rowCount, colCount } = selections[0];
            sheet.sortRange(row, col, rowCount, colCount, true, [
                {
                    index: -1 === col ? 0 : col,
                    ascending: ascending,
                },
            ]);
        }
    });
}

export function sortSelection(spread, byCol, sorts) {
    withBatchUpdate(spread, (sheet) => {
        const selections = sheet.getSelections();
        if (selections && selections.length > 0) {
            const { row, col, rowCount, colCount } = selections[0];
            sheet.sortRange(row, col, rowCount, colCount, byCol, sorts);
        }
    });
}
