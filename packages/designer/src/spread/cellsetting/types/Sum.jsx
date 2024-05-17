import {
  Fragment,
  useState,
} from 'react';

import { Select } from '@components/form/Index';
import { isUndefined } from '@utils/objectUtil';
import {
  applyToSelectedCell,
  getNamespace,
} from '@utils/spreadUtil';
import {
  clearAllCellTagPlugin,
  getCellInstanceId,
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
import { getBindText } from '../utils';

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
            clearAllCellTagPlugin(sheet, row, col);
            const bindingPath = sheet.getBindingPath(row, col);
            if (bindingPath) {
                const paths = bindingPath.split('.');
                const instanceId = getCellInstanceId(sheet,row,col);
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
            <Toolbar onCancel={onCancel} onConfirm={handleConfirm}></Toolbar>
        </Fragment>
    );
};

export const isShowIcon = function (sheet, row, col) {
    return hasCellTagPluginByIndex(sheet, row, col, 'cellSubTotal');
};

export const paintCell = function (context, style, value) {
    const { sheet, row, col } = context;
    const has = hasCellTagPluginByIndex(sheet, row, col, 'cellSubTotal');
    if (has) {
        const GC = getNamespace();
        const posType = GC.Spread.Sheets.CornerPosition;
        style.decoration = {
            cornerFold: {
                size: 8,
                position: posType.rightBottom,
                color: 'blue',
            },
        };
        const plugin = getCellTagPlugin(sheet, row, col, 'cellSubTotal');
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

export default {
    isShowIcon,
    paintCell,
    Component,
};
