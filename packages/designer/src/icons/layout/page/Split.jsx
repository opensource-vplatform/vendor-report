import { getBaseUrl } from '@utils/environmentUtil';

import BaseIcon from '../../base/BaseIcon';

/**
 * 分隔符
 * @param {} props 
 * @returns 
 */
export default function (props) {
    return (
        <BaseIcon
            {...props}
            icon={`url(${getBaseUrl()}/css/icons/layout/page/split.png)`}
        ></BaseIcon>
    );
};
