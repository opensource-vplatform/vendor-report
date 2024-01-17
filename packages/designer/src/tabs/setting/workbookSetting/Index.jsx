import React, { useEffect } from 'react';

import {
  useDispatch,
  useSelector,
} from 'react-redux';
import styled from 'styled-components';

import Button from '@components/button/Index';
import { Dialog } from '@components/dialog/Index';
import {
  Tab,
  Tabs,
} from '@components/tabs/Index';
import {
  setActive,
  setIsOpenforWorkbookSetting,
} from '@store/settingSlice/workbookSettingSlice';

import { init } from '../../../store/settingSlice/workbookSettingSlice';
import { withBatchUpdate } from '../../../utils/spreadUtil';
import CalcuationTab from './CalcuationTab';
import GeneralTab from './GeneralTabItem';
import ScrollbarsTab from './ScrollbarsTab';
import WorksheetLabel from './WorksheetLabel';

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
const CalculationNavItem = WithTabItem(CalcuationTab);
const WorksheetLabelNavItem = WithTabItem(WorksheetLabel);

export default function () {
    const dispatch = useDispatch();
    const { isOpenforWorkbookSetting, active, ...options } = useSelector(
        ({ workbookSettingSlice }) => workbookSettingSlice
    );

    const { spread } = useSelector(({ appSlice }) => appSlice);
    const handleApply = () => {
        withBatchUpdate(spread, () => {
            Object.assign(spread.options, options);
        });
        dispatch(setIsOpenforWorkbookSetting(false));
    };
    const handleCancel = () => {
        dispatch(setIsOpenforWorkbookSetting(false));
    };
    const handleClose = () => {
        dispatch(setIsOpenforWorkbookSetting(false));
    };
    useEffect(() => {
        if (spread) {
            const {
                allowUserDragDrop,
                allowUserDragFill,
                allowUndo,
                allowUserDragMerge,
                allowAutoCreateHyperlink,
                allowAutoExtendFilterRange,
                rowResizeMode,
                columnResizeMode,
                maxUndoStack,
                allowUserEditFormula,
                allowUserZoom,
                allowDynamicArray,
                allowInvalidFormula,
                enableAccessibility,
                scrollByPixel,
                scrollPixel,
                formulaFormatHint,
                showVerticalScrollbar,
                scrollbarShowMax,
                scrollbarAppearance,
                showHorizontalScrollbar,
                scrollbarMaxAlign,
                referenceStyle,
                calcOnDemand,
                iterativeCalculation,
                iterativeCalculationMaximumIterations,
                iterativeCalculationMaximumChange,
                tabStripVisible,
                newTabVisible,
                tabStripRatio,
                tabStripWidth,
                tabStripPosition,
                allSheetsListVisible,
                tabEditable,
            } = spread.options;
            dispatch(
                init({
                    allowUserDragDrop,
                    allowUserDragFill,
                    allowUndo,
                    allowUserDragMerge,
                    allowAutoCreateHyperlink,
                    allowAutoExtendFilterRange,
                    rowResizeMode,
                    columnResizeMode,
                    maxUndoStack,
                    allowUserEditFormula,
                    allowUserZoom,
                    allowDynamicArray,
                    allowInvalidFormula,
                    enableAccessibility,
                    scrollByPixel,
                    scrollPixel,
                    formulaFormatHint,
                    showVerticalScrollbar,
                    scrollbarShowMax,
                    scrollbarAppearance,
                    showHorizontalScrollbar,
                    scrollbarMaxAlign,
                    referenceStyle,
                    calcOnDemand,
                    iterativeCalculation,
                    iterativeCalculationMaximumIterations,
                    iterativeCalculationMaximumChange,
                    tabStripVisible,
                    newTabVisible,
                    tabStripRatio,
                    tabStripWidth,
                    tabStripPosition,
                    allSheetsListVisible,
                    tabEditable,
                })
            );
        }
    }, []);
    return (
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
                    <CalculationNavItem
                        code='calculation'
                        title='计算'
                    ></CalculationNavItem>
                    <WorksheetLabelNavItem
                        code='tabstripIcon'
                        title='工作表标签'
                    ></WorksheetLabelNavItem>
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
    );
}
