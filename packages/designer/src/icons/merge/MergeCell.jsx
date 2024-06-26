import { getBaseUrl } from '@utils/environmentUtil';

import BaseIcon from '../base/BaseIcon';

/**
 * 合并单元格
 * @param {} props 
 * @returns 
 */
export default function (props) {
    return (
        <BaseIcon
            {...props}
            size="large"
            icon={`url(${getBaseUrl()}/css/icons/merge/mergeCell.png)`}
        ></BaseIcon>
    );
}
