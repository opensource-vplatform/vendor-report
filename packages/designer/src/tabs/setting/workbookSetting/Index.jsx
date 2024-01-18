import React, { useEffect } from 'react';

import {
  useDispatch,
  useSelector,
} from 'react-redux';

import Button from '@components/button/Index';
import { Dialog } from '@components/dialog/Index';
import { Tabs } from '@components/tabs/Index';
import {
  setActive,
  setOpened,
} from '@store/settingSlice/workbookSettingSlice';

import { init } from '../../../store/settingSlice/workbookSettingSlice';
import { withBatchUpdate } from '../../../utils/spreadUtil';
import {
  Operations,
  TabPanel,
  WithTabItem,
} from '../Components';
import CalcuationTab from './CalcuationTab';
import GeneralTab from './GeneralTabItem';
import ScrollbarsTab from './ScrollbarsTab';
import WorksheetLabel from './WorksheetLabel';

const GeneralTabItem = WithTabItem(GeneralTab,setActive);
const ScrollbarsNavItem = WithTabItem(ScrollbarsTab,setActive);
const CalculationNavItem = WithTabItem(CalcuationTab,setActive);
const WorksheetLabelNavItem = WithTabItem(WorksheetLabel,setActive);

export default function () {
    const dispatch = useDispatch();
    const { opened, active, ...options } = useSelector(
        ({ workbookSettingSlice }) => workbookSettingSlice
    );

    const { spread } = useSelector(({ appSlice }) => appSlice);
    const handleApply = () => {
        withBatchUpdate(spread, () => {
            Object.assign(spread.options, options);
        });
        dispatch(setOpened(false));
    };
    const handleCancel = () => {
        dispatch(setOpened(false));
    };
    const handleClose = () => {
        dispatch(setOpened(false));
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
            open={opened}
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

            <Operations>
                <Button title={'确定'} onClick={handleApply}>
                    确定
                </Button>
                <Button title={'取消'} onClick={handleCancel}>
                    取消
                </Button>
            </Operations>
        </Dialog>
    );
}
