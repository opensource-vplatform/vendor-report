import { getBaseUrl } from '@utils/environmentUtil';
import BaseIcon from '../base/BaseIcon';

/**
 * 管理规则...
 * @param {} props 
 * @returns 
 */
export default function (props) {
    return (
        <BaseIcon
            {...props}
            icon={`url(${getBaseUrl()}/css/icons/style/conditionFormatManageRule.png)`}
        ></BaseIcon>
    );
}    
    