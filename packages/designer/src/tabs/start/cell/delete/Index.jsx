import {
  Fragment,
  useState,
} from 'react';

import { useSelector } from 'react-redux';

import DeleteIcon from '@icons/cell/Delete';
import DeleteCell from '@icons/cell/DeleteCell';
import DeleteSheet from '@icons/cell/DeleteSheet';
import DeleteSheetCol from '@icons/cell/DeleteSheetCol';
import DeleteSheetRow from '@icons/cell/DeleteSheetRow';
import {
  deleteColumns,
  deleteLeftCells,
  deleteRows,
  deleteSheet,
  deleteUpCells,
} from '@utils/cellUtil';
import { WithIconMenu } from '@utils/componentUtils';

import Dialog from './Dialog';

const DeleteIconMenu = WithIconMenu('删除', DeleteIcon, [
    {
        value: 'deleteCell',
        title: '删除单元格',
        text: '删除单元格',
        icon: <DeleteCell></DeleteCell>,
    },
    'divider',
    {
        value: 'deleteSheetRow',
        title: '删除工作表行',
        text: '删除工作表行',
        icon: <DeleteSheetRow></DeleteSheetRow>,
    },
    {
        value: 'deleteSheetCol',
        title: '删除工作表列',
        text: '删除工作表列',
        icon: <DeleteSheetCol></DeleteSheetCol>,
    },
    'divider',
    {
        value: 'deleteSheet',
        title: '删除工作表',
        text: '删除工作表',
        icon: <DeleteSheet></DeleteSheet>,
    },
]);

export default function () {
    const { spread } = useSelector(({ appSlice }) => appSlice);
    const [data, setData] = useState({ showDialog: false });
    const handleDeleteChange = (value) => {
        if (value == 'deleteCell') {
            setData({
                ...data,
                showDialog: true,
            });
        } else if (value == 'deleteSheetRow') {
            deleteRows(spread);
        } else if (value == 'deleteSheetCol') {
            deleteColumns(spread);
        } else if (value == 'deleteSheet') {
            deleteSheet(spread);
        }
    };
    const handleDeleteCell = (val) => {
        if (val == 'left') {
            deleteLeftCells(spread);
        } else if (val == 'up') {
            deleteUpCells(spread);
        } else if (val == 'row') {
            deleteRows(spread);
        } else if (val == 'col') {
            deleteColumns(spread);
        }
        setData({ ...data, showDialog: false });
    };
    return (
        <Fragment>
            {data.showDialog ? (
                <Dialog onClose={handleDeleteCell}></Dialog>
            ) : null}
            <DeleteIconMenu onNodeClick={handleDeleteChange}></DeleteIconMenu>
        </Fragment>
    );
}