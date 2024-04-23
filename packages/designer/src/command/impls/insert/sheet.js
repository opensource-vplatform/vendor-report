import { genCommandImpl } from '../../util';

export default genCommandImpl(
    'toone.insert.sheet',
    function (sheet, options) {
        const spread = sheet.getParent();
        spread.addSheet(spread.getSheetIndex(sheet.name()));
    }
);
