import React from 'react';

import {
  useDispatch,
  useSelector,
} from 'react-redux';
import styled from 'styled-components';

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
  setIsOpenforWorkbookSetting,
} from '@store/settingSlice/workbookSettingSlice';

import WorkbookSettingDialog from './workbookSetting/Index';

const Label = styled.span`
    font-size: 12px;
    margin-right: 4px;
`;

export default function () {
    const dispatch = useDispatch();
    const {
        isOpenforWorkbookSetting
    } = useSelector(({ workbookSettingSlice }) => workbookSettingSlice);
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
                            dispatch(setIsOpenforWorkbookSetting(true));
                            dispatch(setActive({ code: 'general' }));
                        }}
                    ></VItem>
                    <VGroupItem>
                        <ItemList style={{ padding: '2px 4px 2px 4px' }}>
                            <ScrollbarsIcon
                                onClick={() => {
                                    dispatch(setIsOpenforWorkbookSetting(true));
                                    dispatch(setActive({ code: 'scrollbars' }));
                                }}
                                tips='滚动条'
                            >
                                <Label>滚动条</Label>
                            </ScrollbarsIcon>
                        </ItemList>
                        <ItemList style={{ padding: '2px 4px 2px 4px' }}>
                            <CalculationIcon
                                onClick={() => {
                                    dispatch(setIsOpenforWorkbookSetting(true));
                                    dispatch(
                                        setActive({ code: 'calculation' })
                                    );
                                }}
                                tips='计算'
                            >
                                <Label>计算</Label>
                            </CalculationIcon>
                        </ItemList>
                        <ItemList style={{ padding: '2px 4px 2px 4px' }}>
                            <TabstripIcon
                                onClick={() => {
                                    dispatch(setIsOpenforWorkbookSetting(true));
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
            {isOpenforWorkbookSetting ? (
                <WorkbookSettingDialog></WorkbookSettingDialog>
            ) : null}
        </>
    );
}
