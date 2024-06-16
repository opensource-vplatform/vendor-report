import { useState } from 'react';

import {
  Legend,
  OperationDialog,
  Radio,
  RadioGroup,
} from '@toone/report-ui';

import { Wrapper } from '../Components';

export default function (props) {
    const { opened = true, onClose } = props;
    const [data,setData] = useState('right')
    const handleConfirm = ()=>{
        onClose(data);
    }
    const handleCancel = ()=>{
        onClose(null);
    }
    return (
        <OperationDialog
            title='插入'
            width='300px'
            height='270px'
            open={opened}
            onConfirm= {handleConfirm}
            onCancel={handleCancel}
        >
            <Legend title='插入单元格' style={{ marginTop: 10 }} titleStyle={{backgroundColor:'transparent'}}>
                <Wrapper>
                    <RadioGroup
                        value={data}
                        onChange={(val) => {
                            setData(val);
                        }}
                    >
                        <Radio label='活动单元格右移' value='right'></Radio>
                        <Radio label='活动单元格下移' value='down'></Radio>
                        <Radio label='整行' value='row'></Radio>
                        <Radio label='整列' value='col'></Radio>
                    </RadioGroup>
                </Wrapper>
            </Legend>
        </OperationDialog>
    );
}
