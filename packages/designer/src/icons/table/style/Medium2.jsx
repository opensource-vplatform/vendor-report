import { getBaseUrl } from '@utils/environmentUtil';
import BaseIcon from '../../base/BaseIcon';

/**
 * 中等深浅色2
 * @param {} props 
 * @returns 
 */
export default function (props) {
    return (
        <BaseIcon
            {...props}
            icon={`url(${getBaseUrl()}/css/icons/table/style/medium2.svg)`}
        ></BaseIcon>
    );
}
