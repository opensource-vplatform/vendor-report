import {
  Fragment,
  useState,
} from 'react';

import { useSelector } from 'react-redux';

import { Commands } from '@commands/index';
import { VIconTitleWithDropdown } from '@components/nav/Index';
import EmptyIcon from '@icons/base/Empty';
import ColWidth from '@icons/cell/ColWidth';
import RowHeight from '@icons/cell/RowHeight';
import SettingIcon from '@icons/cell/Setting';
import { isFunction } from '@toone/report-util';
import {
  applyToSelectedCell,
  exeCommand,
} from '@utils/spreadUtil';

import Dialog from './Dialog';

const Cell_Setting_Menus = [
  {
    value: 'rowHeight',
    title: '行高',
    text: '行高',
    icon: <RowHeight></RowHeight>,
    handler: function (spread, setData) {
      const sheet = spread.getActiveSheet();
      if (sheet) {
        setData((data) => {
          return {
            ...data,
            rectTitle: '行高',
            rectValue: sheet.getRowHeight(sheet.getActiveRowIndex()),
            showDialog: true,
          };
        });
      }
    },
  },
  {
    value: 'autoRowHeight',
    title: '自动调整行高',
    text: '自动调整行高',
    icon: <EmptyIcon></EmptyIcon>,
    handler: function (spread) {
      exeCommand(spread, Commands.Setting.AutoRowHeight, {
        type: 'autoFitRowHeight',
      });
    },
  },
  {
    value: 'defaultRowHeight',
    title: '默认行高',
    text: '默认行高',
    icon: <EmptyIcon></EmptyIcon>,
    handler: function (spread, setData) {
      const sheet = spread.getActiveSheet();
      if (sheet) {
        setData((data) => {
          return {
            ...data,
            rectTitle: '默认行高',
            rectValue: sheet.defaults.rowHeight,
            showDialog: true,
          };
        });
      }
    },
  },
  'divider',
  {
    value: 'colWidth',
    title: '列宽',
    text: '列宽',
    icon: <ColWidth></ColWidth>,
    handler: function (spread, setData) {
      const sheet = spread.getActiveSheet();
      if (sheet) {
        setData((data) => {
          return {
            ...data,
            rectTitle: '列宽',
            rectValue: sheet.getColumnWidth(sheet.getActiveColumnIndex()),
            showDialog: true,
          };
        });
      }
    },
  },
  {
    value: 'autoColWidth',
    title: '自动调整列宽',
    text: '自动调整列宽',
    icon: <EmptyIcon></EmptyIcon>,
    handler: function (spread) {
      exeCommand(spread, Commands.Setting.AutoColWidth, {});
    },
  },{
    value: 'autoFitColWidth',
    title: '根据列宽，自动调整字体大小',
    text: '自适应列宽',
    icon: <EmptyIcon></EmptyIcon>,
    handler: function (spread, setData, autoFit) {
      exeCommand(spread, Commands.Setting.AutoFitColWidth, {autoFit:!!autoFit});
    },
  },
  {
    value: 'defaultColWidth',
    title: '默认列宽',
    text: '默认列宽',
    icon: <EmptyIcon></EmptyIcon>,
    handler: function (spread, setData) {
      const sheet = spread.getActiveSheet();
      if (sheet) {
        setData((data) => {
          return {
            ...data,
            rectTitle: '默认列宽',
            rectValue: sheet.defaults.colWidth,
            showDialog: true,
          };
        });
      }
    },
  },
  'divider',
  {
    value: 'hideRow',
    title: '隐藏行',
    text: '隐藏行',
    icon: <EmptyIcon></EmptyIcon>,
    handler: function (spread) {
      exeCommand(spread, Commands.Visible.HideRow, {});
    },
  },
  {
    value: 'hideCol',
    title: '隐藏列',
    text: '隐藏列',
    icon: <EmptyIcon></EmptyIcon>,
    handler: function (spread) {
      exeCommand(spread, Commands.Visible.HideCol, {});
    },
  },
  {
    value: 'cancelHideRow',
    title: '取消隐藏行',
    text: '取消隐藏行',
    icon: <EmptyIcon></EmptyIcon>,
    handler: function (spread) {
      exeCommand(spread, Commands.Visible.ShowRow, {});
    },
  },
  {
    value: 'cancelHideCol',
    title: '取消隐藏列',
    text: '取消隐藏列',
    icon: <EmptyIcon></EmptyIcon>,
    handler: function (spread) {
      exeCommand(spread, Commands.Visible.ShowCol, {});
    },
  },
];

export default function () {
  const { spread } = useSelector(({ appSlice }) => appSlice);
  const [data, setData] = useState({
    rectValue: 20,
    rectTitle: '',
    menuValue: null,
    showDialog: false,
  });
  const handleSettingCell = (res) => {
    if (res.success) {
      if (data.rectTitle == '行高') {
        exeCommand(spread, Commands.Setting.RowHeight, {
          height: res.value,
        });
      } else if (data.rectTitle == '默认行高') {
        exeCommand(spread, Commands.Setting.DefaultRowHeight, {
          height: res.value,
        });
      } else if (data.rectTitle == '列宽') {
        exeCommand(spread, Commands.Setting.ColWidth, {
          width: res.value,
        });
      } else if (data.rectTitle == '默认列宽') {
        exeCommand(spread, Commands.Setting.DefaultColWidth, {
          width: res.value,
        });
      }
    }
    setData({
      ...data,
      showDialog: false,
    });
  };
  const handleNodeClick = (val, node) => {
    const handler = node.handler;
    if (isFunction(handler)) {
      handler(spread, setData, val);
    }
  };
  return (
    <Fragment>
      {data.showDialog ? (
        <Dialog
          value={data.rectValue}
          title={data.rectTitle}
          onClose={handleSettingCell}
        ></Dialog>
      ) : null}
      <VIconTitleWithDropdown
        title='格式'
        icon={SettingIcon}
        value={data.menuValue}
        menus={Cell_Setting_Menus}
        cancelAble={true}
        onNodeClick={handleNodeClick}
        onVisibleChange={(visible) => {
          if(visible){
            const sheet = spread.getActiveSheet();
            let autFit = false;
            applyToSelectedCell(sheet,(sheet,row,col)=>{
              const cell = sheet.getCell(row,col);
              if(cell){
                const fit = cell.shrinkToFit();
                if(fit){
                  autFit = true;
                  return false;
                }
              }
            });
            setData({
              ...data,
              menuValue: autFit ? "autoFitColWidth":null,
            });
          }
        }}
      ></VIconTitleWithDropdown>
    </Fragment>
  );
}
