import { getBaseUrl } from '@utils/environmentUtil';
import BaseIcon from '../../../base/BaseIcon';

/**
 * 横向的
 * @param {} props 
 * @returns 
 */
export default function (props) {
    return (
        <BaseIcon
            {...props}
            icon={`url(${getBaseUrl()}/css/icons/layout/page/direction/landscape.svg)`}
        ></BaseIcon>
    );
};
