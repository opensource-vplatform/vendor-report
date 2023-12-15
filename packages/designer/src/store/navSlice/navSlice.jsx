import { createSlice } from '@reduxjs/toolkit';

export const navSlice = createSlice({
    name: 'navSlice',
    initialState: {
        hideCodes: ['table'],
        tableName: null,
        active: null,
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
            if(index!=-1){
                hideCodes.splice(index,1);
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
            if(index==-1){
                hideCodes.push(code);
            }
        },
        /**
         * 设置激活页签
         * @param {*} state
         * @param {*} action
         */
        setActive(state, action) {
            if(state.active != action.payload.code){
                state.active = action.payload.code;
            }
        },
        /**
         * 设置表格名称
         * @param {} state 
         * @param {*} action 
         */
        setTableName(state, action){
            state.tableName = action.payload.tableName;
        }
    },
});
export const { setSpread, showTab, hideTab, setActive,setTableName } = navSlice.actions;
export default navSlice.reducer;
