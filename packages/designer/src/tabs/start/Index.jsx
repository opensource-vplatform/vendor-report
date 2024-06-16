import { useContext } from 'react';

import { Group } from '@toone/report-ui';
import {
  getNavConfig,
  getNavStartConfig,
} from '@utils/configUtil';

import DesignerContext from '../../DesignerContext';
import Align from './align/Index';
import Cell from './cell/Index';
import Font from './font/Index';
import Number from './number/Index';
import Style from './style/Index';

function Index() {
    const context = useContext(DesignerContext);
    //是否隐藏开始导航
    const isHidden = getNavConfig(context,'start');
    if (isHidden) {
        return null;
    }

    //是否显示 font
    const isShowFont = !getNavStartConfig(context,'font');

    //是否显示 align
    const isSHowAlign = !getNavStartConfig(context,'align');

    const isShowCell = !getNavStartConfig(context,'isShowCell');

    const isShowNumber = !getNavStartConfig(context,'isShowNumber');

    const isShowStyle = !getNavStartConfig(context,'isShowStyle');

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
