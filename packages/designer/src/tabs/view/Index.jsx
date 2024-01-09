import { useContext } from 'react';

import { Group } from '@components/group/Index';

import DesignerContext from '../../DesignerContext';
import Display from './Display';
import Ratio from './Ratio';

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

    return (
        <Group>
            {isShowDisplay && <Display></Display>}
            {isSHowRatio && <Ratio></Ratio>}
        </Group>
    );
}
export default Index;
