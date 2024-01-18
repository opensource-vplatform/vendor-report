import { createSlice } from '@reduxjs/toolkit';

export const worksheetSettingSlice = createSlice({
    name: 'worksheetSettingSlice',
    initialState: {
        opened: false,
        active: null,
        colCount: 0,
        rowCount: 0,
        frozenColumnCount: 0,
        frozenRowCount: 0,
        frozenLeftColumn: 0,
        frozenTopRow: 0,
        frozenTrailingColumnCount: 0,
        frozenTrailingRowCount: 0,
        frozenTrailingRowStickToEdge: false,
        frozenTrailingColumnStickToEdge: false,
        selectionPolicy: 0,
        allowCellOverflow: true,
        showZeros: true,
        showHorizontalGridline: false,
        showVerticalGridline: false,
        gridlineColor: '',
        colHeaderRowCount: 0,
        colHeaderAutoText: 0,
        colHeaderAutoTextIndex: 0,
        colHeaderDefRowHeight: 20,
        colHeaderVisible: true,
        rowHeaderColCount: 0,
        rowHeaderAutoText: 0,
        rowHeaderAutoTextIndex: 0,
        rowHeaderDefColWidth: 40,
        rowHeaderVisible: true,
        sheetTabColor:'',
    },
    reducers: {
        init(state, action) {
            Object.assign(state, action.payload);
        },
        setActive(state, action) {
            if (state.active != action.payload.code) {
                state.active = action.payload.code;
            }
        },
        setOpened(state, action) {
            state.opened = action.payload;
        },
        setColCount(state, action) {
            state.colCount = action.payload;
        },
        setRowCount(state, action) {
            state.rowCount = action.payload;
        },
        setFrozenColumnCount(state, action) {
            state.frozenColumnCount = action.payload;
        },
        setFrozenRowCount(state, action) {
            state.frozenRowCount = action.payload;
        },
        setFrozenLeftColumn(state, action) {
            state.frozenLeftColumn = action.payload;
        },
        setFrozenTopRow(state, action) {
            state.frozenTopRow = action.payload;
        },
        setFrozenTrailingColumnCount(state, action) {
            state.frozenTrailingColumnCount = action.payload;
        },
        setFrozenTrailingRowCount(state, action) {
            state.frozenTrailingRowCount = action.payload;
        },
        setFrozenTrailingRowStickToEdge(state, action) {
            state.frozenTrailingRowStickToEdge = action.payload;
        },
        setFrozenTrailingColumnStickToEdge(state, action) {
            state.frozenTrailingColumnStickToEdge = action.payload;
        },
        setSelectionPolicy(state, action) {
            state.selectionPolicy = action.payload;
        },
        setAllowCellOverflow(state, action) {
            state.allowCellOverflow = action.payload;
        },
        setShowZeros(state, action) {
            state.showZeros = action.payload;
        },
        setShowHorizontalGridline(state, action) {
            state.showHorizontalGridline = action.payload;
        },
        setShowVerticalGridline(state, action) {
            state.showVerticalGridline = action.payload;
        },
        setGridlineColor(state, action) {
            state.gridlineColor = action.payload;
        },
        setColHeaderRowCount(state, action) {
            state.colHeaderRowCount = action.payload;
        },
        setColHeaderAutoText(state, action) {
            state.colHeaderAutoText = action.payload;
        },
        setColHeaderAutoTextIndex(state, action) {
            state.colHeaderAutoTextIndex = action.payload;
        },
        setColHeaderDefRowHeight(state, action) {
            state.colHeaderDefRowHeight = action.payload;
        },
        setColHeaderVisible(state, action) {
            state.colHeaderVisible = action.payload;
        },
        setRowHeaderColCount(state, action) {
            state.rowHeaderColCount = action.payload;
        },
        setRowHeaderAutoText(state, action) {
            state.rowHeaderAutoText = action.payload;
        },
        setRowHeaderAutoTextIndex(state, action) {
            state.rowHeaderAutoTextIndex = action.payload;
        },
        setRowHeaderDefColWidth(state, action) {
            state.rowHeaderDefColWidth = action.payload;
        },
        setRowHeaderVisible(state, action) {
            state.rowHeaderVisible = action.payload;
        },
        setSheetTabColor(state, action) {
            state.sheetTabColor = action.payload;
        },
    },
});
export const {
    init,
    setActive,
    setOpened,
    setColCount,
    setRowCount,
    setFrozenColumnCount,
    setFrozenRowCount,
    setFrozenLeftColumn,
    setFrozenTopRow,
    setFrozenTrailingColumnCount,
    setFrozenTrailingRowCount,
    setFrozenTrailingRowStickToEdge,
    setFrozenTrailingColumnStickToEdge,
    setSelectionPolicy,
    setAllowCellOverflow,
    setShowZeros,
    setShowHorizontalGridline,
    setShowVerticalGridline,
    setGridlineColor,
    setColHeaderRowCount,
    setColHeaderAutoText,
    setColHeaderAutoTextIndex,
    setColHeaderDefRowHeight,
    setColHeaderVisible,
    setRowHeaderColCount,
    setRowHeaderAutoText,
    setRowHeaderAutoTextIndex,
    setRowHeaderDefColWidth,
    setRowHeaderVisible,
    setSheetTabColor,
} = worksheetSettingSlice.actions;
export default worksheetSettingSlice.reducer;
