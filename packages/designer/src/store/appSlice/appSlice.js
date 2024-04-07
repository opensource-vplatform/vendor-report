import { createSlice } from '@reduxjs/toolkit';

export const appSlice = createSlice({
    name: 'appSlice',
    initialState: {
        spread: null,
        mode: 'edit',
        waitMsg: null,
        errorMsg: null,
        navStyle: 'normal',
        rangeSelect: {
            //范围选择器配置
            visible: false,
            range: '',
        },
    },
    reducers: {
        setSpread(state, action) {
            state.spread = action.payload.spread;
            window._spread = action.payload.spread;
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
        setNavStyle(state, action) {
            state.navStyle = action.payload;
        },
        setRangeSelect(state, action) {
            state.rangeSelect = action.payload;
        },
    },
});
export const {
    setRangeSelect,
    setSpread,
    setMode,
    setWaitMsg,
    setErrorMsg,
    setNavStyle,
} = appSlice.actions;
export default appSlice.reducer;
