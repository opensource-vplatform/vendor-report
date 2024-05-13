import { getBaseUrl } from '@utils/environmentUtil';
import BaseIcon from '../../base/BaseIcon';

/**
 * 深色2
 * @param {} props 
 * @returns 
 */
export default function (props) {
    return (
        <BaseIcon
            {...props}
            icon={`url(${getBaseUrl()}/css/icons/table/style/dark2.svg)`}
        ></BaseIcon>
    );
}
