import { createSlice } from '@reduxjs/toolkit';

import { setSpread } from '../appSlice/appSlice';

export const tableDesignSlice = createSlice({
    name: 'tableDesignSlice',
    initialState: {
        spread:null,
        //标题行
        showHeader: true,
        //汇总行
        showFooter: false,
        //镶边行
        showHorizontalGridline: true,
        //镶边列
        showVerticalGridline: true,
        //第一列
        newTabVisible: true,
        //最后一列
        tabStripVisible:true,
        //筛选按钮
        filterButtonVisible:false
    },
    reducers: {
        setShowHeader(state,action){
            state.showHeader = action.payload.showHeader;
        },
        setShowFooter(state,action){
            state.showFooter = action.payload.showFooter;
        },
        setFilterButtonVisible(state,action){
            state.filterButtonVisible = action.payload.filterButtonVisible;
        },
        setData(state,action){
            Object.assign(state,action.payload.data)
        }
    },
    extraReducers: (builder) => {
        builder.addCase(setSpread, (state, action) => {
            state.spread = action.payload.spread;
        });
    },
});
export const {
    setData,
    setShowHeader,
    setShowFooter,
    setFilterButtonVisible,
} = tableDesignSlice.actions;
export default tableDesignSlice.reducer;
