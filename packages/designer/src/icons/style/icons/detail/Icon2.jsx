import { getBaseUrl } from '@utils/environmentUtil';

import BaseIcon from '../../../base/BaseIcon';

/**
 * 
 * @param {} props 
 * @returns 
 */
export default function (props) {
    return (
        <BaseIcon
            {...props}
            icon={`url(${getBaseUrl()}/css/icons/style/icons/detail/icon2.svg)`}
        ></BaseIcon>
    );
}    
    