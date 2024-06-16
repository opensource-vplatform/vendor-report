import {
  Fragment,
  useState,
} from 'react';

import {
  Integer,
  Select,
} from '@toone/report-ui';
import { isUndefined } from '@toone/report-util';
import {
  applyToSelectedCell,
  withBatchUpdate,
} from '@utils/spreadUtil';
import {
  getActiveIndexBySheet,
  hasCellTagPluginByIndex,
  setCellTagPlugin,
} from '@utils/worksheetUtil';

import {
  Item,
  ItemList,
  Title,
  Toolbar,
} from '../Component';
import {
  getBindText,
  hasBindField,
  setIconDecoration,
} from '../utils';

const PLUGIN_TYPE = 'cellImage';

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
    return data.config.mode !== 4;
};

const Component = function (props) {
    const { onConfirm, onCancel, plugin, sheet } = props;
    const [data, setData] = useState(plugin);
    const rectDisabled = isRectDisabled(data);
    const handleConfirm = () => {
        const plugin = {
            type: PLUGIN_TYPE,
            config: { ...data.config },
        };
        withBatchUpdate(sheet.getParent(),()=>{
            applyToSelectedCell(sheet, (sheet, row, col) => {
                const bindingPath = sheet.getBindingPath(row, col);
                if (bindingPath) {
                    setCellTagPlugin(sheet, row, col, plugin);
                }
            });
        });
        onConfirm(plugin);
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
                        value={data.config.mode}
                        datas={ImageSparklineModeItems}
                        onChange={(val) =>
                            setData({
                                ...data,
                                config: { ...data.config, mode: val },
                            })
                        }
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
                        onChange={(val) =>
                            setData({
                                ...data,
                                config: { ...data.config, width: val },
                            })
                        }
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
                        onChange={(val) =>
                            setData({
                                ...data,
                                config: { ...data.config, height: val },
                            })
                        }
                    ></Integer>
                </Item>
            </ItemList>
            <Toolbar onConfirm={handleConfirm} onCancel={onCancel}></Toolbar>
        </Fragment>
    );
};

function paintCell(context, style, value) {
    const { sheet, row, col } = context;
    const has = hasCellTagPluginByIndex(sheet, row, col, PLUGIN_TYPE);
    if (has) {
        setIconDecoration(style, 'image');
        const bindingPath = sheet.getBindingPath(row,col);
        const text = getBindText(
            bindingPath,
            sheet.getParent()
        );
        if (!isUndefined(text)) {
            return text;
        }
    }
    return value;
}

function getOptions(sheet){
    const {row,col} = getActiveIndexBySheet(sheet);
    const options = [];
    if(hasBindField(sheet,row,col)){
        options.push({
            value: PLUGIN_TYPE,
            text: '图片',
        });
    }
    return options;
}

export default {
    Component,
    paintCell,
    PLUGIN_TYPE,
    getOptions,
};
