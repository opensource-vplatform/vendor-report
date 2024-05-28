import { isNullOrUndef } from './objectUtil';
import { getNamespace } from './spreadUtil';

function getWidth(sheet, col, colCount) {
    let width = sheet.options.rowHeaderVisible
        ? sheet.defaults.rowHeaderColWidth
        : 0;
    while (colCount > 0) {
        width += sheet.getColumnWidth(col++);
        colCount--;
    }
    return width;
}

function getHeight(sheet, row, rowCount) {
    let height = sheet.options.colHeaderVisible
        ? sheet.defaults.colHeaderRowHeight
        : 0;
    while (rowCount > 0) {
        height += sheet.getRowHeight(row++);
        rowCount--;
    }
    return height;
}

/**
 * 获取工作表使用数据
 * 如：
 * @param {*} spread 
 * @returns 
 */
function getUsedRange(spread) {
    const sheet = spread.getActiveSheet();
    if (sheet) {
        const GC = getNamespace();
        const usedRange = sheet.getUsedRange(
            GC.Spread.Sheets.UsedRangeType.all
        );
        if (usedRange) {
            const { row, col, rowCount, colCount } = usedRange;
            return {
                left: getWidth(sheet, 0, col),
                top: getHeight(sheet, 0, row),
                width: getWidth(sheet, col, colCount),
                height: getHeight(sheet, row, rowCount),
            };
        } else {
            const row = sheet.getRowCount();
            const col = sheet.getColumnCount();
            return {
                left: 0,
                top: 0,
                width: getWidth(sheet, 0, col),
                height: getHeight(sheet, 0, row),
            };
        }
    }
    return null;
}

/**
 * 获取当前激活工作表快照数据（base64数据格式）
 * @param {*} spread 
 * @param {*} width 
 * @param {*} height 
 * @returns 
 */
function getActiveSheetSnapshot(spread, width, height) {
    const el = spread.getHost();
    const sourceCanvas = el.querySelector("canvas[gcuielement=\"gcWorksheetCanvas\"]");
    const canvasWidth = sourceCanvas.width;
    const convasHeight = sourceCanvas.height;
    const position = getUsedRange(spread);
    if(position){
        const widthZoom = canvasWidth/position.width;
        const heightZoom = convasHeight/position.height;
        let zoom = 1;
        if(widthZoom<1||heightZoom<1){
            //获取缩放比例：如果当前可视范围内无法展示所有内容，快照时需缩放，否则只快照到可视范围内容
            zoom = widthZoom>heightZoom ? heightZoom:widthZoom;
        }
        let preZoom = 1;
        const sheet = spread.getActiveSheet();
        if(zoom!=1){
            preZoom = sheet.zoom();
            sheet.zoom(zoom);
        }
        if (isNullOrUndef(width)) {
            width = position.width;
        }
        if (isNullOrUndef(height)) {
            height = position.height;
        }
        const scrolledRows = sheet.getViewportTopRow(1);
        const scroledColumns = sheet.getViewportLeftColumn(1);
        const scrolledHeight = getHeight(sheet,0,scrolledRows);
        const scrolledWidth = getWidth(sheet,0,scroledColumns);
        if(scrolledHeight>0||scrolledWidth>0){
            //存在滚动条隐藏高度
            sheet.scroll(0-scrolledHeight,0-scrolledWidth);
        }
        const retCanvas = document.createElement('canvas');
        const retCtx = retCanvas.getContext('2d');
        retCanvas.width = width;
        retCanvas.height = height;
        retCtx.drawImage(
            sourceCanvas,
            position.left,
            position.top,
            position.width,
            position.height,
            0,
            0,
            width,
            height
        );
        const data = retCanvas.toDataURL('png');
        if(zoom!=1){
            //恢复成原始缩放大小
            sheet.zoom(preZoom);
        }
        if(scrolledHeight>0||scrolledWidth>0){
            //恢复到原始滚动位置
            sheet.scroll(scrolledHeight,scrolledWidth);
        }
        return data;
    }else{
        return null;
    }
}

export const saveAsImg = function (spread, width, height) {
    return getActiveSheetSnapshot(spread, width, height);
};

window.saveAsImg = saveAsImg;
