import { createSlice } from '@reduxjs/toolkit';

export const appSlice = createSlice({
    name: 'appSlice',
    initialState: {
        spread: null,
        mode: 'edit'
    },
    reducers: {
        setSpread(state, action) {
            state.spread = action.payload.spread;
        },
        setMode(state, action){
            state.mode = action.payload.mode;
        }
    },
});
export const { setSpread,setMode } = appSlice.actions;
export default appSlice.reducer;
