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
} from '@store/settingSlice/worksheetSettingSlice';
import { withBatchCalcUpdate } from '@utils/spreadUtil';

import { init } from '../../../store/settingSlice/worksheetSettingSlice';
import {
  isNullOrUndef,
  isUndefined,
} from '../../../utils/objectUtil';
import { getNamespace } from '../../../utils/spreadUtil';
import {
  Operations,
  TabPanel,
  WithTabItem,
} from '../Components';
import Common from './Common';
import GridLine from './GridLine';
import Label from './Label';
import Protect from './Protect';
import Title from './Title';

const CommonTab = WithTabItem(Common, setActive);
const GridLineTab = WithTabItem(GridLine, setActive);
const TitleTab = WithTabItem(Title, setActive);
const LabelTab = WithTabItem(Label, setActive);
const ProtectTab = WithTabItem(Protect, setActive);

export default function () {
    const dispatch = useDispatch();
    const { opened, active, ...options } = useSelector(
        ({ worksheetSettingSlice }) => worksheetSettingSlice
    );

    const { spread } = useSelector(({ appSlice }) => appSlice);
    const handleApply = () => {
        withBatchCalcUpdate(spread, (sheet) => {
            const {
                colCount,
                rowCount,
                frozenRowCount,
                frozenTopRow,
                frozenColumnCount,
                frozenLeftColumn,
                frozenTrailingColumnCount,
                frozenTrailingRowCount,
                frozenTrailingRowStickToEdge,
                frozenTrailingColumnStickToEdge,
                selectionPolicy,
                allowCellOverflow,
                showZeros,
                showHorizontalGridline,
                showVerticalGridline,
                gridlineColor,
                colHeaderRowCount,
                colHeaderAutoText,
                colHeaderAutoTextIndex,
                colHeaderDefRowHeight,
                colHeaderVisible,
                rowHeaderColCount,
                rowHeaderAutoText,
                rowHeaderAutoTextIndex,
                rowHeaderDefColWidth,
                rowHeaderVisible,
                sheetTabColor,
                isProtected,
                allowSelectLockedCells,
                allowSelectUnlockedCells,
                allowFilter,
                allowSort,
                allowResizeRows,
                allowResizeColumns,
                allowEditObjects,
                allowDragInsertRows,
                allowDragInsertColumns,
                allowInsertRows,
                allowInsertColumns,
                allowDeleteRows,
                allowDeleteColumns,
            } = options;
            sheet.setColumnCount(colCount);
            sheet.setRowCount(rowCount);
            sheet.frozenRowCount(frozenRowCount, frozenTopRow);
            sheet.frozenColumnCount(frozenColumnCount, frozenLeftColumn);
            sheet.frozenTrailingRowCount(
                frozenTrailingRowCount,
                frozenTrailingRowStickToEdge
            );
            sheet.frozenTrailingColumnCount(
                frozenTrailingColumnCount,
                frozenTrailingColumnStickToEdge
            );
            sheet.selectionPolicy(selectionPolicy);
            sheet.options.allowCellOverflow = allowCellOverflow;
            sheet.options.showZeros = showZeros;

            sheet.setRowCount(colHeaderRowCount, 1);
            sheet.options.colHeaderAutoText = colHeaderAutoText;
            sheet.options.colHeaderAutoTextIndex = colHeaderAutoTextIndex;
            sheet.defaults.colHeaderRowHeight = Math.max(
                colHeaderDefRowHeight || 0,
                0
            );
            sheet.options.colHeaderVisible = colHeaderVisible;
            sheet.setColumnCount(rowHeaderColCount, 2);
            sheet.options.rowHeaderAutoText = rowHeaderAutoText;
            sheet.options.rowHeaderAutoTextIndex = rowHeaderAutoTextIndex;
            sheet.defaults.rowHeaderColWidth = Math.max(
                rowHeaderDefColWidth || 0,
                0
            );
            sheet.options.rowHeaderVisible = rowHeaderVisible;
            if (!isNullOrUndef(gridlineColor)) {
                sheet.options.gridline = {
                    showHorizontalGridline,
                    showVerticalGridline,
                    color: gridlineColor,
                };
            }
            if (!isNullOrUndef(sheetTabColor)) {
                sheet.options.sheetTabColor = sheetTabColor;
            }
            sheet.options.isProtected = isProtected;
            sheet.options.protectionOptions = {
                allowSelectLockedCells,
                allowSelectUnlockedCells,
                allowFilter,
                allowSort,
                allowResizeRows,
                allowResizeColumns,
                allowEditObjects,
                allowDragInsertRows,
                allowDragInsertColumns,
                allowInsertRows,
                allowInsertColumns,
                allowDeleteRows,
                allowDeleteColumns,
            };
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
            const sheet = spread.getActiveSheet();
            if (sheet) {
                const {
                    allowCellOverflow,
                    showZeros,
                    gridline,
                    colHeaderAutoText,
                    colHeaderAutoTextIndex,
                    colHeaderVisible,
                    rowHeaderAutoText,
                    rowHeaderAutoTextIndex,
                    rowHeaderVisible,
                    sheetTabColor,
                } = sheet.options;
                const {
                    showHorizontalGridline = false,
                    showVerticalGridline = false,
                    color = '',
                } = gridline;
                const GC = getNamespace();
                const colHeaderRowCount = sheet.getRowCount(
                    GC.Spread.Sheets.SheetArea.colHeader
                );
                const colHeaderDefRowHeight = isUndefined(
                    sheet.defaults.colHeaderRowHeight
                )
                    ? 20
                    : sheet.defaults.colHeaderRowHeight;
                const rowHeaderColCount = sheet.getColumnCount(
                    GC.Spread.Sheets.SheetArea.rowHeader
                );
                const rowHeaderDefColWidth = isUndefined(
                    sheet.defaults.rowHeaderColWidth
                )
                    ? 40
                    : sheet.defaults.rowHeaderColWidth;
                const {
                    allowSelectLockedCells = true,
                    allowSelectUnlockedCells = true,
                    allowFilter = true,
                    allowSort = true,
                    allowResizeRows = true,
                    allowResizeColumns = true,
                    allowEditObjects = false,
                    allowDragInsertRows = false,
                    allowDragInsertColumns = false,
                    allowInsertRows = false,
                    allowInsertColumns = false,
                    allowDeleteRows = false,
                    allowDeleteColumns = false,
                } = sheet.options.protectionOptions;
                const isProtected = sheet.options.isProtected;
                dispatch(
                    init({
                        colCount: sheet.getColumnCount(),
                        rowCount: sheet.getRowCount(),
                        frozenColumnCount: sheet.frozenColumnCount(),
                        frozenRowCount: sheet.frozenRowCount(),
                        frozenLeftColumn: sheet.getFrozenTopLeftIndex(),
                        frozenTopRow: sheet.getFrozenTopLeftIndex(true),
                        frozenTrailingColumnCount:
                            sheet.frozenTrailingColumnCount(),
                        frozenTrailingRowCount: sheet.frozenTrailingRowCount(),
                        frozenTrailingRowStickToEdge:
                            sheet.getFrozenTrailingState(true),
                        frozenTrailingColumnStickToEdge:
                            sheet.getFrozenTrailingState(),
                        selectionPolicy: sheet.selectionPolicy(),
                        allowCellOverflow,
                        showZeros,
                        showHorizontalGridline,
                        showVerticalGridline,
                        gridlineColor: color,
                        colHeaderRowCount,
                        colHeaderAutoText,
                        colHeaderAutoTextIndex,
                        colHeaderDefRowHeight,
                        colHeaderVisible,
                        rowHeaderColCount,
                        rowHeaderAutoText,
                        rowHeaderAutoTextIndex,
                        rowHeaderDefColWidth,
                        rowHeaderVisible,
                        sheetTabColor,
                        isProtected,
                        allowSelectLockedCells,
                        allowSelectUnlockedCells,
                        allowFilter,
                        allowSort,
                        allowResizeRows,
                        allowResizeColumns,
                        allowEditObjects,
                        allowDragInsertRows,
                        allowDragInsertColumns,
                        allowInsertRows,
                        allowInsertColumns,
                        allowDeleteRows,
                        allowDeleteColumns,
                    })
                );
            }
        }
    }, []);
    return (
        <Dialog
            title='工作表设置'
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
                    <CommonTab code='common' title='常规'></CommonTab>
                    <GridLineTab code='gridline' title='网格线'></GridLineTab>
                    <TitleTab code='title' title='标题'></TitleTab>
                    <ProtectTab code='protect' title='保护'></ProtectTab>
                    <LabelTab code='label' title='工作表标签'></LabelTab>
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
