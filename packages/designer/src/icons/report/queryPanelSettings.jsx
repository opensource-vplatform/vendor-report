import { getBaseUrl } from '@utils/environmentUtil';

import BaseIcon from '../base/BaseIcon';

/**
 * 分页设置
 * @param {} props
 * @returns
 */
export default function (props) {
  return (
    <BaseIcon
      {...props}
      icon={`url(${getBaseUrl()}/css/icons/report/queryPanelSettings.png)`}
    ></BaseIcon>
  );
}
