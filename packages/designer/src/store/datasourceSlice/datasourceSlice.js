import { createSlice } from '@reduxjs/toolkit';

import { findTreeNodeById } from '../../utils/commonUtil.js';

export const datasourceSlice = createSlice({
    name: 'datasourceSlice',
    initialState: {
        ds: {},
        activeDs: {},
        dsList: [
            {
                id: '6589cf29ae694fe1a7a6de70fbceac06',
                value: '',
                type: 'string',
                desc: '必填',
                code: 'name',
                name: '姓名',
                path: '',
            },
            {
                id: '187ee2a13e0748f5b52342929db18325',
                value: '',
                type: 'string',
                desc: '年龄必须年满18岁',
                code: 'age',
                name: '年龄',
                path: '',
            },
            {
                id: 'c623ebe57c374eff9c243b63b3d73027',
                value: '',
                type: 'string',
                desc: '性别',
                code: 'sex',
                name: '性别',
                path: '',
            },
            {
                id: '140a79cc0041403a9aa30898ba858ac5',
                value: '',
                type: 'entity',
                desc: '工作履历',
                code: 'work',
                name: '工作经历',
                path: '',
                children: [
                    {
                        id: 'A',
                        code: 'startDate',
                        name: '开始日期',
                        path: 'work',
                    },
                    {
                        id: 'B',
                        code: 'endDate',
                        name: '结束日期',
                        path: 'work',
                    },
                    {
                        id: 'C',
                        code: 'companyName',
                        name: '公司名称',
                        path: 'work',
                    },
                ],
            },
        ],
    },
    reducers: {
        pushDsList(state, { payload }) {
            const { datas, parentId } = payload;
            let parent = findTreeNodeById(parentId, state.dsList);

            if (parent) {
                if (!Array.isArray(parent.children)) {
                    parent.children = [];
                }
                parent.children.push(datas);
            } else {
                state.dsList.push(datas);
            }
            state.activeDs = datas;
        },
        updateDslist(state, { payload }) {
            const { newData } = payload;
            const { parentId } = newData;
            const parent = findTreeNodeById(parentId, state.dsList);
            const _dsList = parent ? parent.children : state.dsList;
            const index = _dsList.findIndex(({ id }) => id === newData.id);
            if (index >= 0) {
                _dsList.splice(index, 1, newData);
                state.activeDs = newData;
            }
        },
        toggleActiveDs(state, { payload }) {
            const { dataItemId } = payload;
            const _current = findTreeNodeById(dataItemId, state.dsList);
            _current && (state.activeDs = _current);
        },
    },
});
export const { pushDsList, updateDslist, toggleActiveDs } =
    datasourceSlice.actions;
export default datasourceSlice.reducer;
