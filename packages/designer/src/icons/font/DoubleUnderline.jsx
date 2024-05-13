import { getBaseUrl } from '@utils/environmentUtil';

import BaseIcon from '../base/BaseIcon';

/**
 * 双下划线
 * @param {} props 
 * @returns 
 */
export default function (props) {
    return (
        <BaseIcon
            {...props}
            type='toone-md'
            icon={`url(${getBaseUrl()}/css/icons/font/doubleUnderline.png)`}
        ></BaseIcon>
    );
}
