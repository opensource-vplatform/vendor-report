import Button from '@components/button/Index';
import Integer from '@components/integer/Index';
import Tab from '@components/tabs/Tab';
import Tabs from '@components/tabs/Tabs';

export default function(){
    return <div
    style={{
        width: 500,
        height: 50,
        display: 'flex',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        padding: '4px 2px'
    }}
>
    <Button title='提示信息' onClick={()=>alert('clicked')}>提交</Button>
    <Integer style={{width:220,height:24}} max={255} min={0} onChange={val=>alert(val)}></Integer>
    <Tabs>
        <Tab code="tab1" title="页签1">页签1</Tab>
        <Tab code="tab2" title="页签2">页签2</Tab>
    </Tabs>
</div>
}