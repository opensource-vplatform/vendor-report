import { getBaseUrl } from '@utils/environmentUtil';

import BaseIcon from '../base/BaseIcon';

/**
 * 下边框
 * @param {} props 
 * @returns 
 */
export default function (props) {
    return (
        <BaseIcon
            {...props}
            size="large"
            icon={`url(${getBaseUrl()}/css/icons/border/borderBottom.png)`}
        ></BaseIcon>
    );
}
