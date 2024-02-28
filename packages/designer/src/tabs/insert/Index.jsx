import { useContext } from 'react';

import { Group } from '@components/group/Index';

import DesignerContext from '../../DesignerContext';
import Illustration from './illustration/Index';

export default function(){
    const context = useContext(DesignerContext);
    //是否显示插图
    const isShowIllustration = context?.conf?.nav?.start?.illustration !== false;

    return (
        <Group>
            {isShowIllustration && <Illustration></Illustration>}
        </Group>
    );
}