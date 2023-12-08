import { createSlice } from '@reduxjs/toolkit';

import { parseFont } from '../../utils/fontUtil';
import { setSpread } from '../appSlice/appSlice';

export const fontSlice = createSlice({
    name: 'viewSlice',
    initialState: {
        spread: null,
        showColumnHeader: true,
        showRowHeader: true,
        showHideHGridLine: true,
        showHideVGridLine: true,
        showHide
    },
    reducers: {
        toggleFontStyle(state) {
            state.fontStyle = state.fontStyle === 'normal' ? 'italic' : 'normal'
        },
        toggleFontWeight(state) {
            state.fontWeight = state.fontWeight === 'normal' ? 'bold' : 'normal'
        },
        toggleFont(state,action) {
            //切换状态为布尔值的属性
            const hasOwnProperty = Object.prototype.hasOwnProperty
            if (Array.isArray(action.payload)) {
                action.payload.forEach(function(key) {
                    if (hasOwnProperty.call(state,key)) {
                        state[key] = !state[key]
                    }
                })
            } else {
                if (hasOwnProperty.call(state,action.payload)) {
                    state[action.payload] = !state[action.payload]
                }
            }
        },
        updateFont(state, action) {
            const font = action.payload.font
            Object.entries(font).forEach(function([key, value]) {
                state[key] = value
            })
        },
        resetCellFont(state) {
            //切换单元格会重置状态
            Object.assign(state, parseFont(state.spread))
        }
    },
    extraReducers: (builder) => {
        builder.addCase(setSpread, (state, action) => {
            state.spread = action.payload.spread
        });
    },
})
export const { toggleFontWeight, resetCellFont, toggleFontStyle, updateFont,toggleFont } = fontSlice.actions
export default fontSlice.reducer