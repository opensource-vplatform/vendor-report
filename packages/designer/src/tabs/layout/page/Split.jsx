import {
  useDispatch,
  useSelector,
} from 'react-redux';

import { VIconTitleWithDropdown } from '@components/nav/Index';
import SplitIcon from '@icons/layout/page/Split';
import { isFunction } from '@toone/report-util';
import {
  insertPageSplit,
  removePageSplit,
  resetAllPageSplit,
} from '@utils/printUtil';

const Menus = [
    {
        value: 'insert',
        title: '插入分隔符',
        text: '插入分隔符',
        handler: function (spread) {
            insertPageSplit(spread);
        },
    },
    {
        value: 'delete',
        title: '删除分隔符',
        text: '删除分隔符',
        handler: function (spread) {
            removePageSplit(spread);
        },
    },
    'divider',
    {
        value: 'reset',
        title: '重设所有分隔符',
        text: '重设所有分隔符',
        handler: function (spread) {
            resetAllPageSplit(spread);
        },
    },
];

export default function () {
    const { spread } = useSelector(({ appSlice }) => appSlice);
    const dispatch = useDispatch();
    const handleNodeClick = (val, node) => {
        const { handler } = node;
        if (isFunction(handler)) {
            handler(spread, dispatch, val);
        }
    };
    return (
        <VIconTitleWithDropdown
            title='分隔符'
            icon={SplitIcon}
            menus={Menus}
            onNodeClick={handleNodeClick}
        ></VIconTitleWithDropdown>
    );
}
