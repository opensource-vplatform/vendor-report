import { createSlice } from '@reduxjs/toolkit';

export const appSlice = createSlice({
    name: 'appSlice',
    initialState: {
        spread: null
    },
    reducers: {
        setSpread(state, action) {
            state.spread = action.payload.spread;
        },
    },
});
export const { setSpread } = appSlice.actions;
export default appSlice.reducer;
