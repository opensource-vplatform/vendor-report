import { getBaseUrl } from '@utils/environmentUtil';

import BaseIcon from '../base/BaseIcon';

/**
 * 文本
 * @param {} props 
 * @returns 
 */
export default function (props) {
    return (
        <BaseIcon
            {...props}
            type="toone"
            icon={`url(${getBaseUrl()}/css/icons/number/textFormat.png)`}
        ></BaseIcon>
    );
}    
    