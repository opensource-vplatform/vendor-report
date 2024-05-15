import { useState } from 'react';

import styled from 'styled-components';

import { Divider } from '@components/divider/Index';
import { Button, Select } from '@components/form/Index';

import { Item, ItemList, Title } from './Component';
import Group from './types/Group';
import Image from './types/Image';
import List from './types/List';
import Sum from './types/Sum';

const Wrap = styled.div`
    display: flex;
    flex-direction: column;
`;

const CellTypes = [
    {
        value: 'cellListType',
        text: '列表',
    },
    {
        value: 'cellGroupType',
        text: '分组',
    },
    {
        value: 'cellSubTotal',
        text: '汇总',
    },
    {
        value: 'imageCellType',
        text: '图片',
    },
];

const btnStyle = {
    height: 26,
};

export default function (props) {
    const { value, onConfirm, onCancel } = props;
    let plugin = null;
    if (value && value.length > 0) {
        plugin = value[0];
    } else {
        plugin = {
            type: 'cellListType',
        };
    }
    const [data, setData] = useState(() => {
        return {
            plugin: plugin,
        };
    });
    let children = null;
    const type = data.plugin.type;
    const handleSetting = () => {
        onConfirm([data.plugin]);
    };
    switch (type) {
        case 'cellListType':
            children = (
                <List
                    plugin={data.plugin}
                    onConfirm={handleSetting}
                    onCancel={onCancel}
                ></List>
            );
            break;
        case 'cellGroupType':
            children = (
                <Group
                    plugin={data.plugin}
                    onConfirm={handleSetting}
                    onCancel={onCancel}
                ></Group>
            );
            break;
        case 'cellSubTotal':
            children = (
                <Sum
                    plugin={data.plugin}
                    onConfirm={handleSetting}
                    onCancel={onCancel}
                ></Sum>
            );
            break;
        case 'imageCellType':
            children = (
                <Image
                    plugin={data.plugin}
                    onConfirm={handleSetting}
                    onCancel={onCancel}
                ></Image>
            );
    }

    return (
        <Wrap>
            <ItemList>
                <Item>
                    <Title>单元格类型</Title>
                </Item>
                <Item>
                    <Select
                        wrapStyle={{ height: 26, width: '100%' }}
                        value={type}
                        datas={CellTypes}
                        onChange={(val) => {
                            let plugin = null;
                            switch (val) {
                                case 'cellListType':
                                case 'cellGroupType':
                                    plugin = { type: val };
                                    break;
                                case 'cellSubTotal':
                                    plugin = { type: val, functionNum: 109 };
                                    break;
                                case 'imageCellType':
                                    plugin = { type: val, mode: 1 };
                                    break;
                            }
                            setData({ ...data, plugin });
                        }}
                    ></Select>
                </Item>
            </ItemList>
            <Divider type='horizontal'></Divider>
            {children}
        </Wrap>
    );
}
