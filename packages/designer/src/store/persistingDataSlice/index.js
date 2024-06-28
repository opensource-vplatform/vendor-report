import { createSlice } from '@reduxjs/toolkit';

/**
 * 需要持久化保存的数据
 */
export const slice = createSlice({
  name: 'persistingDataSlice',
  initialState: {
    //保存sheet相关的数据
    sheets: {
      /*   queryPanelSettings:查询面板配置,
            sheetId:{
               //其它
            }
        */
    },
  },
  reducers: {
    saveQueryPanelSettings(state, { payload }) {
      const { datas } = payload;
      state.sheets.queryPanelSettings = datas;
    },
    initSlice(state, { payload }) {
      let { slice } = payload;
      //从配置项json还原仓库数据
      if (slice && typeof slice === 'object') {
        Object.entries(slice).forEach(([key, value]) => {
          state[key] = value;
        });
      }
    },
  },
});
export const { saveQueryPanelSettings, initSlice } = slice.actions;
export default slice.reducer;
