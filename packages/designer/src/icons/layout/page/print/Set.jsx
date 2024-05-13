import { getBaseUrl } from '@utils/environmentUtil';
import BaseIcon from '../../../base/BaseIcon';

/**
 * 设置打印区域
 * @param {} props 
 * @returns 
 */
export default function (props) {
    return (
        <BaseIcon
            {...props}
            icon={`url(${getBaseUrl()}/css/icons/layout/page/print/set.svg)`}
        ></BaseIcon>
    );
};
