import { genCommandImpl } from '../../util';

export default genCommandImpl(
    'toone.setting.defaultColWidth',
    function (sheet, options) {
        const {width} = options;
        sheet.defaults.colWidth = width;
    }
);
