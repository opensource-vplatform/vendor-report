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
    });
}

/**
 * 根据选择区域缩放
 * @param {*} spread
 * @returns
 */
export function zoomBySelection(spread) {
    withBatchUpdate(spread, (sheet) => {
        let zoomRatio = 1;
        const selections = sheet.getSelections();
        if (selections && selections.length > 0) {
            const viewportWidth = sheet.getViewportWidth(1);
            const viewportHeight = sheet.getViewportHeight(1);
            const GC = getNamespace();
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
            if (1 < selections.length) {
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
        sheet.zoom(zoomRatio);
    });
}
