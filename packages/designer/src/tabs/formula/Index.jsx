import { useContext } from 'react';

import { Group } from '@components/group/Index';

import DesignerContext from '../../DesignerContext';
import Calculation from './Calculation';
import Library from './Library';

function Index() {
    const context = useContext(DesignerContext);
    //是否隐藏公式导航
    const isHidden = context?.conf?.nav?.formula === false;
    if (isHidden) {
        return null;
    }

    //是否显示函数库
    const isSHowLibary = context?.conf?.nav?.formula?.library !== false;
    //是否显示计算
    const isSHowCalculation =
        context?.conf?.nav?.formula?.calculation !== false;

    return (
        <Group>
            {isSHowLibary && <Library></Library>}
            {isSHowCalculation && <Calculation></Calculation>}
        </Group>
    );
}
export default Index;
