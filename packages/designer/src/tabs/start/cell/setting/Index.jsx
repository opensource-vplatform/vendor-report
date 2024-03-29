import {
  Fragment,
  useState,
} from 'react';

import { useSelector } from 'react-redux';

import EmptyIcon from '@icons/base/Empty';
import ColWidth from '@icons/cell/ColWidth';
import RowHeight from '@icons/cell/RowHeight';
import SettingIcon from '@icons/cell/Setting';
import {
  autofitColumns,
  autofitRows,
  defaultColWidth,
  defaultRowHeight,
  hideColumns,
  hideRows,
  setColumnsWidth,
  setRowsHeight,
  unHideColumns,
  unHideRows,
} from '@utils/cellUtil';
import { WithIconMenu } from '@utils/componentUtils';

import Dialog from './Dialog';

const SettingIconMenu = WithIconMenu('设置', SettingIcon, [
    {
        value: 'rowHeight',
        title: '行高',
        text: '行高',
        icon: <RowHeight></RowHeight>,
    },
    {
        value: 'autoRowHeight',
        title: '自动调整行高',
        text: '自动调整行高',
        icon: <EmptyIcon></EmptyIcon>,
    },
    {
        value: 'defaultRowHeight',
        title: '默认行高',
        text: '默认行高',
        icon: <EmptyIcon></EmptyIcon>,
    },
    'divider',
    {
        value: 'colWidth',
        title: '列宽',
        text: '列宽',
        icon: <ColWidth></ColWidth>,
    },
    {
        value: 'autoColWidth',
        title: '自动调整列宽',
        text: '自动调整列宽',
        icon: <EmptyIcon></EmptyIcon>,
    },
    {
        value: 'defaultColWidth',
        title: '默认列宽',
        text: '默认列宽',
        icon: <EmptyIcon></EmptyIcon>,
    },
    'divider',
    {
        value: 'hideRow',
        title: '隐藏行',
        text: '隐藏行',
        icon: <EmptyIcon></EmptyIcon>,
    },
    {
        value: 'hideCol',
        title: '隐藏列',
        text: '隐藏列',
        icon: <EmptyIcon></EmptyIcon>,
    },
    {
        value: 'cancelHideRow',
        title: '取消隐藏行',
        text: '取消隐藏行',
        icon: <EmptyIcon></EmptyIcon>,
    },
    {
        value: 'cancelHideCol',
        title: '取消隐藏列',
        text: '取消隐藏列',
        icon: <EmptyIcon></EmptyIcon>,
    },
]);

export default function () {
    const { spread } = useSelector(({ appSlice }) => appSlice);
    const [data, setData] = useState({
        rectValue: 20,
        rectTitle: '',
        showDialog: false,
    });
    const handleSettingChange = (val) => {
        if (val == 'rowHeight') {
            const sheet = spread.getActiveSheet();
            if (sheet) {
                setData({
                    ...data,
                    rectTitle: '行高',
                    rectValue: sheet.getRowHeight(sheet.getActiveRowIndex()),
                    showDialog: true,
                });
            }
        }else if(val == 'autoRowHeight'){
            //自动调整行高
            autofitRows(spread);
        } else if (val == 'defaultRowHeight') {
            const sheet = spread.getActiveSheet();
            if (sheet) {
                setData({
                    ...data,
                    rectTitle: '默认行高',
                    rectValue: sheet.defaults.rowHeight,
                    showDialog: true,
                });
            }
        } else if (val == 'colWidth') {
            const sheet = spread.getActiveSheet();
            if (sheet) {
                setData({
                    ...data,
                    rectTitle: '列宽',
                    rectValue: sheet.getColumnWidth(
                        sheet.getActiveColumnIndex()
                    ),
                    showDialog: true,
                });
            }
        }else if(val == 'autoColWidth'){
            //自动调整列宽
            autofitColumns(spread);
        } else if (val == 'defaultColWidth') {
            const sheet = spread.getActiveSheet();
            if (sheet) {
                setData({
                    ...data,
                    rectTitle: '默认列宽',
                    rectValue: sheet.defaults.colWidth,
                    showDialog: true,
                });
            }
        } else if (val == 'hideRow'){
            hideRows(spread);
        } else if(val == 'hideCol'){
            hideColumns(spread);
        }else if(val == 'cancelHideRow'){
            unHideRows(spread);
        }else if(val == 'cancelHideCol'){
            unHideColumns(spread);
        }
    };
    const handleSettingCell = (res) => {
        if (res.success) {
            if (data.rectTitle == '行高') {
                setRowsHeight(spread, res.value);
            } else if (data.rectTitle == '默认行高') {
                defaultRowHeight(spread,res.value);
            } else if (data.rectTitle == '列宽') {
                setColumnsWidth(spread, res.value);
            } else if (data.rectTitle == '默认列宽') {
                defaultColWidth(spread,res.value);
            }
        }
        setData({
            ...data,
            showDialog: false,
        });
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
            <SettingIconMenu
                onNodeClick={handleSettingChange}
            ></SettingIconMenu>
        </Fragment>
    );
}
