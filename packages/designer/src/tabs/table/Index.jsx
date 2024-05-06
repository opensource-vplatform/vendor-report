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
import {
  getNavConfig,
  getNavTableConfig,
} from '@utils/configUtil';
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
    const isHidden = getNavConfig(context,"table");
    if (isHidden) {
        return null;
    }

    //是否显示 表格选项
    const isShowTableOptions = !getNavTableConfig(context,"tableOptions");

    //是否显示 表格样式
    const isSHowTableStyle = !getNavTableConfig(context,"tableStyle");

    return (
        <Group>
            {isShowTableOptions && <TableOptions></TableOptions>}
            {isSHowTableStyle && <TableStyle></TableStyle>}
        </Group>
    );
}
