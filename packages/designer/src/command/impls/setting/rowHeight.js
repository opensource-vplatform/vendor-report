import { applyToSelectedRow } from '@utils/spreadUtil';

import { genCommandImpl } from '../../util';

export default genCommandImpl(
    'toone.setting.rowHeight',
    function (sheet, options) {
        const {height} = options;
        applyToSelectedRow(sheet, (sheet, row) => {
            sheet.setRowHeight(row, height);
        });
    }
);
