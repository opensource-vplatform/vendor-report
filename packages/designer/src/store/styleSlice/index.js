import { createSlice } from '@reduxjs/toolkit';

export const fontSlice = createSlice({
    name: 'styleSlice',
    initialState: {
        fontFamily: null,
        fontSize: null,
        fontStyle: null,
        fontWeight: null,
        fontVariant: null,
        lineHeight: null,
        textDecoration: null,
        vAlign: null,
        hAlign: null,
        isVerticalText: false,
        wordWrap: false,
        backColor: null,
        foreColor: null,
        //文字方向
        textOrientation: undefined,
        //文字竖向排列
        isVerticalText: undefined,
        isStrickoutLine: null,
    },
    reducers: {
        setStyle(state, action) {
            const styles = action.payload;
            if (styles) {
                Object.assign(state, styles);
            }
        },
    },
});
export const { setStyle } = fontSlice.actions;
export default fontSlice.reducer;
