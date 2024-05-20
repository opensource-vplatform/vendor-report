import { Fragment } from 'react';

import { isUndefined } from '@utils/objectUtil';
import { applyToSelectedCell } from '@utils/spreadUtil';
import {
  clearAllCellTagPlugin,
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

const Component = function (props) {
    const { onConfirm, onCancel, sheet, } = props;
    const handleConfirm = () => {
        const plugin = {
            type: 'cellGroupType',
        };
        applyToSelectedCell(sheet, (sheet, row, col) => {
            clearAllCellTagPlugin(sheet, row, col);
            const bindingPath = sheet.getBindingPath(row, col);
            if (bindingPath) {
                setCellTagPlugin(sheet, row, col, plugin);
            }
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

const paintCell = function (context, style, value) {
    const { sheet, row, col } = context;
    const has = hasCellTagPluginByIndex(sheet, row, col, 'cellGroupType');
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

export default { Component, isShowIcon, paintCell };
