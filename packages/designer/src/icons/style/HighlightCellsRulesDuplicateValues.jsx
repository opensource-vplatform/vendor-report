import { getBaseUrl } from '@utils/environmentUtil';
import BaseIcon from '../base/BaseIcon';

/**
 * 重复值...
 * @param {} props 
 * @returns 
 */
export default function (props) {
    return (
        <BaseIcon
            {...props}
            icon={`url(${getBaseUrl()}/css/icons/style/highlightCellsRulesDuplicateValues.png)`}
        ></BaseIcon>
    );
}    
    