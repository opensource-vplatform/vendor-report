import {
  Fragment,
  useState,
} from 'react';

import { FormItem } from '@toone/report-ui';
import { isUndefined } from '@toone/report-util';
import {
  applyToSelectedCell,
  withBatchCalcUpdate,
} from '@utils/spreadUtil';
import {
  clearCellTagPlugin,
  getActiveIndexBySheet,
  hasCellTagPluginByIndex,
  setCellTagPlugin,
} from '@utils/worksheetUtil';

import {
  ListIndex,
  RowHeight,
  Text,
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
  const { onConfirm, onCancel, sheet, plugin } = props;
  const [config, setConfig] = useState(plugin.config || { listIndex: 0 });
  const handleConfirm = () => {
    const plugin = {
      type: PLUGIN_TYPE,
      config,
    };
    withBatchCalcUpdate(sheet.getParent(), () => {
      applyToSelectedCell(sheet, (sheet, row, col) => {
        //clearAllCellTagPlugin(sheet, row, col);
        const bindingPath = sheet.getBindingPath(row, col);
        if (bindingPath) {
          clearCellTagPlugin(sheet, row, col, {
            type: 'cellGroup',
          });
          setCellTagPlugin(sheet, row, col, plugin);
        }
      });
    });
    onConfirm(plugin);
  };
  return (
    <Fragment>
      <FormItem label='扩展方向'>
        <Text>纵向</Text>
      </FormItem>
      <RowHeight
        value={config.rowHeight ? config.rowHeight : ''}
        onChange={(val) => {
          setConfig({
            ...config,
            rowHeight: val,
          });
        }}
      ></RowHeight>
      <ListIndex
        sheet={sheet}
        value={config.listIndex}
        onChange={(val) => {
          setConfig({
            ...config,
            listIndex: val,
          });
        }}
      ></ListIndex>
      <Toolbar onCancel={onCancel} onConfirm={handleConfirm}></Toolbar>
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

const isList = function (sheet, row, col) {
  return (
    hasBindField(sheet, row, col) &&
    !hasCellTagPluginByIndex(sheet, row, col, Group.PLUGIN_TYPE)
  );
};

const paintCell = function (context, style, value) {
  const { sheet, row, col } = context;
  if (isList(sheet, row, col)) {
    //绑定实体字段，且插件类型不为分组
    setListDecoration(style);
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
  const options = [];
  const { row, col } = getActiveIndexBySheet(sheet);
  if (hasBindField(sheet, row, col)) {
    options.push({
      value: PLUGIN_TYPE,
      text: '列表',
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
  if (isList(sheet, row, col)) {
    return 'v';
  }
  return null;
}

export default {
  Component,
  isShowIcon,
  paintCell,
  getOptions,
  PLUGIN_TYPE,
  getDirection,
};
