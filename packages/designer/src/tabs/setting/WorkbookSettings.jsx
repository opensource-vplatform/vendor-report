import React, { useContext } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';

import {
    setActive,
    setIsOpenforWorkbookSetting,
} from '@store/settingSlice/workbookSettingSlice';

import Tab from '@components/tabs/Tab';
import Tabs from '@components/tabs/Tabs';
import Button from '@components/button/Index';
import SpreadGeneralIcon from '@icons/setting/spreadGeneral';
import ScrollbarsIcon from '@icons/setting/Scrollbars';
import CalculationIcon from '@icons/setting/Calculation';
import TabstripIcon from '@icons/setting/Tabstrip';
import { Dialog } from '@components/dialog/Index';
import { GroupItem, VItem } from '@components/group/Index';
import { HLayout, ItemList, VGroupItem } from '@components/group/Index';
import GeneralTab from './WorkbookSettingSubPanel/GeneralTabItem';
import ScrollbarsTab from './WorkbookSettingSubPanel/ScrollbarsTab';

const Label = styled.span`
    font-size: 12px;
    margin-right: 4px;
`;
const TabPanel = styled.div`
    margin: 10px 13px;
    background: #fff;
    width: 700px;
    height: 530px;
    border-bottom: 1px solid #d3d3d3;
    border-left: 1px solid #d3d3d3;
    border-right: 1px solid #d3d3d3;
    P {
        margin: 5px 0 0 5px;
    }
`;
const TabBottomButtons = styled.div`
    width: 100%;
    height: 40px;
    display: flex;
    justify-content: flex-end;
    Button {
        background: #e6e6e6;
        border: 1px solid #d3d3d3;
        width: 80px;
        height: 30px;
        margin: 5px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: 15px;
    }
`;
const WithTabItem = function (Component) {
    return function (props) {
        const dispatch = useDispatch();
        const { code, title, tabProps = {} } = props;
        return (
            <Tab
                code={code}
                title={title}
                onClick={() => {
                    dispatch(setActive({ code }));
                }}
            >
                <Component {...tabProps}></Component>
            </Tab>
        );
    };
};

const GeneralTabItem = WithTabItem(GeneralTab);
const ScrollbarsNavItem = WithTabItem(ScrollbarsTab);

export default function () {
    const dispatch = useDispatch();

    const {
        isOpenforWorkbookSetting,
        active,
        // 允许拖拽
        allowUserDragDrop,
        // 允许拖放填充
        allowUserDragFill,
        // 允许撤销
        allowUndo,
        // 允许拖拽合并单元格
        allowUserDragMerge,
        // 允许自动生成超链接
        allowAutoCreateHyperlink,
        // 允许自动拓展筛选范围
        allowAutoExtendFilterRange,

        rowResizeMode,
        columnResizeMode,
        maxUndoStack,

        // 允许输入公式
        allowUserEditFormula,
        // 允许缩放
        allowUserZoom,
        // 允许动态数组
        allowDynamicArray,
        // 允许无效公式
        allowInvalidFormula,
        // 允许无障碍
        enableAccessibility,
        // 像素滚动
        scrollByPixel,
        scrollPixel,
        formulaFormatHint,

        showVerticalScrollbar,
        scrollbarShowMax,
        useMobileScrollbar,
        showHorizontalScrollbar,
        scrollbarMaxAlign,
    } = useSelector(({ workbookSettingSlice }) => workbookSettingSlice);

    const { spread } = useSelector(({ appSlice }) => appSlice);
    const handleApply = () => {
        var sheet = spread.getActiveSheet();
        // 常规设置
        sheet.suspendPaint();
        spread.options.allowUserDragDrop = allowUserDragDrop;
        spread.options.allowUserDragFill = allowUserDragFill;
        spread.options.allowUndo = allowUndo;
        spread.options.allowUserDragMerge = allowUserDragMerge;
        spread.options.allowAutoCreateHyperlink = allowAutoCreateHyperlink;
        spread.options.allowAutoExtendFilterRange = allowAutoExtendFilterRange;
        spread.options.rowResizeMode = rowResizeMode;
        spread.options.columnResizeMode = columnResizeMode;
        spread.options.maxUndoStack = maxUndoStack;
        spread.options.allowUserEditFormula = allowUserEditFormula;
        spread.options.allowUserZoom = allowUserZoom;
        spread.options.allowDynamicArray = allowDynamicArray;
        spread.options.allowInvalidFormula = allowInvalidFormula;
        spread.options.enableAccessibility = enableAccessibility;
        spread.options.scrollByPixel = scrollByPixel;
        spread.options.scrollPixel = scrollPixel;
        spread.options.formulaFormatHint = formulaFormatHint;
        // 滚动条
        spread.options.showVerticalScrollbar = showVerticalScrollbar;
        spread.options.showHorizontalScrollbar = showHorizontalScrollbar;
        spread.options.scrollbarShowMax = scrollbarShowMax;
        spread.options.scrollbarMaxAlign = scrollbarMaxAlign;
        spread.options.scrollbarAppearance = useMobileScrollbar;
        sheet.resumePaint();

        dispatch(setIsOpenforWorkbookSetting(false));
    };
    const handleCancel = () => {
        dispatch(setIsOpenforWorkbookSetting(false));
    };
    const handleClose = () => {
        dispatch(setIsOpenforWorkbookSetting(false));
    };

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
            {isOpenforWorkbookSetting && (
                <Dialog
                    title='工作簿设置'
                    width='730px'
                    height='630px'
                    open={isOpenforWorkbookSetting}
                    onClose={handleClose}
                >
                    <TabPanel>
                        <Tabs
                            value={active}
                            onChange={(code) => dispatch(setActive({ code }))}
                        >
                            <GeneralTabItem
                                code='general'
                                title='常规'
                            ></GeneralTabItem>
                            <ScrollbarsNavItem
                                code='scrollbars'
                                title='滚动条'
                            ></ScrollbarsNavItem>
                            <Tab code='calculation' title='计算'></Tab>
                            <Tab code='tabstripIcon' title='工作表标签'></Tab>
                        </Tabs>
                    </TabPanel>

                    <TabBottomButtons>
                        <Button title={'确定'} onClick={handleApply}>
                            确定
                        </Button>
                        <Button title={'取消'} onClick={handleCancel}>
                            取消
                        </Button>
                    </TabBottomButtons>
                </Dialog>
            )}
        </>
    );
}
