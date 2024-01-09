import { useContext } from 'react';

import { Group } from '@components/group/Index';

import DesignerContext from '../../DesignerContext';
import Align from './align/Index';
import Font from './font/Index';

function Index() {
    const context = useContext(DesignerContext);
    //是否隐藏开始导航
    const isHidden = context?.conf?.nav?.start === false;
    if (isHidden) {
        return null;
    }

    //是否显示 font
    const isShowFont = context?.conf?.nav?.start?.font !== false;

    //是否显示 align
    const isSHowAlign = context?.conf?.nav?.start?.align !== false;

    return (
        <Group>
            {isShowFont && <Font></Font>}
            {isSHowAlign && <Align></Align>}
        </Group>
    );
}
export default Index;
