import { createSlice } from '@reduxjs/toolkit';

export const chartSlice = createSlice({
  name: 'chartSlice',
  initialState: {
    step: 'choose', //步骤，枚举值：choose(选择图表类型),config（配置图表属性）
    type: 'bar',
    icon: '',
    config: {},
  },
  reducers: {
    setStep(state, { payload }) {
      state.step = payload;
    },
    setType(state, { payload }) {
      state.type = payload;
    },
    setIcon(state, { payload }) {
      state.icon = payload;
    },
    setConfig(state, { payload }) {
      state.config = payload;
    },
  },
});
export const { setStep, setType, setIcon, setConfig } = chartSlice.actions;
export default chartSlice.reducer;
