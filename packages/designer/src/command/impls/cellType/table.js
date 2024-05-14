import { genCommandImpl } from '../../util';

export default genCommandImpl(
    'toone.cellType.bindingPath',
    function (sheet, options) {
        if (typeof options?.handler === 'function') {
            options.handler();
        }
    }
);
