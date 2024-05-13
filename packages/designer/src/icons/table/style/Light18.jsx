import { getBaseUrl } from '@utils/environmentUtil';
import BaseIcon from '../../base/BaseIcon';

/**
 * 浅色18
 * @param {} props 
 * @returns 
 */
export default function (props) {
    return (
        <BaseIcon
            {...props}
            icon={`url(${getBaseUrl()}/css/icons/table/style/light18.svg)`}
        ></BaseIcon>
    );
}
