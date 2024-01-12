import { createSlice } from '@reduxjs/toolkit';

export const formulaSlice = createSlice({
    name: 'formulaSlice',
    initialState: {
        errorList: [],
        showErrorDetail:false,
        canGoBack:false,
        canGoForward:false,
    },
    reducers: {
        
    }
});
export const {
} = formulaSlice.actions;
export default formulaSlice.reducer;
