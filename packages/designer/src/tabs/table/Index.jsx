import {
  useContext,
  useEffect,
} from 'react';

import {
  useDispatch,
  useSelector,
} from 'react-redux';

import { Group } from '@components/group/Index';
import { setData } from '@store/tableDesignSlice/tableDesignSlice';
import { parseTable } from '@utils/tableUtil';

import DesignerContext from '../../DesignerContext';
import TableStyle from './style/TableStyle';
import TableOptions from './TableOptions';

export default function () {
    const dispatch = useDispatch();
    const sheet = useSelector((state) => state.sheet);
    useEffect(() => {
        if (sheet) {
            dispatch(setData({ data: parseTable(sheet) }));
        }
    }, []);
    const context = useContext(DesignerContext);
    //是否隐藏表格导航
    const isHidden = context?.conf?.nav?.table === false;
    if (isHidden) {
        return null;
    }

    //是否显示 表格选项
    const isShowTableOptions =
        context?.conf?.nav?.table?.tableOptions !== false;

    //是否显示 表格样式
    const isSHowTableStyle = context?.conf?.nav?.table?.tableStyle !== false;

    return (
        <Group>
            {isShowTableOptions && <TableOptions></TableOptions>}
            {isSHowTableStyle && <TableStyle></TableStyle>}
        </Group>
    );
}
