import { Fragment } from 'react';

import { isUndefined } from '@toone/report-util';
import {
  applyToSelectedCell,
  withBatchCalcUpdate,
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
  setListDecoration,
} from '../utils';
import Group from './Group';

const PLUGIN_TYPE = 'cellList';

const Component = function (props) {
    const { onConfirm, onCancel, sheet, } = props;
    const handleConfirm = () => {
        const plugin = {
            type: PLUGIN_TYPE,
        };
        withBatchCalcUpdate(sheet.getParent(),()=>{
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
            <Toolbar onCancel={onCancel} onConfirm={handleConfirm}></Toolbar>
        </Fragment>
    );
}

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
    const has = hasCellTagPluginByIndex(sheet, row, col, Group.PLUGIN_TYPE);
    if (hasBindField(sheet,row,col)&&!has) {//绑定实体字段，且插件类型不为分组
        setListDecoration(style);
        const bindingPath = sheet.getBindingPath(row, col);
        const spread = sheet.getParent();
        const text = getBindText(bindingPath,spread);
        if(!isUndefined(text)){
            value = text;
        }
    }
    return value;
};

function getOptions(sheet){
    const options = [];
    const {row,col} = getActiveIndexBySheet(sheet);
    if(hasBindField(sheet,row,col)){
        options.push({
            value: PLUGIN_TYPE,
            text: '列表'
        });
    }
    return options;
}

export default {
    Component,
    isShowIcon,
    paintCell,
    getOptions,
    PLUGIN_TYPE,
}
