import { Fragment } from 'react';

import {
  useDispatch,
  useSelector,
} from 'react-redux';

import {
  GroupItem,
  HLayout,
  ItemList,
  VGroupItem,
  VItem,
} from '@components/group/Index';
import SheetTitleIcon from '@icons/setting/SheetTitle';
import SpreadGeneral from '@icons/setting/spreadGeneral';
import TabstripIcon from '@icons/setting/Tabstrip';
import {
  setActive,
  setOpened,
} from '@store/settingSlice/worksheetSettingSlice';

import { Label } from './Components';
import WorksheetDialog from './worksheetSetting/Index';

export default function () {
    const dispatch = useDispatch();
    const { opened } = useSelector(
        ({ worksheetSettingSlice }) => worksheetSettingSlice
    );
    const style = { padding: '2px 4px 2px 4px' };
    return (
        <Fragment>
            {opened ? <WorksheetDialog></WorksheetDialog> : null}
            <GroupItem title='工作表设置'>
                <HLayout>
                    <VItem
                        title='常规'
                        desc='设置工作表的常规属性'
                        style={{
                            marginLeft: 4,
                            marginRight: 4,
                            paddingLeft: 4,
                            paddingRight: 4,
                            paddingBottom: 4,
                        }}
                        icon={
                            <SpreadGeneral
                                iconStyle={{
                                    width: 28,
                                    height: 28,
                                }}
                            ></SpreadGeneral>
                        }
                        onClick={() => {
                            dispatch(setOpened(true));
                            dispatch(setActive({ code: 'common' }));
                        }}
                    ></VItem>
                    <VGroupItem>
                        <ItemList style={style}>
                            <SpreadGeneral
                                onClick={() => {
                                    dispatch(setOpened(true));
                                    dispatch(setActive({ code: 'gridline' }));
                                }}
                                tips='网格线'
                            >
                                <Label>网格线</Label>
                            </SpreadGeneral>
                        </ItemList>
                        <ItemList style={style}>
                            <SheetTitleIcon
                                onClick={() => {
                                    dispatch(setOpened(true));
                                    dispatch(
                                        setActive({ code: 'title' })
                                    );
                                }}
                                tips='标题'
                            >
                                <Label>标题</Label>
                            </SheetTitleIcon>
                        </ItemList>
                        <ItemList style={style}>
                            <TabstripIcon
                                onClick={() => {
                                    dispatch(setOpened(true));
                                    dispatch(
                                        setActive({ code: 'label' })
                                    );
                                }}
                                tips='工作表标签'
                            >
                                <Label>工作表标签</Label>
                            </TabstripIcon>
                        </ItemList>
                    </VGroupItem>
                </HLayout>
            </GroupItem>
        </Fragment>
    );
}
