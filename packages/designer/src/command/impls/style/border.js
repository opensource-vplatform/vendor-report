import { toBorders } from '@metadatas/border';

import { genCommandImpl } from '../../util';

function setRangeBorder(params) {
    const { range, value, sheet } = params;
    const { row, col, rowCount, colCount } = range;
    sheet
        .getRange(row, col, rowCount, colCount)
        .setBorder(value.lineborder, value.options);
}

function setBorder(params) {
    const { sheet, value } = params;
    const selections = sheet.getSelections();
    for (let i = 0; i < selections.length; i++) {
        const range = selections[i];
        setRangeBorder({
            range,
            value,
            sheet,
        });
    }
}

function setBorderByType(sheet, type, color, lineType) {
    const values = toBorders(type, color, lineType);
    values.forEach((value) => {
        setBorder({
            value,
            sheet,
        });
    });
}

export default genCommandImpl('toone.style.border', function (sheet, options) {
    const { type, color, lineType } = options;
    setBorderByType(sheet, type, color, lineType);
});
