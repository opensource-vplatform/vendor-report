import { createSlice } from '@reduxjs/toolkit';

import { setSpread } from '../appSlice/appSlice';

export const workbookSettingSlice = createSlice({
    name: 'workbookSettingSlice',
    initialState: {
        spread: null,
        isOpenforWorkbookSetting: false,
        active: null,
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
    },
    extraReducers: (builder) => {
        builder.addCase(setSpread, (state, action) => {
            state.spread = action.payload.spread;
        });
    },
});
export const { setIsOpenforWorkbookSetting, setActive } =
    workbookSettingSlice.actions;
export default workbookSettingSlice.reducer;
