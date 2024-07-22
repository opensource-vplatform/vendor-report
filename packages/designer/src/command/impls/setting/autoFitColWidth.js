import { applyToSelectedCell } from '@utils/spreadUtil';

import { genCommandImpl } from '../../util';

export default genCommandImpl(
    'toone.setting.autoFitColWidth',
    function (sheet, {autoFit}) {
        applyToSelectedCell(sheet,(sheet,row,col)=>{
            const cell = sheet.getCell(row,col);
            if(cell){
                cell.shrinkToFit(autoFit);
            }
        });
    }
);
