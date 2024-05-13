import { getBaseUrl } from '@utils/environmentUtil';
import BaseIcon from '../../base/BaseIcon';

/**
 * 中等深浅色10
 * @param {} props 
 * @returns 
 */
export default function (props) {
    return (
        <BaseIcon
            {...props}
            icon={`url(${getBaseUrl()}/css/icons/table/style/medium10.svg)`}
        ></BaseIcon>
    );
}
