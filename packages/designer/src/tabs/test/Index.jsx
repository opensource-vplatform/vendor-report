import { useDispatch } from 'react-redux';

import Button from '@components/button/Index';
import Color from '@components/color/Index';
import { Group } from '@components/group/Index';
import Integer from '@components/integer/Index';
import Tab from '@components/tabs/Tab';
import Tabs from '@components/tabs/Tabs';
import BackColor from '@icons/font/BackColor';
import {
  hideTab,
  showTab,
} from '@store/navSlice/navSlice';

export default function(){
    const dispatch = useDispatch();
    return <Group
    style={{
        width: 500,
        height: 50,
        display: 'flex',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        padding: '4px 2px'
    }}
>
    <Button title='隐藏视图' onClick={()=>dispatch(hideTab({code:'view'}))}>隐藏视图</Button>
    <Button title='显示视图' onClick={()=>dispatch(showTab({code:'view'}))}>显示视图</Button>
    <Integer style={{width:220,height:24}} max={255} min={0} onChange={val=>alert(val)}></Integer>
    <Tabs>
        <Tab code="tab1" title="页签1">页签1</Tab>
        <Tab code="tab2" title="页签2">页签2</Tab>
    </Tabs>
    <Color><BackColor></BackColor></Color>
</Group>
}