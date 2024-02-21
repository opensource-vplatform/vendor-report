import { useState } from 'react';

import { OperationDialog } from '@components/dialog/Index';
import {
  Group,
  Radio,
  RadioGroup,
} from '@components/form/Index';

import { Wrapper } from '../Components';

export default function (props) {
    const { opened = true, onClose } = props;
    const [data,setData] = useState('left')
    const handleConfirm = ()=>{
        onClose(data);
    }
    const handleCancel = ()=>{
        onClose(null);
    }
    return (
        <OperationDialog
            title='删除'
            width='300px'
            height='270px'
            open={opened}
            onConfirm= {handleConfirm}
            onCancel={handleCancel}
        >
            <Group title='删除单元格' style={{ marginTop: 10 }} titleStyle={{backgroundColor:'transparent'}}>
                <Wrapper>
                    <RadioGroup
                        value={data}
                        onChange={(val) => {
                            setData(val);
                        }}
                    >
                        <Radio label='右侧单元格左移' value='left'></Radio>
                        <Radio label='下方单元格上移' value='up'></Radio>
                        <Radio label='整行' value='row'></Radio>
                        <Radio label='整列' value='col'></Radio>
                    </RadioGroup>
                </Wrapper>
            </Group>
        </OperationDialog>
    );
}
