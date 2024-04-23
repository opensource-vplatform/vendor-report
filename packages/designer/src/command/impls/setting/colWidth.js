import { applyToSelectedColumn } from '@utils/spreadUtil';

import { genCommandImpl } from '../../util';

export default genCommandImpl(
    'toone.setting.colWidth',
    function (sheet, options) {
        const {width} = options;
        applyToSelectedColumn(sheet, (sheet, col) => {
            sheet.setColumnWidth(col, width);
        });
    }
);
