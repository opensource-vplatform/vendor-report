import { getBaseUrl } from '@utils/environmentUtil';

import BaseIcon from '../base/BaseIcon';

/**
 * 无边框
 * @param {} props
 * @returns
 */
export default function (props) {
    return (
        <BaseIcon
            size="large"
            icon={`url(${getBaseUrl()}/css/icons/border/borderNone.png)`}
            {...props}
        ></BaseIcon>
    );
}
