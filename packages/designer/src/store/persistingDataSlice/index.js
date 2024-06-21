import { createSlice } from '@reduxjs/toolkit';

/**
 * 需要持久化保存的数据
 */
export const slice = createSlice({
  name: 'persistingDataSlice',
  initialState: {
    //保存sheet相关的数据
    sheets: {
      /*
            sheetId:{
                queryPanelSettings:查询面板配置
            }
        */
    },
  },
  reducers: {
    saveQueryPanelSettings(state, { payload }) {
      const { sheetId, datas } = payload;
      if (!state.sheets[sheetId]) {
        state.sheets[sheetId] = {};
      }
      state.sheets[sheetId].queryPanelSettings = datas;
    },
  },
});
export const { saveQueryPanelSettings } = slice.actions;
export default slice.reducer;
