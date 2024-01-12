import { createSlice } from '@reduxjs/toolkit';

import { setSpread } from '../appSlice/appSlice';

export const workbookSettingSlice = createSlice({
    name: 'workbookSettingSlice',
    initialState: {
        spread: null,
        isOpenforWorkbookSetting: false,
        active: null,

        // 允许拖拽
        allowUserDragDrop: true,
        // 允许拖放填充
        allowUserDragFill: true,
        // 允许撤销
        allowUndo: true,
        // 允许拖拽合并单元格
        allowUserDragMerge: false,
        // 允许自动生成超链接
        allowAutoCreateHyperlink: true,
        // 允许自动拓展筛选范围
        allowAutoExtendFilterRange: false,
        // 行调整模式
        rowResizeMode: false,
        // 列调整模式
        columnResizeMode: false,
        // 撤销/恢复栈最大长度
        maxUndoStack: 20,

        // 允许输入公式
        allowUserEditFormula: false,
        // 允许缩放
        allowUserZoom: true,
        // 允许动态数组
        allowDynamicArray: true,
        // 允许无效公式
        allowInvalidFormula: false,
        // 允许无障碍
        enableAccessibility: false,
        // 像素滚动开关
        scrollByPixel: false,
        // 滚动幅度
        scrollPixel: 20,
        // 公式自动格式化
        formulaFormatHint: false,

        showVerticalScrollbar: true,
        scrollbarShowMax: true,
        useMobileScrollbar: false,
        showHorizontalScrollbar: true,
        scrollbarMaxAlign: false,
    },
    reducers: {
        setIsOpenforWorkbookSetting(state, action) {
            state.isOpenforWorkbookSetting = action.payload;
        },
        setActive(state, action) {
            if (state.active != action.payload.code) {
                state.active = action.payload.code;
            }
        },
        setAllowUserDragDrop(state, action) {
            state.allowUserDragDrop = action.payload;
        },
        setAllowUserDragFill(state, action) {
            state.allowUserDragFill = action.payload;
        },
        setAllowUndo(state, action) {
            state.allowUndo = action.payload;
        },
        setAllowUserDragMerge(state, action) {
            state.allowUserDragMerge = action.payload;
        },
        setAllowAutoCreateHyperlink(state, action) {
            state.allowAutoCreateHyperlink = action.payload;
        },
        setAllowAutoExtendFilterRange(state, action) {
            state.allowAutoExtendFilterRange = action.payload;
        },

        setRowResizeMode(state, action) {
            state.rowResizeMode = action.payload;
        },
        setColumnResizeMode(state, action) {
            state.columnResizeMode = action.payload;
        },
        setMaxUndoStack(state, action) {
            state.maxUndoStack = action.payload;
        },

        setAllowUserEditFormula(state, action) {
            state.allowUserEditFormula = action.payload;
        },
        setAllowUserZoom(state, action) {
            state.allowUserZoom = action.payload;
        },
        setAllowDynamicArray(state, action) {
            state.allowDynamicArray = action.payload;
        },
        setAllowInvalidFormula(state, action) {
            state.allowInvalidFormula = action.payload;
        },
        setEnableAccessibility(state, action) {
            state.enableAccessibility = action.payload;
        },
        setScrollByPixel(state, action) {
            state.scrollByPixel = action.payload;
        },
        setScrollPixel(state, action) {
            state.scrollPixel = action.payload;
        },
        setFormulaFormatHint(state, action) {
            state.formulaFormatHint = action.payload;
        },
        setShowVerticalScrollbar(state, action) {
            state.showVerticalScrollbar = action.payload;
        },
        setScrollbarShowMax(state, action) {
            state.scrollbarShowMax = action.payload;
        },
        setUseMobileScrollbar(state, action) {
            state.useMobileScrollbar = action.payload;
        },
        setShowHorizontalScrollbar(state, action) {
            state.showHorizontalScrollbar = action.payload;
        },
        setScrollbarMaxAlign(state, action) {
            state.scrollbarMaxAlign = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(setSpread, (state, action) => {
            state.spread = action.payload.spread;
        });
    },
});

export const {
    setIsOpenforWorkbookSetting,
    setActive,
    setAllowUserDragDrop,
    setAllowUserDragFill,
    setAllowUndo,
    setAllowUserDragMerge,
    setAllowAutoCreateHyperlink,
    setAllowAutoExtendFilterRange,
    setAllowUserEditFormula,
    setAllowUserZoom,
    setAllowDynamicArray,
    setAllowInvalidFormula,
    setEnableAccessibility,
    setScrollByPixel,
    setRowResizeMode,
    setColumnResizeMode,
    setMaxUndoStack,
    setScrollPixel,
    setFormulaFormatHint,
    setShowVerticalScrollbar,
    setShowHorizontalScrollbar,
    setScrollbarShowMax,
    setScrollbarMaxAlign,
    setUseMobileScrollbar,
} = workbookSettingSlice.actions;

export default workbookSettingSlice.reducer;
