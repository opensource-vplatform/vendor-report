import {
  getSortedColumnSelections,
  getSortedRowSelections,
} from '@utils/cellUtil';
import { getNamespace } from '@utils/spreadUtil';

import { genCommandImpl } from '../../util';

const dispatcher = {
    left: function (sheet) {
        const GC = getNamespace();
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
    },
    up: function (sheet) {
        const GC = getNamespace();
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
                const StorageType = GC.Spread.Sheets.StorageType;
                const type =
                    StorageType.data |
                    StorageType.axis |
                    StorageType.bindingPath |
                    StorageType.comment |
                    StorageType.hyperlink |
                    StorageType.sparkline |
                    StorageType.style |
                    StorageType.tag;
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
    },
};

export default genCommandImpl('toone.delete.cell', function (sheet, options) {
    const { position } = options;
    const handler = dispatcher[position];
    handler(sheet);
});
