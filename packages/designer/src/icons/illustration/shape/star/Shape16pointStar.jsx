import { getBaseUrl } from '@utils/environmentUtil';
import BaseIcon from '../../../base/BaseIcon';

/**
 * @param {} props 
 * @returns 
 */
export default function (props) {
    return (
        <BaseIcon
            {...props}
            icon={`url(${getBaseUrl()}/css/icons/illustration/shape/star/shape16pointStar.svg)`}
        ></BaseIcon>
    );
};    
    