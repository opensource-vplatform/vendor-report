import {
  applyToSelectedRow,
  getNamespace,
} from '@utils/spreadUtil';

import { genCommandImpl } from '../../util';

export default genCommandImpl(
    'toone.visible.showRow',
    function (sheet, options) {
        const GC = getNamespace();
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
    }
);
