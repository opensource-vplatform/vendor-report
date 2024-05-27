import { Fragment } from 'react';

import {
  useDispatch,
  useSelector,
} from 'react-redux';

import {
  ItemList,
  VGroupItem,
} from '@components/group/Index';
import {
  HCard,
  VIconTitle,
} from '@components/nav/Index';
import SheetTitleIcon from '@icons/setting/SheetTitle';
import SpreadGeneral from '@icons/setting/SpreadGeneral';
import TabstripIcon from '@icons/setting/Tabstrip';
import {
  setActive,
  setOpened,
} from '@store/settingSlice/worksheetSettingSlice';

import { Label } from './Components';
import WorksheetDialog from './worksheetSetting/Index';

const iconStyle = {
    margin: 0,
    padding: 0,
    height: 20,
    width: 20,
};

export default function () {
    const dispatch = useDispatch();
    const { opened } = useSelector(
        ({ worksheetSettingSlice }) => worksheetSettingSlice
    );
    const style = { padding: '2px 4px 2px 4px' };
    return (
        <Fragment>
            {opened ? <WorksheetDialog></WorksheetDialog> : null}
            <HCard title='工作表设置'>
                <VIconTitle
                    title='常规'
                    desc='设置工作表的常规属性'
                    icon={SpreadGeneral}
                    onClick={() => {
                        dispatch(setOpened(true));
                        dispatch(setActive({ code: 'common' }));
                    }}
                ></VIconTitle>
                <VGroupItem>
                    <ItemList style={style}>
                        <SpreadGeneral
                            onClick={() => {
                                dispatch(setOpened(true));
                                dispatch(setActive({ code: 'gridline' }));
                            }}
                            iconStyle={iconStyle}
                            tips='网格线'
                        >
                            <Label>网格线</Label>
                        </SpreadGeneral>
                    </ItemList>
                    <ItemList style={style}>
                        <SheetTitleIcon
                            onClick={() => {
                                dispatch(setOpened(true));
                                dispatch(setActive({ code: 'title' }));
                            }}
                            iconStyle={iconStyle}
                            tips='标题'
                        >
                            <Label>标题</Label>
                        </SheetTitleIcon>
                    </ItemList>
                    <ItemList style={style}>
                        <TabstripIcon
                            onClick={() => {
                                dispatch(setOpened(true));
                                dispatch(setActive({ code: 'label' }));
                            }}
                            iconStyle={iconStyle}
                            tips='工作表标签'
                        >
                            <Label>工作表标签</Label>
                        </TabstripIcon>
                    </ItemList>
                </VGroupItem>
            </HCard>
        </Fragment>
    );
}
