import { createSlice } from '@reduxjs/toolkit';

import { parseFont } from '../../utils/fontUtil';
import { setSpread } from '../appSlice/appSlice';

export const fontSlice = createSlice({
    name: 'fontSlice',
    initialState: {
        spread: null,
        fontFamily: null,
        fontSize: null,
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontVariant: 'normal',
        lineHeight: 'normal',
        textDecoration:undefined,
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
        setTextDecoration(state, action){
            state.textDecoration = action.payload.textDecoration;
        },
        setBackColor(state, action){
            state.backColor = action.payload.backColor;
        },
        setForeColor(state, action){
            state.foreColor = action.payload.foreColor;
        },
        parseCellFont(state) {
            //切换单元格会重置状态
            Object.assign(state, parseFont(state.spread));
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
    parseCellFont,
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
} = fontSlice.actions;
export default fontSlice.reducer;
