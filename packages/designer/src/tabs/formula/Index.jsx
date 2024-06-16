import { useContext } from 'react';

import { Group } from '@toone/report-ui';
import {
  getNavConfig,
  getNavFormulaConfig,
} from '@utils/configUtil';

import DesignerContext from '../../DesignerContext';
import Calculation from './Calculation';
import Editor from './Editor';
import Library from './Library';

function Index() {
    const context = useContext(DesignerContext);
    //是否隐藏公式导航
    const isHidden =getNavConfig(context,'formula');
    if (isHidden) {
        return null;
    }

    //是否显示函数库
    const isSHowLibary = !getNavFormulaConfig(context,'library');
    //是否显示计算
    const isSHowCalculation = !getNavFormulaConfig(context,'calculation');

    const isShowEditor = !getNavFormulaConfig(context,'editor');
    return (
        <Group>
            {isSHowLibary && <Library></Library>}
            {isShowEditor && <Editor></Editor>}
            {isSHowCalculation && <Calculation></Calculation>}
        </Group>
    );
}
export default Index;
