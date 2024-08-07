import { createSlice } from '@reduxjs/toolkit';

export const navSlice = createSlice({
    name: 'layoutSlice',
    initialState: {
        active: null,
        //显示编辑器
        editorVisible:false,
        //显示编辑器原因
        editorVisibleReason: null,
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
        //网格线
        showGridLine:null,
        //行列标题
        showHeader:null,
        //单色打印
        blackAndWhite:null,
        //打印顺序
        pageOrder:null,
        //显示边框
        showBorder:null,
        //开始行
        rowStart:-1,
        //结束行
        rowEnd: -1,
        //开始列
        columnStart: -1,
        //结束列
        columnEnd: -1,
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
         * 设置编辑器显示状态
         * @param {*} state 
         * @param {*} param1 
         */
        setEditorVisible(state,{payload}){
            state.editorVisible = payload;
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
        setShowGridLine(state, action) {
            state.showGridLine = action.payload;
        },
        setShowHeader(state, action) {
            state.showHeader = action.payload;
        },

        setBlackAndWhite(state, action) {
            state.blackAndWhite = action.payload;
        },
        
        setPageOrder(state, action) {
            state.pageOrder = action.payload;
        },

        setShowBorder(state, action) {
            state.showBorder = action.payload;
        },
        
        setArea(state,{payload}){
            Object.assign(state,payload);
        }
    },
});
export const {
    setActive,
    setEditorVisible,
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
    setShowGridLine,
    setShowHeader,
    setBlackAndWhite,
    setPageOrder,
    setShowBorder,
    setArea,
} = navSlice.actions;
export default navSlice.reducer;
