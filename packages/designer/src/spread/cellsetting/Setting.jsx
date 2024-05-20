import {
  useEffect,
  useState,
} from 'react';

import styled from 'styled-components';

import { Divider } from '@components/divider/Index';
import { Select } from '@components/form/Index';
import {
  getActiveIndexBySheet,
  getCellTagPlugins,
} from '@utils/worksheetUtil';

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
    /*{
        value: 'cellSubTotal',
        text: '汇总',
    },
    {
        value: 'imageCellType',
        text: '图片',
    },*/
];

const btnStyle = {
    height: 26,
};

export default function (props) {
    const { sheet, onConfirm, onCancel } = props;
    const [data, setData] = useState(() => {
        return {
            plugin: {
                type: 'cellListType',
            },
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
                <List.Component
                    plugin={data.plugin}
                    sheet={sheet}
                    onConfirm={handleSetting}
                    onCancel={onCancel}
                ></List.Component>
            );
            break;
        case 'cellGroupType':
            children = (
                <Group.Component
                    plugin={data.plugin}
                    sheet={sheet}
                    onConfirm={handleSetting}
                    onCancel={onCancel}
                ></Group.Component>
            );
            break;
        case 'cellSubTotal':
            children = (
                <Sum.Component
                    plugin={data.plugin}
                    sheet={sheet}
                    onConfirm={handleSetting}
                    onCancel={onCancel}
                ></Sum.Component>
            );
            break;
        case 'imageCellType':
            children = (
                <Image.Component
                    plugin={data.plugin}
                    sheet={sheet}
                    onConfirm={handleSetting}
                    onCancel={onCancel}
                ></Image.Component>
            );
    }
    useEffect(() => {
        const { row, col } = getActiveIndexBySheet(sheet);
        const plugins = getCellTagPlugins(sheet, row, col);
        if (plugins && plugins.length > 0) {
            setData({
                ...data,
                plugin: plugins[0],
            });
        } else {
            setData({
                ...data,
                plugin: {
                    type: 'cellListType',
                },
            });
        }
    }, []);
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
                                    plugin = {
                                        type: val,
                                        config: { functionNum: 109 },
                                    };
                                    break;
                                case 'imageCellType':
                                    plugin = { type: val, config: { mode: 1 } };
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
