import {
  applyToSelectedCell,
  getNamespace,
} from '@utils/spreadUtil';

import { genCommandImpl } from '../../util';

export default genCommandImpl('toone.common.delete', function (sheet, options) {
    debugger;
    const selections = sheet.getSelections();
    if (selections && selections.length > 0) {
        const GC = getNamespace();
        selections.forEach((selection) => {
            const { row, col, rowCount, colCount } = selection;
            sheet.clear(
                row,
                col,
                rowCount,
                colCount,
                GC.Spread.Sheets.SheetArea.viewport,
                GC.Spread.Sheets.StorageType.data
            );
        });
        applyToSelectedCell(sheet,(sheet,row,col)=>{
            sheet.setTag(row,col,undefined);
            sheet.setBindingPath(row,col,undefined);
        });
    }
});
