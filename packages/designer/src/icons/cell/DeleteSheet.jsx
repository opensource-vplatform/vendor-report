import { getBaseUrl } from '@utils/environmentUtil';

import BaseIcon from '../base/BaseIcon';

/**
 * @param {} props 
 * @returns 
 */
export default function (props) {
    return (
        <BaseIcon
            {...props}
            size="large"
            icon={`url(${getBaseUrl()}/css/icons/cell/deleteSheet.png)`}
        ></BaseIcon>
    );
};
