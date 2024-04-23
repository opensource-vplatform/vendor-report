import { applyToSelectedColumn } from '@utils/spreadUtil';

import { genCommandImpl } from '../../util';

export default genCommandImpl(
    'toone.visible.hideCol',
    function (sheet, options) {
        applyToSelectedColumn(sheet, (sheet, col) => {
            sheet.setColumnVisible(col, false);
        });
    }
);
