import { getBaseUrl } from '@utils/environmentUtil';

import BaseIcon from '../base/BaseIcon';

/**
 * 下划线
 * @param {} props 
 * @returns 
 */
export default function (props) {
    return (
        <BaseIcon
            {...props}
            type='toone-md'
            icon={`url(${getBaseUrl()}/css/icons/font/underline.png)`}
        ></BaseIcon>
    );
}
