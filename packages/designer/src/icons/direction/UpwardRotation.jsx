import { getBaseUrl } from '@utils/environmentUtil';

import BaseIcon from '../base/BaseIcon';

/**
 * 向上旋转文字
 * @param {} props 
 * @returns 
 */
export default function (props) {
    return (
        <BaseIcon
            {...props}
            type='toone'
            icon={`url(${getBaseUrl()}/css/icons/direction/upwardRotation.png)`}
        ></BaseIcon>
    );
}
