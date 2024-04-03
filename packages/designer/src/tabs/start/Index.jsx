import { useContext } from 'react';

import { Group } from '@components/group/Index';

import DesignerContext from '../../DesignerContext';
import Align from './align/Index';
import Cell from './cell/Index';
import Font from './font/Index';
import Number from './number/Index';
import Style from './style/Index';

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

    const isShowCell = context?.conf?.nav?.start?.isShowCell !== false;

    const isShowNumber = context?.conf?.nav?.start?.isShowNumber !== false;

    const isShowStyle = context?.conf?.nav?.start?.isShowStyle !== false;

    return (
        <Group>
            {isShowFont && <Font></Font>}
            {isSHowAlign && <Align></Align>}
            {isShowNumber && <Number></Number>}
            {isShowStyle && <Style></Style>}
            {isShowCell && <Cell></Cell>}
        </Group>
    );
}
export default Index;
