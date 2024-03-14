import { createSlice } from '@reduxjs/toolkit';

export const navSlice = createSlice({
    name: 'layoutSlice',
    initialState: {
        active: null,
        //方向
        orientation: null,
        //缩放类型
        scaleType: null,
        //缩放：页高
        fitPagesTall: null,
        //缩放：页宽
        fitPagesWide: null,
        //缩放比例
        zoomFactor: null,
        //打印质量
        printQuality: null,
        //起始页码
        firstPageNumber: null,
        //纸张大小
        paperKind: null,
        //页边距
        margin: null,
        //页眉和页脚
        headerAndFooter: null,
    },
    reducers: {
        /**
         * 设置激活页签
         * @param {*} state
         * @param {*} action
         */
        setActive(state, action) {
            if (state.active != action.payload) {
                state.active = action.payload;
            }
        },
        /**
         * 设置信息
         * @param {*} state
         * @param {*} action
         */
        setInfo(state, action) {
            Object.assign(state, action.payload);
        },

        setOrientation(state, action) {
            state.orientation = action.payload;
        },

        setScaleType(state, action) {
            state.scaleType = action.payload;
        },

        setFitPagesWide(state, action) {
            state.fitPagesWide = action.payload;
        },

        setFitPagesTall(state, action) {
            state.fitPagesTall = action.payload;
        },

        setZoomFactor(state, action) {
            state.zoomFactor = action.payload;
        },

        setPrintQuality(state, action) {
            state.printQuality = action.payload;
        },

        setFirstPageNumber(state, action) {
            state.firstPageNumber = action.payload;
        },

        setPaperKind(state, action) {
            state.paperKind = action.payload;
        },

        setMargin(state, action) {
            state.margin = action.payload;
        },
        setHeaderAndFooter(state, action) {
            state.headerAndFooter = action.payload;
        },
    },
});
export const {
    setActive,
    setInfo,
    setOrientation,
    setScaleType,
    setZoomFactor,
    setFitPagesWide,
    setFitPagesTall,
    setPrintQuality,
    setFirstPageNumber,
    setPaperKind,
    setMargin,
    setHeaderAndFooter,
} = navSlice.actions;
export default navSlice.reducer;
