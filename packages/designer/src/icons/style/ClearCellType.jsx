import { getBaseUrl } from '@utils/environmentUtil';
import BaseIcon from '../base/BaseIcon';

/**
 * 清除单元格类型
 * @param {} props 
 * @returns 
 */
export default function (props) {
    return (
        <BaseIcon
            {...props}
            icon={`url(${getBaseUrl()}/css/icons/style/clearCellType.png)`}
        ></BaseIcon>
    );
}    
    