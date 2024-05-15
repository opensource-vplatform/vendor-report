import { useState } from 'react';

import styled from 'styled-components';

import { Divider } from '@components/divider/Index';
import {
  Button,
  Select,
} from '@components/form/Index';

import {
  Item,
  ItemList,
  Title,
} from './Component';
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
    try {
        const plugins = JSON.parse(value);
        if (plugins && plugins.length > 0) {
            plugin = plugins[0];
        }
    } catch (e) {
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
    const type = plugin.type;
    const handleSetting = () => {
        onConfirm([data.plugin]);
    };
    switch (type) {
        case 'cellListType':
            children = (
                <List plugin={data.plugin} onConfirm={handleChange} onCancel={onCancel}></List>
            );
            break;
        case 'cellGroupType':
            children = (
                <Group plugin={data.plugin} onChange={handleChange}></Group>
            );
            break;
        case 'cellSubTotal':
            children = <Sum plugin={data.plugin} onChange={handleChange}></Sum>;
            break;
        case 'imageCellType':
            children = (
                <Image plugin={data.plugin} onChange={handleChange}></Image>
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
                                    plugin = { type: val };
                                    break;
                                case 'imageCellType':
                                    plugin = { type: val };
                                    break;
                            }
                            setData({...data,plugin});
                        }}
                    ></Select>
                </Item>
            </ItemList>
            <Divider type='horizontal'></Divider>
            {children}
            <ItemList>
                <Item></Item>
                <Button
                    style={{ ...btnStyle, marginRight: 8 }}
                    onClick={handleSetting}
                >
                    确定
                </Button>
                <Button style={btnStyle} onClick={onCancel}>
                    取消
                </Button>
            </ItemList>
        </Wrap>
    );
}
