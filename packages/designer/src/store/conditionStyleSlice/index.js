import { createSlice } from '@reduxjs/toolkit';

export const conditionStyleSlice = createSlice({
    name: 'layoutSlice',
    initialState: {
        ruleType: '',
        showEditor: false,
        editorType: '',
        styleType: '',
        editorConfig: false,
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
        setRuleType(state, { payload }) {
            state.ruleType = payload;
        },
        setShowEditor(state, { payload }) {
            state.showEditor = payload;
        },
        setEditorType(state, { payload }) {
            state.editorType = payload;
        },
        setStyleType(state, { payload }) {
            state.styleType = payload;
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
    setStyleType,
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
    setRuleType,
    setShowEditor,
} = conditionStyleSlice.actions;
export default conditionStyleSlice.reducer;
