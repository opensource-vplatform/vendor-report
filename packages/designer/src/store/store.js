import { configureStore } from '@reduxjs/toolkit';

import appSlice from './appSlice/appSlice';
import borderSlice from './borderSlice/borderSlice';
import fontCellSettingSlice from './cellSettingSlice/FontCellSettingSlice';
import datasourceSlice from './datasourceSlice/datasourceSlice';
import fontSlice from './fontSlice/fontSlice';
import formulaEditorSlice from './formulaEditorSlice/formulaEditorSlice';
import layoutSlice from './layoutSlice/layoutSlice';
import navSlice from './navSlice/navSlice';
import workbookSettingSlice from './settingSlice/workbookSettingSlice';
import worksheetSettingSlice from './settingSlice/worksheetSettingSlice';
import tableDesignSlice from './tableDesignSlice/tableDesignSlice';
import viewSlice from './viewSlice/viewSlice';
import wizardSlice from './wizardSlice';

//不可序列化的值存储在redux中控制台会报错，需添加忽略动作和路径
const serializableCheck = {
    // Ignore these action types
    //ignoredActions: ['appReducer/setSpread'],
    // Ignore these field paths in all actions
    ignoredActionPaths: ['meta.arg', 'payload.spread','payload.styleName'],
    // Ignore these paths in the state
    ignoredPaths: [
        'appSlice.spread',
        'fontSlice.spread',
        'viewSlice.spread',
        'tableDesignSlice.spread',
        'tableDesignSlice.styleName',
        'borderSlice.spread',
        'fontCellSettingSlice.spread',
        'workbookSettingSlice.spread',
        'worksheetSettingSlice.spread',
    ],
};

export default configureStore({
    reducer: {
        appSlice,
        borderSlice,
        fontSlice,
        datasourceSlice,
        viewSlice,
        navSlice,
        tableDesignSlice,
        fontCellSettingSlice,
        workbookSettingSlice,
        worksheetSettingSlice,
        formulaEditorSlice,
        wizardSlice,
        layoutSlice,
    },
    middleware: function (getDefaultMiddleware) {
        return getDefaultMiddleware({ serializableCheck });
    },
});
