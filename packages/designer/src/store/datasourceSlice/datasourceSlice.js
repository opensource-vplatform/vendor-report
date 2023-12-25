import { createSlice } from '@reduxjs/toolkit';

import {
    deepCopy,
    findTreeNodeById,
    genValueByType,
} from '../../utils/commonUtil.js';
import { ds } from './data.js';

const test_data_finalDsList = [
    {
        id: '6589cf29ae694fe1a7a6de70fbceac06',
        value: '',
        type: 'table',
        typeName: '文本',
        desc: '必填',
        code: 'name',
        name: '姓名',
    },
    {
        id: '187ee2a13e0748f5b52342929db18325',
        value: '',
        type: 'integer',
        typeName: '整数',
        desc: '年龄必须年满18岁',
        code: 'age',
        name: '年龄',
    },
    {
        id: 'c623ebe57c374eff9c243b63b3d73027',
        value: '',
        type: 'text',
        typeName: '文本',
        desc: '性别',
        code: 'sex',
        name: '性别',
    },
    {
        id: '140a79cc0041403a9aa30898ba858ac5',
        value: '',
        type: 'table',
        typeName: '表',
        desc: '工作履历',
        code: 'work',
        name: '工作经历',
        children: [
            {
                id: 'A001',
                code: 'startDate',
                name: '开始日期',
                type: 'text',
                typeName: '文本',
                parentId: '140a79cc0041403a9aa30898ba858ac5',
            },
            {
                id: 'B001',
                code: 'endDate',
                type: 'text',
                typeName: '文本',
                name: '结束日期',
                parentId: '140a79cc0041403a9aa30898ba858ac5',
            },
            {
                id: 'C001',
                code: 'companyName',
                name: '公司名称',
                type: 'text',
                typeName: '文本',
                parentId: '140a79cc0041403a9aa30898ba858ac5',
            },
            {
                id: 'D001',
                code: 'workingYears',
                name: '工龄',
                type: 'integer',
                typeName: '整数',
                parentId: '140a79cc0041403a9aa30898ba858ac5',
            },
            {
                id: 'E001',
                code: 'averagePay',
                name: '平均工资',
                type: 'decimals',
                typeName: '小数',
                parentId: '140a79cc0041403a9aa30898ba858ac5',
            },
        ],
    },
];

export const datasourceSlice = createSlice({
    name: 'datasourceSlice',
    initialState: {
        ds: {},
        activeDs: {},
        finalDsList: [...ds],
        dsList: [...ds],
        bindInfos: {
            /*  {
                [数据源id]:{
                    [表单实例id]:{
                        [单元格实例Id]：{
                            row:number,
                            col:number,
                            path:string,
                            bindType:table | cell
                            tableName?:string
                            cellInstanceId:string,
                            sheetInstanceId:string
                        }
                    }
                }
            } */
        },
        sheetInfos: {
            /*  [表单实例id]:{
                [单元格实例Id]：{
                    rornerMarkInfo:{
                        row:1,
                        col:1,
                        value:true
                    },
                    ...
                }
            } */
        },
        previewViewDatas: {},
        isShowDatasource: false,
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
            const { newData, isSave = false } = payload;
            const { parentId } = newData;
            const parent = findTreeNodeById(parentId, state.dsList);
            const _dsList = parent ? parent.children : state.dsList;
            const index = _dsList.findIndex(({ id }) => id === newData.id);
            if (index >= 0) {
                _dsList.splice(index, 1, newData);
                state.activeDs = newData;
            }
            if (isSave) {
                state.finalDsList = deepCopy(state.dsList);
            }
        },
        toggleActiveDs(state, { payload }) {
            const { dataItemId } = payload;
            const _current = findTreeNodeById(dataItemId, state.dsList);
            _current && (state.activeDs = _current);
        },
        deleteDsList(state, { payload }) {
            const { itemId } = payload;
            const current = findTreeNodeById(itemId, state.dsList) || {};
            const { parentId } = current;
            const parent = findTreeNodeById(parentId, state.dsList);
            const _dsList = parent ? parent.children : state.dsList;
            const index = _dsList.findIndex(({ id }) => id === itemId);
            if (index >= 0) {
                _dsList.splice(index, 1);
                if (itemId === state?.activeDs?.id || !state?.activeDs?.id) {
                    state.activeDs = {
                        code: '',
                        name: '',
                        desc: '',
                    };
                }
            }
        },
        saveBindInfos(state, { payload }) {
            const {
                id,
                row,
                col,
                path,
                bindType = 'cell',
                tableName,
                cellInstanceId,
                sheetInstanceId,
            } = payload.bindInfos;

            //数据源坐标
            if (!state.bindInfos[id]) {
                state.bindInfos[id] = {};
            }

            //表格坐标
            if (!state.bindInfos[id][sheetInstanceId]) {
                state.bindInfos[id][sheetInstanceId] = {};
            }

            //单元格坐标
            state.bindInfos[id][sheetInstanceId][cellInstanceId] = {
                id,
                row,
                col,
                path,
                bindType,
                tableName,

                cellInstanceId,
                sheetInstanceId,
            };
        },
        removeBindInfos(state, { payload }) {
            const { id, cellInstanceId, sheetInstanceId } = payload.bindInfos;
            if (state?.bindInfos?.[id]?.[sheetInstanceId]) {
                delete state.bindInfos[id][sheetInstanceId][cellInstanceId];
            }
        },
        genPreviewDatas(state, { payload }) {
            const datas = {};
            state.finalDsList.forEach(function ({
                type,
                code,
                name,
                children,
            }) {
                if (type !== 'table') {
                    datas[code] = genValueByType(name, type, 1);
                } else {
                    datas[code] = [];
                    if (Array.isArray(children)) {
                        for (let i = 1; i <= 10; i++) {
                            const instanceObject = {};
                            children.forEach(function ({ code, name, type }) {
                                instanceObject[code] = genValueByType(
                                    name,
                                    type,
                                    i
                                );
                            });
                            datas[code].push(instanceObject);
                        }
                    }
                }
            });

            state.previewViewDatas = datas;
        },
        setIsShowDatasource(state, { payload }) {
            if (
                payload &&
                Object.prototype.hasOwnProperty.call(payload, 'data')
            ) {
                state.isShowDatasource = payload.data;
            } else {
                state.isShowDatasource = !state.isShowDatasource;
            }
        },
        removeBindInfosByCellInstanceId(state, { payload }) {
            const { cellInstanceId } = payload;
            Object.entries(state.bindInfos).forEach(function ([id, sheetInfo]) {
                Object.keys(sheetInfo).forEach(function (sheetInstanceId) {
                    delete state.bindInfos[id][sheetInstanceId][cellInstanceId];
                });
            });
        },
        saveSheetInfo(state, { payload }) {
            const { cellInstanceId, sheetInstanceId, key, value } =
                payload.sheetInfos;

            if (!state['sheetInfos'][sheetInstanceId]) {
                state['sheetInfos'][sheetInstanceId] = {};
            }

            if (!state['sheetInfos'][sheetInstanceId][cellInstanceId]) {
                state['sheetInfos'][sheetInstanceId][cellInstanceId] = {};
            }
            state['sheetInfos'][sheetInstanceId][cellInstanceId][key] = value;
        },
    },
});
export const {
    pushDsList,
    updateDslist,
    toggleActiveDs,
    deleteDsList,
    saveBindInfos,
    removeBindInfos,
    genPreviewDatas,
    setIsShowDatasource,
    removeBindInfosByCellInstanceId,
    saveSheetInfo,
} = datasourceSlice.actions;
export default datasourceSlice.reducer;
