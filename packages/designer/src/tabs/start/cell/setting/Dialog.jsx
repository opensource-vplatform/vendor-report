import { useState } from 'react';

import { OperationDialog } from '@components/dialog/Index';
import { Integer } from '@components/form/Index';

import {
  HLayout,
  Label,
  Wrapper,
} from '../Components';

export default function (props) {
    const { title, value, onClose } = props;
    const [data,setData] = useState(value);
    const handleConfirm = ()=>{
        onClose({
            success:true,
            value:data
        });
    }
    const handleCancel = ()=>{
        onClose({
            success:false
        });
    }
    return <OperationDialog
        title={title}
        width='300px'
        height='160px'
        open={true}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
    >
        <Wrapper>
            <HLayout>
                <Label style={{width: title.length*30}}>
                    {title}：
                </Label>
                <Integer
                    min={1}
                    value={data}
                    onChange={(val) => {
                        setData(val);
                    }}
                ></Integer>
            </HLayout>
        </Wrapper>
    </OperationDialog>;
}
