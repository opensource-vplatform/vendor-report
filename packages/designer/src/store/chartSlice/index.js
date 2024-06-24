import { createSlice } from '@reduxjs/toolkit';

export const chartSlice = createSlice({
    name: 'chartSlice',
    initialState: {
        type: 'bar',
        config: {},
    },
    reducers: {
        setType(state, {payload}){
            state.type = payload;
        },
        setConfig(state,{payload}){
            state.config = payload;
        },
    },
});
export const {
    setType,
    setConfig,
} = chartSlice.actions;
export default chartSlice.reducer;
