import { useState } from 'react';

import { Popper } from '../../popper/Index';
import { TextInput } from '../Index';
import DateComp from './Date';

export default function (props) {
    const { value, onChange } = props;
    const [data, setData] = useState({ value, open: false });
    const setValue = (val) => {
        if (val !== data) {
            setData({value:val,open:false});
            onChange && onChange(val);
        }else{
            setData({open:false});
        }
    };
    return (
        <Popper
            maskClose={true}
            open={data.open}
            style={{
                height: 'max-content'
            }}
            onVisibleChange={(val) => {
                setData({ ...data, open: val });
            }}
            content={
                <DateComp value={data.value} setValue={setValue}></DateComp>
            }
        >
            <TextInput value={data.value}></TextInput>
        </Popper>
    );
}
