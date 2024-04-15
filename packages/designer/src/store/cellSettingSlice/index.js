import { createSlice } from '@reduxjs/toolkit';
import {
  getAlignSetting,
  getBorderSetting,
  getFillSetting,
  getFontSetting,
  getNumberSetting,
  numberSettingToFormat,
} from '@utils/cellSettingUtil';
import { deepClone } from '@utils/objectUtil';

export const cellSettingSlice = createSlice({
    name: 'cellSettingSlice',
    initialState: {
        hideCodes: [],
        callbackId: null,
        visible: false,
        active: 'number',
        //是否多单元格选择
        isSingleCell: false,
        //是否绑定选中区域
        bindRange: true,
        setting: {},
        numberSetting: getNumberSetting(),
        alignSetting: getAlignSetting(),
        fontSetting: getFontSetting(),
        borderSetting: getBorderSetting(),
        fillSetting: getFillSetting(),
    },
    reducers: {
        hideTab(state, { payload }) {
            const hideCodes = state.hideCodes;
            if (hideCodes.indexOf(payload) == -1) {
                hideCodes.push(payload);
                state.hideCodes = [...hideCodes];
            }
        },
        setCallbackId(state, { payload }) {
            state.callbackId = payload;
        },
        setActive(state, { payload }) {
            state.active = payload;
        },
        setVisible(state, { payload }) {
            state.visible = payload;
        },
        setSetting(state, { payload }) {
            state.setting = payload;
        },
        setNumberSetting(state, { payload }) {
            const formatter = numberSettingToFormat(payload);
            state.numberSetting = { ...payload, formatter };
        },
        setAlignSetting(state, { payload }) {
            state.alignSetting = payload;
        },
        setFontSetting(state, { payload }) {
            state.fontSetting = payload;
        },
        setBorderSetting(state, { payload }) {
            state.borderSetting = payload;
        },
        setFillSetting(state, { payload }) {
            state.fillSetting = payload;
        },
        setSingleCell(state, { payload }) {
            state.isSingleCell = payload;
        },
        setBindRange(state, { payload }) {
            state.bindRange = payload;
        },
        reset(state) {
            state.hideCodes = [];
            state.setting = {};
            state.numberSetting = deepClone(getNumberSetting());
            state.alignSetting = deepClone(getAlignSetting());
            state.fontSetting = deepClone(getFontSetting());
            state.borderSetting = deepClone(getBorderSetting());
            state.fillSetting = deepClone(getFillSetting());
        },
    },
});
export const {
    hideTab,
    setCallbackId,
    setActive,
    setVisible,
    setNumberSetting,
    setAlignSetting,
    setFontSetting,
    setSetting,
    setBorderSetting,
    setFillSetting,
    setSingleCell,
    setBindRange,
    reset,
} = cellSettingSlice.actions;
export default cellSettingSlice.reducer;
