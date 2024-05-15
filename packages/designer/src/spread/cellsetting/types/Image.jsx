import { Fragment, useState } from 'react';
import { Item, ItemList, Title, Toolbar } from '../Component';
import { Integer, Select } from '@components/form/Index';

const ImageSparklineModeItems = [
    {
        value: 1,
        title: '保持长宽比',
        text: '保持长宽比',
    },
    {
        value: 2,
        title: '拉伸',
        text: '拉伸',
    },
    {
        value: 3,
        title: '原始尺寸',
        text: '原始尺寸',
    },
    {
        value: 4,
        title: '定制尺寸',
        text: '定制尺寸',
    },
];

const isRectDisabled = function (data) {
    return data.mode !== 4;
};

export default function (props) {
    const { onConfirm, onCancel, plugin } = props;
    const [data, setData] = useState(plugin);
    const rectDisabled = isRectDisabled(data);
    const handleConfirm = () => {
        onConfirm(data);
    };
    return (
        <Fragment>
            <ItemList>
                <Item>
                    <Title>模式</Title>
                </Item>
                <Item>
                    <Select
                        wrapStyle={{ height: 26, width: '100%' }}
                        value={data.mode}
                        datas={ImageSparklineModeItems}
                        onChange={(val) => setData({ ...data, mode: val })}
                    ></Select>
                </Item>
            </ItemList>
            <ItemList>
                <Item>
                    <Title>宽度</Title>
                </Item>
                <Item>
                    <Integer
                        style={{ height: 26, width: '100%' }}
                        value={data.width}
                        disabled={rectDisabled}
                        onChange={(val) => setData({ ...data, width: val })}
                    ></Integer>
                </Item>
            </ItemList>
            <ItemList>
                <Item>
                    <Title>高度</Title>
                </Item>
                <Item>
                    <Integer
                        style={{ height: 26, width: '100%' }}
                        disabled={rectDisabled}
                        value={data.height}
                        onChange={(val) => setData({ ...data, height: val })}
                    ></Integer>
                </Item>
            </ItemList>
            <Toolbar onConfirm={handleConfirm} onCancel={onCancel}></Toolbar>
        </Fragment>
    );
}
