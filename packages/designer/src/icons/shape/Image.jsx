import { getBaseUrl } from '@utils/environmentUtil';

import BaseIcon from '../base/BaseIcon';

const getBase64Data = function(){
    return getBaseUrl() + `/css/icons/shape/image.png`;
}

/**
 * 图片
 * @param {} props
 * @returns
 */
export default function (props) {
    return (
        <BaseIcon
            {...props}
            size="large"
            icon={`url(${getBase64Data()})`}
        ></BaseIcon>
    );
}

export { getBase64Data };
