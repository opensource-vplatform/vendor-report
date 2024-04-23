import { applyToSelectedColumn } from '@utils/spreadUtil';

import { genCommandImpl } from '../../util';

export default genCommandImpl(
    'toone.setting.autoColWidth',
    function (sheet, options) {
        applyToSelectedColumn(sheet, (sheet, col) => {
            sheet.autoFitColumn(col);
        });
    }
);
