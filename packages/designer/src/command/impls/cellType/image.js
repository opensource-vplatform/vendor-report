import { applyImageSetting } from '@utils/sparklineUtil';

import { genCommandImpl } from '../../util';

export default genCommandImpl(
    'toone.cellType.image',
    function (sheet, options) {
        applyImageSetting(sheet, options);
    }
);
