import {
  applyToSelectedCell,
  getNamespace,
} from '@utils/spreadUtil';

import { genCommandImpl } from '../../util';

/**
 * 设置格式
 */
export function setFormatter(sheet, formatter) {
    const GC = getNamespace();
    applyToSelectedCell(sheet, (sheet, row, col) => {
        let style = sheet.getStyle(row, col);
        style = style ? style : new GC.Spread.Sheets.Style();
        style.formatter = formatter;
        sheet.setStyle(row, col, style);
    });
}

export default genCommandImpl(
    'toone.format.foramtter',
    function (sheet, options) {
        const { formatter } = options;
        setFormatter(sheet, formatter);
    }
);
