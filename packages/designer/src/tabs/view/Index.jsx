import { useContext } from 'react';

import { Group } from '@components/group/Index';

import DesignerContext from '../../DesignerContext';
import Display from './Display';
import Ratio from './Ratio';
import Window from './Window';

function Index() {
    const context = useContext(DesignerContext);
    //是否隐藏视图导航
    const isHidden = context?.conf?.nav?.view === false;
    if (isHidden) {
        return null;
    }

    //是否显示 display
    const isShowDisplay = context?.conf?.nav?.view?.display !== false;

    //是否显示 ratio
    const isSHowRatio = context?.conf?.nav?.view?.ratio !== false;

    //是否显示窗口
    const isShowWindow = context?.conf?.nav?.view?.window !== false;

    return (
        <Group>
            {isShowDisplay && <Display></Display>}
            {isSHowRatio && <Ratio></Ratio>}
            {isShowWindow && <Window></Window>}
        </Group>
    );
}
export default Index;
