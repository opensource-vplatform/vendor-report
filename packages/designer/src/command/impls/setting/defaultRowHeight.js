import { genCommandImpl } from '../../util';

export default genCommandImpl(
    'toone.setting.defaultRowWidth',
    function (sheet, options) {
        const {height} = options;
        sheet.defaults.rowHeight = height;
    }
);
