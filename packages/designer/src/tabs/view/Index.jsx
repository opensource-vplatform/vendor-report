import { useContext } from 'react';

import { Group } from '@toone/report-ui';
import {
  getNavConfig,
  getNavViewConfig,
} from '@utils/configUtil';

import DesignerContext from '../../DesignerContext';
import Display from './Display';
import Ratio from './Ratio';
import Window from './Window';

function Index() {
    const context = useContext(DesignerContext);
    //是否隐藏视图导航
    const isHidden = getNavConfig(context,"view")
    if (isHidden) {
        return null;
    }

    //是否显示 display
    const isShowDisplay = !getNavViewConfig(context,"display");

    //是否显示 ratio
    const isSHowRatio = !getNavViewConfig(context,"ratio");

    //是否显示窗口
    const isShowWindow = !getNavViewConfig(context,"window");

    return (
        <Group>
            {isShowDisplay && <Display></Display>}
            {isSHowRatio && <Ratio></Ratio>}
            {isShowWindow && <Window></Window>}
        </Group>
    );
}
export default Index;
