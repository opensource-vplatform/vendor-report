import { getBaseUrl } from '@utils/environmentUtil';

import BaseIcon from '../base/BaseIcon';

/**
 * 数字
 * @param {} props 
 * @returns 
 */
export default function (props) {
    return (
        <BaseIcon
            {...props}
            type="toone"
            icon={`url(${getBaseUrl()}/css/icons/number/numberFormat.png)`}
        ></BaseIcon>
    );
}    
    