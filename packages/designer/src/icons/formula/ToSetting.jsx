import { getBaseUrl } from '@utils/environmentUtil';

import BaseIcon from '../base/BaseIcon';

/**
 * 填充颜色
 * @param {} props 
 * @returns 
 */
export default function (props) {
    return (
        <BaseIcon
            {...props}
            size="middle"
            icon={`url(${getBaseUrl()}/css/icons/formula/toSetting.png)`}
        ></BaseIcon>
    );
};
