import { createSlice } from '@reduxjs/toolkit';

export const appSlice = createSlice({
    name: 'appSlice',
    initialState: {
        spread: null,
        mode: 'edit',
        waitMsg: null,
        errorMsg: null,
    },
    reducers: {
        setSpread(state, action) {
            state.spread = action.payload.spread;
        },
        setMode(state, action) {
            state.mode = action.payload.mode;
        },
        setWaitMsg(state, action) {
            state.waitMsg = action.payload.message;
        },
        setErrorMsg(state, action) {
            state.errorMsg = action.payload.message;
        },
    },
});
export const { setSpread, setMode, setWaitMsg, setErrorMsg } = appSlice.actions;
export default appSlice.reducer;
