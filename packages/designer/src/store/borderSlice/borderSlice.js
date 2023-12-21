import { createSlice } from '@reduxjs/toolkit';

import { setSpread } from '../appSlice/appSlice';

export const borderSlice = createSlice({
    name: 'borderSlice',
    initialState: {
        spread: null,
        //边框颜色
        borderColor: 'black',
    },
    reducers: {
        setborderColor(state, action) {
            const color = action.payload.color;
            state.borderColor = color;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(setSpread, (state, action) => {
            state.spread = action.payload.spread;
        });
    },
});
export const { setborderColor } = borderSlice.actions;
export default borderSlice.reducer;
