import {
  Fragment,
  useState,
} from 'react';

import { useSelector } from 'react-redux';

import InsertIcon from '@icons/cell/Insert';
import InsertRowIcon from '@icons/cell/InsertRow';
import InsertSheet from '@icons/cell/InsertSheet';
import InsertSheetCol from '@icons/cell/InsertSheetCol';
import InsertSheetRow from '@icons/cell/InsertSheetRow';
import {
  insertColumns,
  insertDownCells,
  insertRightCells,
  insertRows,
  insertSheet,
} from '@utils/cellUtil';
import { WithIconMenu } from '@utils/componentUtils';

import Dialog from './Dialog';

const InsertMenuIcon = WithIconMenu('插入', InsertIcon, [
    {
        value: 'insertCell',
        title: '插入单元格',
        text: '插入单元格',
        icon: <InsertRowIcon></InsertRowIcon>,
    },
    'divider',
    {
        value: 'insertSheetRow',
        title: '插入工作表行',
        text: '插入工作表行',
        icon: <InsertSheetRow></InsertSheetRow>,
    },
    {
        value: 'insertSheetCol',
        title: '插入工作表列',
        text: '插入工作表列',
        icon: <InsertSheetCol></InsertSheetCol>,
    },
    'divider',
    {
        value: 'insertSheet',
        title: '插入工作表',
        text: '插入工作表',
        icon: <InsertSheet></InsertSheet>,
    },
]);

export default function () {
    const { spread } = useSelector(({ appSlice }) => appSlice);
    const [data, setData] = useState({ showDialog: false });
    const handleInsertChange = (value) => {
        if (value == 'insertCell') {
            setData({
                ...data,
                showDialog: true,
            });
        } else if (value == 'insertSheetRow') {
            insertRows(spread);
        } else if (value == 'insertSheetCol') {
            insertColumns(spread);
        } else if (value == 'insertSheet') {
            insertSheet(spread);
        }
    };
    const handleInsertCell = (val) => {
        if (val == 'right') {
            insertRightCells(spread);
        } else if (val == 'down') {
            insertDownCells(spread);
        } else if (val == 'row') {
            insertRows(spread);
        } else if (val == 'col') {
            insertColumns(spread);
        }
        setData({ ...data, showDialog: false });
    };
    return (
        <Fragment>
            {data.showDialog ? (
                <Dialog onClose={handleInsertCell}></Dialog>
            ) : null}
            <InsertMenuIcon onNodeClick={handleInsertChange}></InsertMenuIcon>
        </Fragment>
    );
}
