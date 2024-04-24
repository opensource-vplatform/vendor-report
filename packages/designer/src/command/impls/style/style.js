import { setStyle } from '@utils/styleUtil';

import { genCommandImpl } from '../../util';

export default genCommandImpl(
    'toone.style.style',
    function (sheet, options) {
        setStyle(sheet,options);
    }
);
