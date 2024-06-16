import {
  useDispatch,
  useSelector,
} from 'react-redux';

import { VIconTitleWithDropdown } from '@components/nav/Index';
import EmptyIcon from '@icons/base/Empty';
import AreaIcon from '@icons/layout/page/print/Area';
import SetIcon from '@icons/layout/page/print/Set';
import { isFunction } from '@toone/report-util';
import {
  clearPrintArea,
  setPrintArea,
} from '@utils/printUtil';

const Menus = [
    {
        value: 'set',
        title: '设置打印区域',
        text: '设置打印区域',
        icon: <SetIcon></SetIcon>,
        handler: function (spread) {
            setPrintArea(spread);
        },
    },
    {
        value: 'cancel',
        title: '取消打印区域',
        text: '取消打印区域',
        icon: <EmptyIcon></EmptyIcon>,
        handler: function (spread) {
            clearPrintArea(spread);
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
            title='打印区域'
            icon={AreaIcon}
            menus={Menus}
            onNodeClick={handleNodeClick}
        ></VIconTitleWithDropdown>
    );
}
