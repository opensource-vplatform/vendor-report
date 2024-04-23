import { genCommandImpl } from '../../util';

export default genCommandImpl(
    'toone.conditionStyle.reset',
    function (sheet, options) {
        const { configs } = options;
        sheet.conditionalFormats.clearRule();
        configs.forEach(({ rule, selections }) => {
            rule.bind(sheet);
            rule.applySelections(selections);
        });
    }
);
