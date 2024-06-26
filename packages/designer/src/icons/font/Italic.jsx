import { getBaseUrl } from '@utils/environmentUtil';

import BaseIcon from '../base/BaseIcon';

/**
 * 倾斜
 * @param {} props 
 * @returns 
 */
export default function (props) {
    return (
        <BaseIcon
            {...props}
            type='toone-md'
            icon={`url(${getBaseUrl()}/css/icons/font/italic.png)`}
        ></BaseIcon>
    );
}
