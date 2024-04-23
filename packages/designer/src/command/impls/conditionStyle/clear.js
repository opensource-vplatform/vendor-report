import {
  clearSelectedRules,
  clearSheetRules,
} from '@utils/formatterUtil';

import { genCommandImpl } from '../../util';

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
