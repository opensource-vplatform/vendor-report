import { configureStore } from '@reduxjs/toolkit';

import appSlice from './appSlice/appSlice';
import borderSlice from './borderSlice/borderSlice';
import cellSettingSlice from './cellSettingSlice';
import chartSlice from './chartSlice';
import conditionStyleSlice from './conditionStyleSlice';
import datasourceSlice from './datasourceSlice/datasourceSlice';
import formulaEditorSlice from './formulaEditorSlice/formulaEditorSlice';
import layoutSlice from './layoutSlice/layoutSlice';
import navSlice from './navSlice/navSlice';
import persistingDataSlice from './persistingDataSlice';
import rangeSlice from './rangeSlice';
import workbookSettingSlice from './settingSlice/workbookSettingSlice';
import worksheetSettingSlice from './settingSlice/worksheetSettingSlice';
import sparklineSlice from './sparklineSlice';
import styleSlice from './styleSlice';
import tableDesignSlice from './tableDesignSlice/tableDesignSlice';
import viewSlice from './viewSlice/viewSlice';
import wizardSlice from './wizardSlice';

//不可序列化的值存储在redux中控制台会报错，需添加忽略动作和路径
const serializableCheck = {
  // Ignore these action types
  //ignoredActions: ['appReducer/setSpread'],
  // Ignore these field paths in all actions
  ignoredActionPaths: [
    'meta.arg',
    'payload.spread',
    'payload.styleName',
    'payload.rules',
  ],
  // Ignore these paths in the state
  ignoredPaths: [
    'appSlice.spread',
    'viewSlice.spread',
    'tableDesignSlice.spread',
    'tableDesignSlice.styleName',
    'borderSlice.spread',
    'workbookSettingSlice.spread',
    'worksheetSettingSlice.spread',
    'conditionStyleSlice.ruleManagerConfig',
  ],
};

export default configureStore({
  reducer: {
    appSlice,
    borderSlice,
    datasourceSlice,
    viewSlice,
    navSlice,
    tableDesignSlice,
    workbookSettingSlice,
    worksheetSettingSlice,
    formulaEditorSlice,
    wizardSlice,
    layoutSlice,
    conditionStyleSlice,
    rangeSlice,
    cellSettingSlice,
    sparklineSlice,
    styleSlice,
    persistingDataSlice,
    chartSlice,
  },
  middleware: function (getDefaultMiddleware) {
    return getDefaultMiddleware({ serializableCheck });
  },
});
