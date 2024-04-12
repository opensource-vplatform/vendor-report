import { createSlice } from '@reduxjs/toolkit';

export const navSlice = createSlice({
    name: 'navSlice',
    initialState: {
        hideCodes: ['table', 'sparklines'],
        tableName: null,
        active: null,
        reportDesignWizard: false,
        showTemplate: false,
    },
    reducers: {
        /**
         * 显示页签页
         * @param {*} state
         * @param {*} action
         */
        showTab(state, action) {
            const code = action.payload.code;
            const hideCodes = state.hideCodes;
            const index = hideCodes.indexOf(code);
            if (index != -1) {
                hideCodes.splice(index, 1);
                state.hideCodes = [...hideCodes];
            }
        },
        /**
         * 隐藏页签页
         * @param {*} state
         * @param {*} action
         */
        hideTab(state, action) {
            const code = action.payload.code;
            const hideCodes = state.hideCodes;
            const index = hideCodes.indexOf(code);
            if (index == -1) {
                hideCodes.push(code);
                state.hideCodes = [...hideCodes];
            }
        },
        /**
         * 设置激活页签
         * @param {*} state
         * @param {*} action
         */
        setActive(state, action) {
            if (state.active != action.payload.code) {
                state.active = action.payload.code;
            }
        },
        /**
         * 设置表格名称
         * @param {} state
         * @param {*} action
         */
        setTableName(state, action) {
            state.tableName = action.payload.tableName;
        },
        /**
         * 切换报表设计向导显隐藏
         * @param {} state
         * @param {*} action
         */
        toggleReportDesignWizard(state, action) {
            state.reportDesignWizard = !state.reportDesignWizard;
        },
        toggleBooleanValue(state, aciton) {
            const { key, value } = aciton.payload || {};
            if (typeof value === 'boolean') {
                state[key] = value;
                return;
            }
            state[key] = !state[key];
        },
    },
});
export const {
    setSpread,
    showTab,
    hideTab,
    setActive,
    setTableName,
    toggleReportDesignWizard,
    toggleBooleanValue,
} = navSlice.actions;
export default navSlice.reducer;
