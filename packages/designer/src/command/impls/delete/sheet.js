import { genCommandImpl } from '../../util';

export default genCommandImpl(
    'toone.delete.sheet',
    function (sheet, options) {
        const spread = sheet.getParent();
        spread.removeSheet(spread.getSheetIndex(sheet.name()));
    }
);
