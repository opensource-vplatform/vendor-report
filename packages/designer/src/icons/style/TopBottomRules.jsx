import { getBaseUrl } from '@utils/environmentUtil';
import BaseIcon from '../base/BaseIcon';

/**
 * 项目选取规则
 * @param {} props 
 * @returns 
 */
export default function (props) {
    return (
        <BaseIcon
            {...props}
            icon={`url(${getBaseUrl()}/css/icons/style/topBottomRules.png)`}
        ></BaseIcon>
    );
}    
    