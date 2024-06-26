import {
  Fragment,
  useState,
} from 'react';

import { Range } from '@components/range/Index';
import { Select } from '@toone/report-ui';
import { isUndefined } from '@toone/report-util';
import { applyToSelectedCell } from '@utils/spreadUtil';
import {
  getCellTag,
  getCellTagPlugin,
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
  setSumDecoration,
} from '../utils';

const PLUGIN_TYPE = 'cellSubTotal';

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

const Component = function (props) {
    const { onConfirm, onCancel, plugin,sheet, } = props;
    const [data, setData] = useState(plugin);
    const handleConfirm = () => {
        applyToSelectedCell(sheet, (sheet, row, col) => {
            //clearAllCellTagPlugin(sheet, row, col);
            const bindingPath = sheet.getBindingPath(row, col);
            if (bindingPath) {
                const paths = bindingPath.split('.');
                //const instanceId = getCellInstanceId(sheet,row,col);
                const instanceId = getCellTag(sheet,row,col,"instanceId");
                const tableCode = paths[0];
                const fieldCode = paths[1];
                const config = plugin.config || {};
                config.tableCode = tableCode;
                config.fieldCode = fieldCode;
                config.instanceId = instanceId
                plugin.config = config;
                setCellTagPlugin(sheet, row, col, plugin);
                sheet.setBindingPath(row,col,undefined);
            }
        });
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
                        value={data.config.functionNum}
                        onChange={(val) =>
                            setData({
                                ...data,
                                config: { ...data.config, functionNum: val },
                            })
                        }
                    ></Select>
                </Item>
            </ItemList>
            <ItemList>
                <Item>
                    <Title>汇总目标</Title>
                </Item>
                <Item>
                    <Range></Range>
                </Item>
            </ItemList>
            <Toolbar onCancel={onCancel} onConfirm={handleConfirm}></Toolbar>
        </Fragment>
    );
};

const isShowIcon = function (sheet, row, col) {
    return false;//hasCellTagPluginByIndex(sheet, row, col, 'cellSubTotal');
};

const paintCell = function (context, style, value) {
    const { sheet, row, col } = context;
    const has = hasCellTagPluginByIndex(sheet, row, col, PLUGIN_TYPE);
    if (has) {
        setSumDecoration(style);
        const plugin = getCellTagPlugin(sheet, row, col, PLUGIN_TYPE);
        const { tableCode, fieldCode, functionNum } = plugin.config;
        const text = getBindText(
            `${tableCode}.${fieldCode}`,
            sheet.getParent()
        );
        if (!isUndefined(text)) {
            const type = Sum_Types.find((type) => type.value == functionNum);
            return `[${type.text}(${text})]`;
        }
    }
    return value;
};

function getOptions(sheet){
    return [{
        value: PLUGIN_TYPE,
        text: '汇总',
    }];
}

/**
 * 获取单元格扩展方向
 * @param {*} sheet
 * @param {*} row
 * @param {*} col
 * @returns
 */
function getDirection(sheet, row, col) {
    return null;
}

export default {
    isShowIcon,
    paintCell,
    Component,
    PLUGIN_TYPE,
    getOptions,
    getDirection,
};
