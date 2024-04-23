import { genCommandImpl } from '../../util';

export default genCommandImpl(
    'toone.conditionStyle.apply',
    function (sheet, options) {
        const { rule } = options;
        const selections = sheet.getSelections();
        rule.bind(sheet);
        rule.applySelections(selections);
    }
);
