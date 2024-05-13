import { getBaseUrl } from '@utils/environmentUtil';

import BaseIcon from '../base/BaseIcon';

/**
 * 前景色
 * @param {} props 
 * @returns 
 */
export default function (props) {
    return (
        <BaseIcon
            {...props}
            type='toone'
            icon={`url(${getBaseUrl()}/css/icons/font/foreColor.png)`}
        ></BaseIcon>
    );
};
