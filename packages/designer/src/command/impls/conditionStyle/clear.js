import { genCommandImpl } from '../../util';

const clearSheetRules = function (sheet) {
    sheet.conditionalFormats.clearRule();
};


const clearSelectedRules = function (sheet) {
    const selections = sheet.getSelections();
    for (let i = 0; i < selections.length; i++) {
        const { row, col, rowCount, colCount } = selections[i];
        sheet.conditionalFormats.removeRuleByRange(
            row,
            col,
            rowCount,
            colCount
        );
    }
};

export default genCommandImpl(
    'toone.conditionStyle.clear',
    function (sheet, options) {
        const { type } = options;
        if(type == 'selection'){
            clearSelectedRules(sheet);
        }else if(type == 'sheet'){
            clearSheetRules(sheet);
        }
    }
);
