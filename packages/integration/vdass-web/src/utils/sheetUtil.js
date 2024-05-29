//缩放到合适大小
export const zoomToFit = function (spreadJson, width) {
    const sheets = spreadJson.sheets;
    const showVerticalScrollbar = !(spreadJson.showVerticalScrollbar === false);
    if (sheets) {
        for (let sheet of Object.values(sheets)) {
            if (sheet.visible) {
                let sheetWidth = showVerticalScrollbar ? 40 : 0;
                const rowHeaderVisible = !(sheet.rowHeaderVisible === false)
                if(rowHeaderVisible){
                    sheetWidth += sheet.rows&&sheet.rows[0]&&sheet.rows[0].size ? sheet.rows[0].size:0;
                }
                const columns = sheet.columns;
                if (columns) {
                    columns.forEach((column) => {
                        sheetWidth += column && column.size ? column.size : 0;
                    });
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
