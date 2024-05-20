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
        tabStripVisible: true,
    },
    reducers: {
        setOptions(state, { payload }) {
            Object.assign(state, payload);
        },
        resetView(state, action) {
            const spread = state.spread;
            state.tabStripVisible = spread.options.tabStripVisible;
            state.newTabVisible = spread.options.newTabVisible;
            const sheet = spread.getActiveSheet();
            state.colHeaderVisible = sheet.options.colHeaderVisible;
            state.rowHeaderVisible = sheet.options.rowHeaderVisible;
            state.showHorizontalGridline =
                sheet.options.gridline.showHorizontalGridline;
            state.showVerticalGridline =
                sheet.options.gridline.showVerticalGridline;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(setSpread, (state, action) => {
            state.spread = action.payload.spread;
        });
    },
});
export const { resetView, setOptions } = viewSlice.actions;
export default viewSlice.reducer;
