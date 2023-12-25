import { createSlice } from '@reduxjs/toolkit';

import { setSpread } from '../appSlice/appSlice';

export const borderSlice = createSlice({
    name: 'borderSlice',
    initialState: {
        spread: null,
        //边框颜色
        borderColor: 'black',
        tabValueCellSetting: '数字',
        isOpenCellSetting: false,
    },
    reducers: {
        setBorderColor(state, action) {
            const color = action.payload.color;
            state.borderColor = color;
        },
        setTabValueCellSetting(state, action) {
            const tabValue = action.payload;
            state.tabValueCellSetting = tabValue;
        },
        setIsOpenCellSetting(state, action) {
            const isOpen = action.payload;
            state.isOpenCellSetting = isOpen;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(setSpread, (state, action) => {
            state.spread = action.payload.spread;
        });
    },
});
export const { setBorderColor, setTabValueCellSetting, setIsOpenCellSetting } =
    borderSlice.actions;
export default borderSlice.reducer;
