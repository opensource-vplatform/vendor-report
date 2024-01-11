import { createSlice } from '@reduxjs/toolkit';

import { setSpread } from '../appSlice/appSlice';

export const worksheetSettingSlice = createSlice({
    name: 'worksheetSettingSlice',
    initialState: {
        spread: null,
        isOpenforWorksheetSetting: false,
    },
    reducers: {
        setIsOpenforWorksheetSetting(state, action) {
            state.isOpenforWorksheetSetting = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(setSpread, (state, action) => {
            state.spread = action.payload.spread;
        });
    },
});
export const { setIsOpenforWorksheetSetting } = worksheetSettingSlice.actions;
export default worksheetSettingSlice.reducer;
