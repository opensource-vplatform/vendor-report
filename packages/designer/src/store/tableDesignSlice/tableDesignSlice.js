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
        bandRow: true,
        //镶边列
        bandColumn: true,
        //第一列
        highlightFirstColumn: false,
        //最后一列
        highlightLastColumn:true,
        //筛选按钮
        filterButtonVisible:false,
        //汇总行工具
        footerDropDownList:true
    },
    reducers: {
        setShowHeader(state,action){
            state.showHeader = action.payload.showHeader;
        },
        setShowFooter(state,action){
            state.showFooter = action.payload.showFooter;
        },
        setBandRow(state,action){
            state.bandRow = action.payload.bandRow;
        },
        setBandColumn(state,action){
            state.bandColumn = action.payload.bandColumn;
        },
        setHighlightFirstColumn(state,action){
            state.highlightFirstColumn = action.payload.highlightFirstColumn;
        },
        setHighlightLastColumn(state,action){
            state.highlightLastColumn = action.payload.highlightLastColumn;
        },
        setFilterButtonVisible(state,action){
            state.filterButtonVisible = action.payload.filterButtonVisible;
        },
        setFooterDropDownList(state,action){
            state.footerDropDownList = action.payload.footerDropDownList;
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
    setBandRow,
    setBandColumn,
    setHighlightFirstColumn,
    setHighlightLastColumn,
    setFilterButtonVisible,
    setFooterDropDownList,
} = tableDesignSlice.actions;
export default tableDesignSlice.reducer;
