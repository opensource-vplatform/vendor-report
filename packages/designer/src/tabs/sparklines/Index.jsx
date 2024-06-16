import { useContext } from 'react';

import { Group } from '@toone/report-ui';
import {
  getNavConfig,
  getNavSparklinesConfig,
} from '@utils/configUtil';

import DesignerContext from '../../DesignerContext';
import Setting from './setting/Index';

function Index() {
    const context = useContext(DesignerContext);
    //是否隐藏开始导航
    const isHidden =getNavConfig(context,'sparklines');
    if (isHidden) {
        return null;
    }

    const isSetting = !getNavSparklinesConfig(context,'setting');

    return (
        <Group>
            {isSetting && <Setting></Setting>}
        </Group>
    );
}
export default Index;
