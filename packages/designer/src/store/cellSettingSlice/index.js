import { createSlice } from '@reduxjs/toolkit';

export const cellSettingSlice = createSlice({
    name: 'cellSettingSlice',
    initialState: {
        visible: false,
        active:'number',
        numberSetting:{
            category: 'general',
            //小数位数
            decimalPlacesValue:2,
            //是否使用千分符
            useThousandSeparator:false,
            //货币符号
            currencySymbol:'',
            //格式
            format:'number1',
            //区域
            locale:'zh_cn',
        },
        alignSetting:{
            hAlign:3,//水平对齐：常规
            vAlign:0,//垂直对齐：靠上
            indentValue:0,//缩进
            isWrapText:false,//自动换行
            isShrinkToFit:false,//缩小字体填充
            isMergeCells:false,//合并单元格
            isShowEllipsis:false,//显示省略号
            startDeg:0,//度
        },
        fontSetting:{
            fontFamily:'Calibri',//字体
            fontWeight:'',
            fontStyle:'',
            fontSize:11,
            textDecoration:'',
            isStrickoutLine:false,
            fontColor:'',
        }
    },
    reducers: {
        setActive(state, {payload}){
            state.active = payload;
        },
        setVisible(state, {payload}){
            state.visible = payload;
        },
        setNumberSetting(state, {payload}){
            state.numberSetting = payload;
        },
        setAlignSetting(state, {payload}){
            state.alignSetting = payload;
        },
        setFontSetting(state, {payload}){
            state.fontSetting = payload;
        }
    },
});
export const {
    setActive,
    setVisible,
    setNumberSetting,
    setAlignSetting,
    setFontSetting,
} = cellSettingSlice.actions;
export default cellSettingSlice.reducer;
