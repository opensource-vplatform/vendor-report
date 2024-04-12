import { arrayMoveMutable } from 'array-move';

import { createSlice } from '@reduxjs/toolkit';

export const wizardSlice = createSlice({
    name: 'wizardSlice',
    initialState: {
        groups: [],
        sumColumns: [],
        rowMerge: true,
        columnMerge: false,
        template: {},
        currentSheetIsTemplate: false,
        isEdit: false,
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
        save(state, { payload }) {
            const { datas, code } = payload;
            const result = Array.isArray(state[code]) ? [...state[code]] : [];
            const isExist = result.some(function (res) {
                return res.id === datas.id;
            });
            if (!isExist) {
                result.push({ ...datas });
            }
            state[code] = result;
        },
        sort(state, { payload }) {
            const { oldIndex, newIndex, code } = payload;
            const newDatas = [...(state?.[code] || [])];
            arrayMoveMutable(newDatas, oldIndex, newIndex);
            state[code] = newDatas;
        },
        remove(state, { payload }) {
            const { id, code } = payload;
            state[code] = state[code].filter(({ id: _id }) => _id !== id);
        },
        clear(state, { payload }) {
            const { code } = payload;
            state[code] = [];
        },
        toggleBooleanValue(state, { payload }) {
            const { code, value } = payload;
            if (typeof value === 'boolean') {
                state[code] = value;
            } else {
                state[code] = !state[code];
            }
        },
        addTemplate(state, { payload }) {
            const { info, templateName } = payload;

            state.template[templateName] = info;
        },
        updateTemplateName(state, { payload }) {
            const { oldName, newName } = payload;
            if (state.template[oldName] && newName) {
                state.template[newName] = state.template[oldName];
                delete state.template[oldName];
            }

            if (oldName && !newName && state.template[oldName]) {
                delete state.template[oldName];
            }
        },
        initWizardSlice(state, { payload }) {
            let { wizardSlice } = payload;
            //从配置项json还原仓库数据
            if (wizardSlice && typeof wizardSlice === 'object') {
                Object.entries(wizardSlice).forEach(([key, value]) => {
                    state[key] = value;
                });
            }
        },
    },
});
export const {
    saveGroups,
    sortGroups,
    removeGroup,
    clearGroups,
    save,
    sort,
    clear,
    remove,
    toggleBooleanValue,
    updateTemplateName,
    addTemplate,
    initWizardSlice,
} = wizardSlice.actions;
export default wizardSlice.reducer;
