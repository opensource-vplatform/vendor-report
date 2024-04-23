import { applyToSelectedRow } from '@utils/spreadUtil';

import { genCommandImpl } from '../../util';

export default genCommandImpl(
    'toone.visible.hideRow',
    function (sheet, options) {
        applyToSelectedRow(sheet, (sheet, row) => {
            sheet.setRowVisible(row, false);
        });
    }
);
