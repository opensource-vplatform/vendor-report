import { genCommandImpl } from '../../util';

const dispatcher = {
    /**
     * 合并居中
     * @param {*} params
     */
    mergeCenter: function (sheet) {
        const selections = sheet.getSelections();
        for (let i = 0; i < selections.length; i++) {
            let { row, col, rowCount, colCount } = selections[i];
            row = row === -1 ? 0 : row;
            col = col === -1 ? 0 : col;
            sheet.addSpan(row, col, rowCount, colCount);
            const style = sheet.getActualStyle(row, col);
            style.hAlign = 1;
            sheet.setStyle(row, col, style);
        }
    },
    /**
     * 跨越合并
     * @param {*} params
     */
    mergeAcross: function (sheet) {
        const selections = sheet.getSelections();
        for (let i = 0; i < selections.length; i++) {
            let { row, col, rowCount, colCount } = selections[i];
            row = row === -1 ? 0 : row;
            col = col === -1 ? 0 : col;
            for (let m = 0; m < rowCount; m++) {
                for (let n = 0; n < colCount; n++) {
                    sheet.removeSpan(row + m, col + n);
                }
            }
            for (let j = 0; j < rowCount; j++) {
                sheet.addSpan(row + j, col, 1, colCount);
            }
        }
    },
    /**
     * 合并单元格
     * @param {*} params
     */
    mergeCells: function (sheet) {
        const selections = sheet.getSelections();
        const selectionsLength = selections.length;
        for (let i = 0; i < selectionsLength; i++) {
            let { row, col, rowCount, colCount } = selections[i];
            row = row === -1 ? 0 : row;
            col = col === -1 ? 0 : col;
            sheet.addSpan(row, col, rowCount, colCount);
        }
    },
    /**
     * 取消合并
     * @param {*} params
     */
    unMergeCell: function (sheet) {
        const selections = sheet.getSelections();
        for (let i = 0; i < selections.length; i++) {
            let { row, col, rowCount, colCount } = selections[i];
            row = row === -1 ? 0 : row;
            col = col === -1 ? 0 : col;
            for (let m = 0; m < rowCount; m++) {
                for (let n = 0; n < colCount; n++) {
                    sheet.removeSpan(row + m, col + n);
                }
            }
        }
    },
};

export default genCommandImpl('toone.style.merge', function (sheet, options) {
    const { type } = options;
    const handler = dispatcher[type];
    handler(sheet);
});
