import { createSlice } from '@reduxjs/toolkit';

export const conditionStyleSlice = createSlice({
    name: 'layoutSlice',
    initialState: {
        //是否显示新增规则
        showEditor: false,
        //新增规则配置
        editorConfig:{
            _type: 'scaleRule',
            ruleType: 'twoScaleRule',
            minType: 'lowestValue',
            minValue: null,
            minColor:'rgb(255,0,0)',
            midType: null,
            midValue: null,
            midColor: null,
            maxType: 'highestValue',
            maxValue: null,
            maxColor:'rgb(0,136,0)'
        },
        //新增规则类型
        editorType: 'formatOnValue',
        //新增规则格式样式
        ruleType: '',
        textCompareVisible: false,
        textCompareConfig: {
            title: '',
            desc: '',
            ruleType: '',
            operator: '',
            range:'',
            style:'lightRedFill_DarkRedText'
        },
        textBetweenVisible: false,
        textBetweenConfig: {
            title: '',
            desc: '',
            ruleType: '',
            operator: '',
            range:'',
            range1:'',
            style:'lightRedFill_DarkRedText',
        },
        numberCompareVisible: false,
        numberCompareConfig: {
            title: '',
            desc: '',
            ruleType: '',
            operator: '',
            range:'',
            style:'lightRedFill_DarkRedText',
        },
        numberApplyVisible: false,
        numberApplyConfig: {
            title: '',
            ruleType: '',
            operator: '',
            desc: '',
            secondary: '',
            style:'lightRedFill_DarkRedText',
        },
        dateCompareVisible: false,
        dateCompareConfig: {
            title: '',
            desc: '',
            style:'lightRedFill_DarkRedText',
        },
        duplicateCompareVisible: false,
        duplicateCompareConfig: { title: '', desc: '' },
    },
    reducers: {
        setShowEditor(state, { payload }) {
            state.showEditor = payload;
        },
        setEditorType(state, { payload }) {
            state.editorType = payload;
        },
        setRuleType(state, { payload }) {
            state.ruleType = payload;
        },
        setEditorConfig(state, { payload }) {
            state.editorConfig = payload;
        },
        setTextCompareVisible(state, { payload }) {
            state.textCompareVisible = payload;
        },
        setTextCompareConfig(state, { payload }) {
            state.textCompareConfig = payload;
        },
        setTextBetweenVisible(state, { payload }) {
            state.textBetweenVisible = payload;
        },
        setTextBetweenConfig(state, { payload }) {
            state.textBetweenConfig = payload;
        },
        setNumberCompareVisible(state, { payload }) {
            state.numberCompareVisible = payload;
        },
        setNumberCompareConfig(state, { payload }) {
            state.numberCompareConfig = payload;
        },
        setNumberApplyVisible(state, { payload }) {
            state.numberApplyVisible = payload;
        },
        setNumberApplyConfig(state, { payload }) {
            state.numberApplyConfig = payload;
        },
        setDateCompareVisible(state, { payload }) {
            state.dateCompareVisible = payload;
        },
        setDateCompareConfig(state, { payload }) {
            state.dateCompareConfig = payload;
        },
        setDuplicateCompareVisible(state, { payload }) {
            state.duplicateCompareVisible = payload;
        },
        setDuplicateCompareConfig(state, { payload }) {
            state.duplicateCompareConfig = payload;
        },
    },
});
export const {
    setRuleType,
    setEditorType,
    setEditorConfig,
    setTextCompareConfig,
    setDateCompareVisible,
    setDateCompareConfig,
    setDuplicateCompareVisible,
    setDuplicateCompareConfig,
    setNumberApplyVisible,
    setNumberApplyConfig,
    setNumberCompareVisible,
    setNumberCompareConfig,
    setTextCompareVisible,
    setTextBetweenVisible,
    setTextBetweenConfig,
    setShowEditor,
} = conditionStyleSlice.actions;
export default conditionStyleSlice.reducer;
