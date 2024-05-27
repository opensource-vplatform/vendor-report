import React from 'react';

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
import CalculationIcon from '@icons/setting/Calculation';
import ScrollbarsIcon from '@icons/setting/Scrollbars';
import SpreadGeneralIcon from '@icons/setting/SpreadGeneral';
import TabstripIcon from '@icons/setting/Tabstrip';
import {
  setActive,
  setOpened,
} from '@store/settingSlice/workbookSettingSlice';

import { Label } from './Components';
import WorkbookSettingDialog from './workbookSetting/Index';

const iconStyle = {
    margin: 0,
    padding: 0,
    height: 20,
    width: 20,
};

export default function () {
    const dispatch = useDispatch();
    const { opened } = useSelector(
        ({ workbookSettingSlice }) => workbookSettingSlice
    );
    const style = { padding: '2px 4px 2px 4px' };
    return (
        <>
            <HCard title='工作簿设置'>
                <VIconTitle
                    title='常规'
                    desc='设置工作簿的常规属性'
                    icon={SpreadGeneralIcon}
                    onClick={() => {
                        dispatch(setOpened(true));
                        dispatch(setActive({ code: 'general' }));
                    }}
                ></VIconTitle>
                <VGroupItem>
                    <ItemList style={style}>
                        <ScrollbarsIcon
                            onClick={() => {
                                dispatch(setOpened(true));
                                dispatch(setActive({ code: 'scrollbars' }));
                            }}
                            iconStyle={iconStyle}
                            tips='滚动条'
                        >
                            <Label>滚动条</Label>
                        </ScrollbarsIcon>
                    </ItemList>
                    <ItemList style={style}>
                        <CalculationIcon
                            onClick={() => {
                                dispatch(setOpened(true));
                                dispatch(setActive({ code: 'calculation' }));
                            }}
                            iconStyle={iconStyle}
                            tips='计算'
                        >
                            <Label>计算</Label>
                        </CalculationIcon>
                    </ItemList>
                    <ItemList style={style}>
                        <TabstripIcon
                            onClick={() => {
                                dispatch(setOpened(true));
                                dispatch(setActive({ code: 'tabstripIcon' }));
                            }}
                            iconStyle={iconStyle}
                            tips='工作表标签'
                        >
                            <Label>工作表标签</Label>
                        </TabstripIcon>
                    </ItemList>
                </VGroupItem>
            </HCard>
            {opened ? <WorkbookSettingDialog></WorkbookSettingDialog> : null}
        </>
    );
}
