import BaseIcon from '../base/BaseIcon';
import { getBaseUrl } from '@utils/environmentUtil';

/**
 * 水平居左
 * @param {} props 
 * @returns 
 */
export default function (props) {
    return (
        <BaseIcon
            {...props}
            type='toone'
            icon={`url(${getBaseUrl()}/css/icons/align/alignLeft.png)`}
        ></BaseIcon>
    );
};