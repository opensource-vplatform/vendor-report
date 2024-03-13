import { createSlice } from '@reduxjs/toolkit';

import { setSpread } from '../appSlice/appSlice';

export const fontSlice = createSlice({
    name: 'fontSlice',
    initialState: {
        spread: null,
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
        setHAlign(state, action) {
            state.hAlign = action.payload.hAlign;
        },
        setVAlign(state, action) {
            state.vAlign = action.payload.vAlign;
        },
        setWordWrap(state, action) {
            state.wordWrap = action.payload.wordWrap;
        },
        setTextOrientation(state, action) {
            state.isVerticalText = action.payload.isVerticalText;
            state.textOrientation = action.payload.textOrientation;
        },
        setFontFamily(state, action) {
            state.fontFamily = action.payload.fontFamily;
        },
        setFontStyle(state, action) {
            state.fontStyle = action.payload.fontStyle;
        },
        setFontWeight(state, action) {
            state.fontWeight = action.payload.fontWeight;
        },
        setFontSize(state, action) {
            state.fontSize = action.payload.fontSize;
        },
        setTextDecoration(state, action) {
            state.textDecoration = action.payload.textDecoration;
        },
        setBackColor(state, action) {
            state.backColor = action.payload.backColor;
        },
        setForeColor(state, action) {
            state.foreColor = action.payload.foreColor;
        },
        setFontStyles(state, action) {
            const styles = action.payload.styles;
            if (styles) {
                Object.assign(state, styles);
            }
        },
        setIsStrickoutLine(state, action) {
            state.isStrickoutLine = action.payload.isStrickoutLine;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(setSpread, (state, action) => {
            state.spread = action.payload.spread;
        });
    },
});
export const {
    setFontWeight,
    setFontStyles,
    setFontStyle,
    setFontSize,
    setHAlign,
    setVAlign,
    setWordWrap,
    setTextOrientation,
    setFontFamily,
    setTextDecoration,
    setBackColor,
    setForeColor,
    setIsStrickoutLine,
} = fontSlice.actions;
export default fontSlice.reducer;
