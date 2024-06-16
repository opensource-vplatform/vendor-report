import {
  Fragment,
  useState,
} from 'react';

import { useSelector } from 'react-redux';

import { Commands } from '@commands/index';
import { VIconTitleWithDropdown } from '@components/nav/Index';
import InsertIcon from '@icons/cell/Insert';
import InsertRowIcon from '@icons/cell/InsertRow';
import InsertSheet from '@icons/cell/InsertSheet';
import InsertSheetCol from '@icons/cell/InsertSheetCol';
import InsertSheetRow from '@icons/cell/InsertSheetRow';
import { isFunction } from '@toone/report-util';
import {
  insertColumns,
  insertRows,
} from '@utils/cellUtil';
import { exeCommand } from '@utils/spreadUtil';

import Dialog from './Dialog';

const Cell_Insert_Menus = [
    {
        value: 'insertCell',
        title: '插入单元格',
        text: '插入单元格',
        icon: <InsertRowIcon></InsertRowIcon>,
        handler: function (spread, setData) {
            setData((data) => {
                return { ...data, showDialog: true };
            });
        },
    },
    'divider',
    {
        value: 'insertSheetRow',
        title: '插入工作表行',
        text: '插入工作表行',
        icon: <InsertSheetRow></InsertSheetRow>,
        handler: function (spread, setData) {
            insertRows(spread);
        },
    },
    {
        value: 'insertSheetCol',
        title: '插入工作表列',
        text: '插入工作表列',
        icon: <InsertSheetCol></InsertSheetCol>,
        handler: function (spread) {
            insertColumns(spread);
        },
    },
    'divider',
    {
        value: 'insertSheet',
        title: '插入工作表',
        text: '插入工作表',
        icon: <InsertSheet></InsertSheet>,
        handler: function (spread) {
            exeCommand(spread, Commands.Insert.Sheet, {});
        },
    },
];

export default function () {
    const { spread } = useSelector(({ appSlice }) => appSlice);
    const [data, setData] = useState({ showDialog: false });
    const handleInsertCell = (val) => {
        switch (val) {
            case 'right':
            case 'down':
                exeCommand(spread, Commands.Insert.Cell, { position: val });
                break;
            case 'row':
                insertRows(spread);
                break;
            case 'col':
                insertColumns(spread);
                break;
        }

        setData({ ...data, showDialog: false });
    };
    const handleNodeClick = (value, node) => {
        const handler = node.handler;
        if (isFunction(handler)) {
            handler(spread, setData);
        }
    };
    return (
        <Fragment>
            {data.showDialog ? (
                <Dialog onClose={handleInsertCell}></Dialog>
            ) : null}
            <VIconTitleWithDropdown
                title='插入'
                icon={InsertIcon}
                menus={Cell_Insert_Menus}
                onNodeClick={handleNodeClick}
            ></VIconTitleWithDropdown>
        </Fragment>
    );
}
