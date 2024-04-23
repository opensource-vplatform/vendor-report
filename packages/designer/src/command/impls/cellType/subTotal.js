import { applyToSelectedCell } from '@utils/spreadUtil';
import { setCellTagPlugin } from '@utils/worksheetUtil';

import { genCommandImpl } from '../../util';

export default genCommandImpl(
    'toone.cellType.subTotal',
    function (sheet, options) {
        const { text, config } = options;
        applyToSelectedCell(sheet, (sheet, row, col) => {
            setCellTagPlugin(sheet, row, col, {
                type: 'cellSubTotal',
                config,
            });
            sheet.setText(row, col, text);
        });
    }
);
