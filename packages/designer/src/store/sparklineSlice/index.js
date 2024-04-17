import { createSlice } from '@reduxjs/toolkit';
import { getDefaultConfig } from '@utils/sparklineUtil';

export const sparklineSlice = createSlice({
    name: 'sparklineSlice',
    initialState: {
        visible: false,
        callbackId: null,
        config: getDefaultConfig(),
        setting: {},
    },
    reducers: {
        setCallbackId(state, { payload }) {
            state.callbackId = payload;
        },
        setVisible(state, { payload }) {
            state.visible = payload;
        },
        setConfig(state, { payload }) {
            state.config = payload;
        },
        setSetting(state, { payload }) {
            state.setting = payload;
        },
    },
});
export const { setCallbackId, setVisible, setConfig, setSetting } =
    sparklineSlice.actions;
export default sparklineSlice.reducer;
