import { getBaseUrl } from '@utils/environmentUtil';

import BaseIcon from '../../../base/BaseIcon';

/**
 * 自定义
 * @param {} props
 * @returns
 */
export default function (props) {
    return (
        <BaseIcon
            {...props}
            /* icon={`url(${getBaseUrl()}/css/icons/layout/page/padding/custom.png)`} */
            icon={`url(${getBaseUrl()}/css/icons/layout/page/padding/normal.svg)`}
        ></BaseIcon>
    );
}
