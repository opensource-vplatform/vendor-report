import { createSlice } from '@reduxjs/toolkit';

export const navSlice = createSlice({
    name: 'navSlice',
    initialState: {
        visible: false,
        hostId: null,
        absoluteReference: false,
        rangeSelectMode: true,
        onCloseHandlerId: '',
        onChangeHandlerId: '',
        range: '',
        selectionType: 'cell',
    },
    reducers: {
        setHostId(state, { payload }) {
            state.hostId = payload;
        },
        setVisible(state, { payload }) {
            state.visible = payload;
        },
        setRange(state, { payload }) {
            state.range = payload;
        },
        setOnCloseHandlerId(state, { payload }) {
            state.onCloseHandlerId = payload;
        },
        setOnChangeHandlerId(state, { payload }) {
            state.onChangeHandlerId = payload;
        },
        setAbsoluteReference(state, { payload }) {
            state.absoluteReference = payload;
        },
        setRangeSelectMode(state, { payload }) {
            state.rangeSelectMode = payload;
        },
        setSelectionType(state, { payload }) {
            state.selectionType = payload;
        },
    },
});
export const {
    setVisible,
    setRange,
    setHostId,
    setAbsoluteReference,
    setOnCloseHandlerId,
    setOnChangeHandlerId,
    setRangeSelectMode,
    setSelectionType,
} = navSlice.actions;
export default navSlice.reducer;
