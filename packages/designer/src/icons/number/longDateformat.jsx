import { getBaseUrl } from '@utils/environmentUtil';

import BaseIcon from '../base/BaseIcon';

/**
 * 长日期
 * @param {} props 
 * @returns 
 */
export default function (props) {
    return (
        <BaseIcon
            {...props}
            type="toone"
            icon={`url(${getBaseUrl()}/css/icons/number/longDateformat.png)`}
        ></BaseIcon>
    );
}    
    