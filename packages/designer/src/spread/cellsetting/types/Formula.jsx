import { getNamespace } from '@utils/spreadUtil';

const paintCell = function (context, style, value) {
    const { sheet, row, col } = context;
    const formula = sheet.getFormula(row, col);
    if (formula) {
        const GC = getNamespace();
        const posType = GC.Spread.Sheets.CornerPosition;
        style.decoration = {
            cornerFold: {
                size: 8,
                position: posType.rightBottom,
                color: 'blue',
            },
        };
        value = formula;
    }
    return value;
};

export default { paintCell };
