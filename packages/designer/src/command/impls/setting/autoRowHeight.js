import { applyToSelectedRow } from '@utils/spreadUtil';

import { genCommandImpl } from '../../util';

export default genCommandImpl(
    'toone.setting.autoRowWidth',
    function (sheet, options) {
        applyToSelectedRow(sheet, (sheet, row) => {
            sheet.autoFitRow(row);
        });
    }
);
