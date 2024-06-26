import { getBaseUrl } from '@utils/environmentUtil';

import BaseIcon from '../../../base/BaseIcon';

/**
 * 宽的
 * @param {} props 
 * @returns 
 */
export default function (props) {
    return (
        <BaseIcon
            {...props}
            icon={`url(${getBaseUrl()}/css/icons/layout/page/padding/board.png)`}
        ></BaseIcon>
    );
};
