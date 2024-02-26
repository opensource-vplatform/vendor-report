import { createSlice } from '@reduxjs/toolkit';

import { setSpread } from '../appSlice/appSlice';

export const viewSlice = createSlice({
    name: 'viewSlice',
    initialState: {
        spread: null,
        //显示列标题
        colHeaderVisible: true,
        //显示行标题
        rowHeaderVisible: true,
        //显示水平网格线
        showHorizontalGridline: true,
        //显示垂直网格线
        showVerticalGridline: true,
        //显示新增sheet图标
        newTabVisible: true,
        //显示工作表选项卡
        tabStripVisible:true
    },
    reducers: {
        init(state,action){
            const {colHeaderVisible,rowHeaderVisible,showHorizontalGridline,showVerticalGridline} = action.payload;
            state.colHeaderVisible = colHeaderVisible;
            state.rowHeaderVisible = rowHeaderVisible;
            state.showHorizontalGridline = showHorizontalGridline;
            state.showVerticalGridline = showVerticalGridline;
        },
        setColHeaderVisible(state,action){
            const visible = action.payload.visible;
            state.colHeaderVisible = visible;
        },
        setRowHeaderVisible(state,action){
            const visible = action.payload.visible;
            state.rowHeaderVisible = visible;
        },
        setShowHorizontalGridline(state,action){
            const visible = action.payload.visible;
            state.showHorizontalGridline = visible;
        },
        setShowVerticalGridline(state,action){
            const visible = action.payload.visible;
            state.showVerticalGridline = visible;
        },
        setNewTabVisible(state,action){
            const visible = action.payload.visible;
            state.newTabVisible = visible;
        },
        setTabStripVisible(state,action){
            const visible = action.payload.visible;
            state.tabStripVisible = visible;
        },
        resetView(state,action){
            const spread = state.spread;
            state.tabStripVisible = spread.options.tabStripVisible
            state.newTabVisible = spread.options.newTabVisible;
            const sheet = spread.getActiveSheet();
            state.colHeaderVisible = sheet.options.colHeaderVisible;
            state.rowHeaderVisible = sheet.options.rowHeaderVisible;
            state.showHorizontalGridline = sheet.options.gridline.showHorizontalGridline;
            state.showVerticalGridline = sheet.options.gridline.showVerticalGridline;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(setSpread, (state, action) => {
            state.spread = action.payload.spread;
        });
    },
});
export const {
    init,
    setColHeaderVisible,
    setRowHeaderVisible,
    setShowHorizontalGridline,
    setShowVerticalGridline,
    setNewTabVisible,
    setTabStripVisible,
    resetView,
} = viewSlice.actions;
export default viewSlice.reducer;
