import {
  useEffect,
  useState,
} from 'react';

import styled from 'styled-components';

import {
  Divider,
  Select,
} from '@toone/report-ui';
import { isFunction } from '@toone/report-util';
import {
  getActiveIndexBySheet,
  getCellTagPlugin,
} from '@utils/worksheetUtil';

import {
  Item,
  ItemList,
  Title,
} from './Component';
import Formula from './types/Formula';
import Group from './types/Group';
import Image from './types/Image';
import List from './types/List';
import Merge from './types/Merge';
import Sum from './types/Sum';
import { hasBindField } from './utils';

const Wrap = styled.div`
    display: flex;
    flex-direction: column;
`;

const PLUGINS = [Formula, List, Group, /*Sum, Image,*/ Merge];

export default function (props) {
    const { sheet, onConfirm, onCancel } = props;
    const [data, setData] = useState(() => {
        let options = [];
        PLUGINS.forEach((plugin) => {
            if (isFunction(plugin.getOptions)) {
                const opts = plugin.getOptions(sheet);
                options = options.concat(opts);
            }
        });
        return {
            plugin: {
                type: List.PLUGIN_TYPE,
            },
            options,
        };
    });
    let children = null;
    const type = data.plugin.type;
    const handleSetting = () => {
        onConfirm([data.plugin]);
    };
    switch (type) {
        case List.PLUGIN_TYPE:
            children = (
                <List.Component
                    plugin={data.plugin}
                    sheet={sheet}
                    onConfirm={handleSetting}
                    onCancel={onCancel}
                ></List.Component>
            );
            break;
        case Group.PLUGIN_TYPE:
            children = (
                <Group.Component
                    plugin={data.plugin}
                    sheet={sheet}
                    onConfirm={handleSetting}
                    onCancel={onCancel}
                ></Group.Component>
            );
            break;
        case Sum.PLUGIN_TYPE:
            children = (
                <Sum.Component
                    plugin={data.plugin}
                    sheet={sheet}
                    onConfirm={handleSetting}
                    onCancel={onCancel}
                ></Sum.Component>
            );
            break;
        case Image.PLUGIN_TYPE:
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
        const newData = {...data };
        const { row, col } = getActiveIndexBySheet(sheet);
        /*const plugins = getCellTagPlugins(sheet, row, col);
        if (plugins && plugins.length > 0) {
            newData.plugin = plugins[0];
        } else {
            if (hasBindField(sheet, row, col)) {
                newData.plugin = {
                    type: List.PLUGIN_TYPE,
                };
            } else {
                newData.plugin = {
                    type: Sum.PLUGIN_TYPE,
                    config: { functionNum: 109 },
                };
            }
        }*/
        let plugin = getCellTagPlugin(sheet,row,col,Group.PLUGIN_TYPE);
        if(!plugin&&hasBindField(sheet,row,col)){
            plugin = {type:List.PLUGIN_TYPE}
        }
        setData({
            ...data,
            plugin,
        });
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
                        datas={data.options}
                        onChange={(val) => {
                            let plugin = null;
                            switch (val) {
                                case List.PLUGIN_TYPE:
                                case Group.PLUGIN_TYPE:
                                    plugin = { type: val };
                                    break;
                                case Sum.PLUGIN_TYPE:
                                    plugin = {
                                        type: val,
                                        config: { functionNum: 109 },
                                    };
                                    break;
                                case Image.PLUGIN_TYPE:
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
