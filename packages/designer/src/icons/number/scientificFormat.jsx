import { getBaseUrl } from '@utils/environmentUtil';

import BaseIcon from '../base/BaseIcon';

/**
 * 科学记数
 * @param {} props 
 * @returns 
 */
export default function (props) {
    return (
        <BaseIcon
            {...props}
            type="toone"
            icon={`url(${getBaseUrl()}/css/icons/number/scientificFormat.png)`}
        ></BaseIcon>
    );
}    
    