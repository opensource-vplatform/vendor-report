import { Select } from '@components/form/Index';

import { Item, ItemList, Title, Toolbar } from '../Component';
import { Fragment, useState } from 'react';

const Sum_Types = [
    {
        value: 101,
        text: '平均值',
    },
    {
        value: 103,
        text: '计数',
    },
    {
        value: 102,
        text: '数值计数',
    },
    {
        value: 104,
        text: '最大值',
    },
    {
        value: 105,
        text: '最小值',
    },
    {
        value: 109,
        text: '求和',
    },
];

export default function (props) {
    const { onConfirm, onCancel, plugin } = props;
    const [data, setData] = useState(plugin);
    const handleConfirm = () => {
        onConfirm(data);
    };
    return (
        <Fragment>
            <ItemList>
                <Item>
                    <Title>汇总方式</Title>
                </Item>
                <Item>
                    <Select
                        wrapStyle={{ height: 26, width: '100%' }}
                        datas={Sum_Types}
                        value={data.functionNum}
                        onChange={(val) =>
                            setData({ ...data, functionNum: val })
                        }
                    ></Select>
                </Item>
            </ItemList>
            <Toolbar onCancel={onCancel} onConfirm={handleConfirm}></Toolbar>
        </Fragment>
    );
}