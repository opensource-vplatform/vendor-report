import { getBaseUrl } from '@utils/environmentUtil';

import BaseIcon from '../base/BaseIcon';

/**
 * 时间
 * @param {} props 
 * @returns 
 */
export default function (props) {
    return (
        <BaseIcon
            {...props}
            type="toone"
            icon={`url(${getBaseUrl()}/css/icons/number/timeFormat.png)`}
        ></BaseIcon>
    );
}    
    