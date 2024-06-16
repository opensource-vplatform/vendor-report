import { useDispatch } from 'react-redux';

import BackColor from '@icons/font/BackColor';
import {
  hideTab,
  showTab,
} from '@store/navSlice/navSlice';
import ColorEditor, {
  Button,
  Group,
  Integer,
  Tab,
  Tabs,
} from '@toone/report-ui';

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
    <ColorEditor><BackColor></BackColor></ColorEditor>
</Group>
}