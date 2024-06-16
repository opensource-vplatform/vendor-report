import { useContext } from 'react';

import { Group } from '@toone/report-ui';
import { getNavStartConfig } from '@utils/configUtil';

import DesignerContext from '../../DesignerContext';
import Illustration from './illustration/Index';

export default function(){
    const context = useContext(DesignerContext);
    //是否显示插图
    const isShowIllustration = !getNavStartConfig(context,'illustration');

    return (
        <Group>
            {isShowIllustration && <Illustration></Illustration>}
        </Group>
    );
}