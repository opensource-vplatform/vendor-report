import { createSlice } from '@reduxjs/toolkit';

import { setSpread } from '../appSlice/appSlice';

export const fontCellSettingSlice = createSlice({
    name: 'fontCellSettingSlice',
    initialState: {
        spread: null,
        visible: false,
        // selectedFontFamily: '微软雅黑',
        // selectedFontSize: 11,
        // selectedFontStyle: '常规',
        // selectedUnderlineStyle: '无',
        selectedFontColor: 'black',
    },
    reducers: {
        
        setVisible(state, {payload}){
            state.visible = payload;
        },
        // setSelectedFontFamily(state, action) {
        //     state.selectedFontFamily = action.payload.selectedFontFamily;
        // },
        // setSelectedFontSize(state, action) {
        //     state.selectedFontSize = action.payload.selectedFontSize;
        // },
        // setSelectedFontStyle(state, action) {
        //     state.selectedFontStyle = action.payload.selectedFontStyle;
        // },
        // setSelectedUnderlineStyle(state, action) {
        //     state.selectedUnderlineStyle =
        //         action.payload.selectedUnderlineStyle;
        // },
        setSelectedFontColor(state, action) {
            state.selectedFontColor = action.payload.selectedFontColor;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(setSpread, (state, action) => {
            state.spread = action.payload.spread;
        });
    },
});
export const {
    setSelectedFontFamily,
    setSelectedFontSize,
    setSelectedFontStyle,
    setSelectedUnderlineStyle,
    setSelectedFontColor,
} = fontCellSettingSlice.actions;
export default fontCellSettingSlice.reducer;
