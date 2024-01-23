import { arrayMoveMutable } from 'array-move';

import { createSlice } from '@reduxjs/toolkit';

export const wizardSlice = createSlice({
    name: 'wizardSlice',
    initialState: {
        groups: [],
    },
    reducers: {
        saveGroups(state, { payload }) {
            const { newGroup } = payload;
            const result = [...state.groups];
            const isExist = result.some(function (res) {
                return res.id === newGroup.id;
            });
            if (!isExist) {
                result.push({ ...newGroup });
            }
            state.groups = result;
        },
        sortGroups(state, { payload }) {
            const { oldIndex, newIndex } = payload;
            const newGroups = [...state.groups];
            arrayMoveMutable(newGroups, oldIndex, newIndex);
            state.groups = newGroups;
        },
        removeGroup(state, { payload }) {
            const { groupId } = payload;
            state.groups = state.groups.filter(function (group) {
                return group?.id !== groupId;
            });
        },
        clearGroups(state, { payload }) {
            state.groups = [];
        },
    },
});
export const { saveGroups, sortGroups, removeGroup, clearGroups } =
    wizardSlice.actions;
export default wizardSlice.reducer;
