import {
  Fragment,
  useState,
} from 'react';

import { useSelector } from 'react-redux';

import { Commands } from '@commands/index';
import { VIconTitleWithDropdown } from '@components/nav/Index';
import DeleteIcon from '@icons/cell/Delete';
import DeleteCell from '@icons/cell/DeleteCell';
import DeleteSheet from '@icons/cell/DeleteSheet';
import DeleteSheetCol from '@icons/cell/DeleteSheetCol';
import DeleteSheetRow from '@icons/cell/DeleteSheetRow';
import { isFunction } from '@toone/report-util';
import {
  deleteColumns,
  deleteRows,
} from '@utils/cellUtil';
import { exeCommand } from '@utils/spreadUtil';

import Dialog from './Dialog';

const Cell_Delete_Menus = [
    {
        value: 'deleteCell',
        title: '删除单元格',
        text: '删除单元格',
        icon: <DeleteCell></DeleteCell>,
        handler: function (spread, setData) {
            setData((data) => {
                return { ...data, showDialog: true };
            });
        },
    },
    'divider',
    {
        value: 'deleteSheetRow',
        title: '删除工作表行',
        text: '删除工作表行',
        icon: <DeleteSheetRow></DeleteSheetRow>,
        handler: function (spread) {
            deleteRows(spread);
        },
    },
    {
        value: 'deleteSheetCol',
        title: '删除工作表列',
        text: '删除工作表列',
        icon: <DeleteSheetCol></DeleteSheetCol>,
        handler: function (spread) {
            deleteColumns(spread);
        },
    },
    'divider',
    {
        value: 'deleteSheet',
        title: '删除工作表',
        text: '删除工作表',
        icon: <DeleteSheet></DeleteSheet>,
        handler: function (spread) {
            exeCommand(spread, Commands.Delete.Sheet, {});
        },
    },
];

export default function () {
    const { spread } = useSelector(({ appSlice }) => appSlice);
    const [data, setData] = useState({ showDialog: false });
    const handleDeleteCell = (val) => {
        switch (val) {
            case 'left':
            case 'up':
                exeCommand(spread, Commands.Delete.Cell, { position: val });
                break;
            case 'row':
                deleteRows(spread);
                break;
            case 'col':
                deleteColumns(spread);
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
                <Dialog onClose={handleDeleteCell}></Dialog>
            ) : null}
            <VIconTitleWithDropdown
                title='删除'
                icon={DeleteIcon}
                menus={Cell_Delete_Menus}
                onNodeClick={handleNodeClick}
            ></VIconTitleWithDropdown>
        </Fragment>
    );
}
