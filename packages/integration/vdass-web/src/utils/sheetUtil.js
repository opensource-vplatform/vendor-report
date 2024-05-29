//缩放到合适大小
export const zoomToFit = function (spreadJson, width) {
    const sheets = spreadJson.sheets;
    const showVerticalScrollbar = !(spreadJson.showVerticalScrollbar === false);
    if (sheets) {
        for (let sheet of Object.values(sheets)) {
            if (sheet.visible) {
                let sheetWidth = showVerticalScrollbar ? 30 : 0;
                const rowHeaderVisible = !(sheet.rowHeaderVisible === false)
                if(rowHeaderVisible){
                    sheetWidth += sheet.defaults?.rowHeaderColWidth||40;
                }
                const columns = sheet.columns;
                if (columns) {
                    columns.forEach((column) => {
                        sheetWidth += column && column.size ? column.size : 0;
                    });
                }else{
                    const defColWidth = sheet.defaults?.colWidth||62;
                    const colCount = sheet.columnCount;
                    sheetWidth += defColWidth*colCount;                 
                }
                if (sheetWidth < width) {
                    const zoom = width / sheetWidth;
                    sheet.zoomFactor = zoom;
                }
                break;
            }
        }
    }
};
