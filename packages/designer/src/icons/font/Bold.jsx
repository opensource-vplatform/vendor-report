import { getBaseUrl } from '@utils/environmentUtil';

import BaseIcon from '../base/BaseIcon';

/**
 * 粗体
 * @param {} props 
 * @returns 
 */
export default function (props) {
    return (
        <BaseIcon
            {...props}
            type='toone-md'
            icon={`url(${getBaseUrl()}/css/icons/font/bold.png)`}
        ></BaseIcon>
    );
};
