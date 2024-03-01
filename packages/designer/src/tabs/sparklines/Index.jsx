import { useContext } from 'react';

import { Group } from '@components/group/Index';

import DesignerContext from '../../DesignerContext';
import Setting from './setting/Index';

function Index() {
    const context = useContext(DesignerContext);
    //是否隐藏开始导航
    const isHidden = context?.conf?.nav?.sparklines === false;
    if (isHidden) {
        return null;
    }

    const isSetting = context?.conf?.nav?.sparklines?.setting !== false;

    return (
        <Group>
            {isSetting && <Setting></Setting>}
        </Group>
    );
}
export default Index;
