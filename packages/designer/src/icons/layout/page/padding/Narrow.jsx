import { getBaseUrl } from '@utils/environmentUtil';
import BaseIcon from '../../../base/BaseIcon';

/**
 * 窄的
 * @param {} props 
 * @returns 
 */
export default function (props) {
    return (
        <BaseIcon
            {...props}
            icon={`url(${getBaseUrl()}/css/icons/layout/page/padding/narrow.png)`}
        ></BaseIcon>
    );
};
