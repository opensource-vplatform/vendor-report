import { Fragment } from 'react';

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
  Text,
  Title,
  Toolbar,
} from '../Component';
import {
  getBindText,
  hasBindField,
  setGroupDecoration,
} from '../utils';

const PLUGIN_TYPE = 'cellGroup';

const Component = function (props) {
    const { onConfirm, onCancel, sheet } = props;
    const handleConfirm = () => {
        const plugin = {
            type: PLUGIN_TYPE,
        };
        withBatchUpdate(sheet.getParent(), () => {
            applyToSelectedCell(sheet, (sheet, row, col) => {
                //clearAllCellTagPlugin(sheet, row, col);
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
                    <Title>扩展方向</Title>
                </Item>
                <Item>
                    <Text>纵向</Text>
                </Item>
            </ItemList>
            <Toolbar onConfirm={handleConfirm} onCancel={onCancel}></Toolbar>
        </Fragment>
    );
};

/**
 * 绑定实体字段即显示设置图标
 * @param {*} sheet
 * @param {*} row
 * @param {*} col
 * @returns
 */
const isShowIcon = function (sheet, row, col) {
    return hasBindField(sheet, row, col);
};

const isGroup = function(sheet, row, col){
    return hasCellTagPluginByIndex(sheet, row, col, PLUGIN_TYPE);
}

const paintCell = function (context, style, value) {
    const { sheet, row, col } = context;
    const has = isGroup(sheet, row, col);
    if (has) {
        setGroupDecoration(style);
        const bindingPath = sheet.getBindingPath(row, col);
        const spread = sheet.getParent();
        const text = getBindText(bindingPath, spread);
        if (!isUndefined(text)) {
            value = text;
        }
    }
    return value;
};


function getOptions(sheet) {
    const { row, col } = getActiveIndexBySheet(sheet);
    const options = [];
    if (hasBindField(sheet, row, col)) {
        options.push({
            value: PLUGIN_TYPE,
            text: '分组',
        });
    }
    return options;
}

/**
 * 获取单元格扩展方向
 * @param {*} sheet
 * @param {*} row
 * @param {*} col
 * @returns
 */
function getDirection(sheet, row, col) {
    if (isGroup(sheet, row, col)) {
        return 'v';
    }
    return null;
}

export default {
    Component,
    isShowIcon,
    paintCell,
    PLUGIN_TYPE,
    getOptions,
    getDirection,
};
