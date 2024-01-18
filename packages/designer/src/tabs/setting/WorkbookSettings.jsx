import React from 'react';

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
import CalculationIcon from '@icons/setting/Calculation';
import ScrollbarsIcon from '@icons/setting/Scrollbars';
import SpreadGeneralIcon from '@icons/setting/spreadGeneral';
import TabstripIcon from '@icons/setting/Tabstrip';
import {
  setActive,
  setOpened,
} from '@store/settingSlice/workbookSettingSlice';

import { Label } from './Components';
import WorkbookSettingDialog from './workbookSetting/Index';

export default function () {
    const dispatch = useDispatch();
    const {
        opened
    } = useSelector(({ workbookSettingSlice }) => workbookSettingSlice);
    const style = { padding: '2px 4px 2px 4px' }
    return (
        <>
            <GroupItem title='工作簿设置'>
                <HLayout>
                    <VItem
                        title='常规'
                        desc='设置工作簿的常规属性'
                        style={{
                            marginLeft: 4,
                            marginRight: 4,
                            paddingLeft: 4,
                            paddingRight: 4,
                            paddingBottom: 4,
                        }}
                        icon={
                            <SpreadGeneralIcon
                                iconStyle={{
                                    width: 28,
                                    height: 28,
                                }}
                            ></SpreadGeneralIcon>
                        }
                        onClick={() => {
                            dispatch(setOpened(true));
                            dispatch(setActive({ code: 'general' }));
                        }}
                    ></VItem>
                    <VGroupItem>
                        <ItemList style={style}>
                            <ScrollbarsIcon
                                onClick={() => {
                                    dispatch(setOpened(true));
                                    dispatch(setActive({ code: 'scrollbars' }));
                                }}
                                tips='滚动条'
                            >
                                <Label>滚动条</Label>
                            </ScrollbarsIcon>
                        </ItemList>
                        <ItemList style={style}>
                            <CalculationIcon
                                onClick={() => {
                                    dispatch(setOpened(true));
                                    dispatch(
                                        setActive({ code: 'calculation' })
                                    );
                                }}
                                tips='计算'
                            >
                                <Label>计算</Label>
                            </CalculationIcon>
                        </ItemList>
                        <ItemList style={style}>
                            <TabstripIcon
                                onClick={() => {
                                    dispatch(setOpened(true));
                                    dispatch(
                                        setActive({ code: 'tabstripIcon' })
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
            {opened ? (
                <WorkbookSettingDialog></WorkbookSettingDialog>
            ) : null}
        </>
    );
}
