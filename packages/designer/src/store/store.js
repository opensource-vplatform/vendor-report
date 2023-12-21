import { configureStore } from '@reduxjs/toolkit';

import appSlice from './appSlice/appSlice';
import borderSlice from './borderSlice/borderSlice';
import datasourceSlice from './datasourceSlice/datasourceSlice';
import fontSlice from './fontSlice/fontSlice';
import navSlice from './navSlice/navSlice';
import tableDesignSlice from './tableDesignSlice/tableDesignSlice';
import viewSlice from './viewSlice/viewSlice';

//不可序列化的值存储在redux中控制台会报错，需添加忽略动作和路径
const serializableCheck = {
    // Ignore these action types
    //ignoredActions: ['appReducer/setSpread'],
    // Ignore these field paths in all actions
    ignoredActionPaths: ['meta.arg', 'payload.spread'],
    // Ignore these paths in the state
    ignoredPaths: [
        'appSlice.spread',
        'fontSlice.spread',
        'viewSlice.spread',
        'tableDesignSlice.spread',
        'borderSlice.spread',
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
    },
    middleware(getDefaultMiddleware) {
        return getDefaultMiddleware({ serializableCheck });
    },
});
