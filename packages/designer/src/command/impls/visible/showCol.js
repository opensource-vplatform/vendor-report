import {
  applyToSelectedColumn,
  getNamespace,
} from '@utils/spreadUtil';

import { genCommandImpl } from '../../util';

export default genCommandImpl(
    'toone.visible.showCol',
    function (sheet, options) {
        const GC = getNamespace();
        const selections = sheet.getSelections();
        if (1 === selections.length && 1 === selections[0].colCount) {
            const selection = selections[0];
            let index = 0;
            for (let  i = 0; i <= selection.col; i++){
                if (sheet.getColumnVisible(i)) {
                    index = i;
                    break
                }
            }
            if(!(selection.col !== index && 0 === index)){
                sheet.setColumnVisible(index - 1, true);
                sheet.showColumn(index - 1, GC.Spread.Sheets.HorizontalPosition.nearest);
            }
        } else{
            applyToSelectedColumn(sheet, (sheet, col) => {
                sheet.setColumnVisible(col, true);
            });
        }
    }
);
