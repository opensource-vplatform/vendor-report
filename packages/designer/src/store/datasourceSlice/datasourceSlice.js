import { createSlice } from '@reduxjs/toolkit';

import {
  deepCopy,
  findTreeNodeById,
  genValueByType,
} from '../../utils/commonUtil.js';

export const datasourceSlice = createSlice({
    name: 'datasourceSlice',
    initialState: {
        ds: {},
        activeDs: {},
        finalDsList: [],
        dsList: [],
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
        previewViewDatas: {},
        isShowDatasource: false,
        activeSheetTablePath: {},
    },
    reducers: {
        updateActiveSheetTablePath(state, { payload }) {
            const { tablePaths = {} } = payload;
            state.activeSheetTablePath = tablePaths;
        },
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
            function mergeColumnDatas(params) {
                const {
                    instanceObject,
                    mergeInfos,
                    i,
                    datas,
                    code,
                    type = 'column',
                } = params;
                const data = { ...instanceObject };
                //第一列
                const key1 = mergeInfos[0].key;
                const value1 = mergeInfos[0].values;
                if (i <= 5) {
                    if (value1[0] === null || value1[0] === undefined) {
                        value1[0] = data[key1];
                    }
                    data[key1] = value1[0];
                } else {
                    if (value1[1] === null || value1[1] === undefined) {
                        value1[1] = data[key1];
                    }
                    data[key1] = value1[1];
                }

                //第二列
                const key2 = mergeInfos[1].key;
                const value2 = mergeInfos[1].values;
                if (i <= 3) {
                    if (value2[0] === null || value2[0] === undefined) {
                        value2[0] = data[key2];
                    }
                    data[key2] = value2[0];
                } else if (i <= 6) {
                    if (value2[1] === null || value2[1] === undefined) {
                        value2[1] = data[key2];
                    }
                    data[key2] = value2[1];
                } else {
                    if (value2[2] === null || value2[2] === undefined) {
                        value2[2] = data[key2];
                    }
                    data[key2] = value2[2];
                }
                datas.mergeDatas[type][code].push(data);
            }

            const datas = {
                mergeDatas: {
                    row: {},
                    column: {},
                    rowColumn: {},
                },
            };
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
                    datas.mergeDatas.row[code] = [];
                    datas.mergeDatas.column[code] = [];
                    datas.mergeDatas.rowColumn[code] = [];

                    if (Array.isArray(children)) {
                        const mergeInfos = [];
                        const rowColumnMergeInfos = [];
                        for (let i = 1; i <= 10; i++) {
                            const instanceObject = {};

                            const rowInstanceObject = {};
                            let preType = '';
                            let preData = '';

                            children.forEach(function (
                                { code, name, type },
                                index
                            ) {
                                //普通数据
                                instanceObject[code] = genValueByType(
                                    name,
                                    type,
                                    i
                                );

                                //需要合并的列
                                if (index < 2 && mergeInfos.length < 3) {
                                    mergeInfos.push({
                                        key: code,
                                        values: [],
                                    });
                                    rowColumnMergeInfos.push({
                                        key: code,
                                        values: [],
                                    });
                                }

                                //处理行合并数据
                                let rowData = instanceObject[code];
                                if (i === 1) {
                                    if (preType && preType === type) {
                                        rowData = preData;
                                    } else {
                                        rowData = instanceObject[code];
                                    }
                                    preType = type;
                                    preData = rowData;
                                }
                                rowInstanceObject[code] = rowData;
                            });

                            //列合并数据
                            mergeColumnDatas({
                                mergeInfos,
                                instanceObject,
                                i,
                                datas,
                                code,
                            });

                            if (i === 1) {
                                datas.mergeDatas.rowColumn[code].push(
                                    rowInstanceObject
                                );
                            } else {
                                mergeColumnDatas({
                                    mergeInfos: rowColumnMergeInfos,
                                    instanceObject,
                                    i,
                                    datas,
                                    code,
                                    type: 'rowColumn',
                                });
                            }

                            //行合并数据
                            datas.mergeDatas.row[code].push(rowInstanceObject);

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
        initDatasource(state, { payload }) {
            let { datasource } = payload;
            datasource = Array.isArray(datasource) ? datasource : [];
            state.dsList = [...datasource];
            state.finalDsList = [...datasource];
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
    updateActiveSheetTablePath,
    initDatasource,
} = datasourceSlice.actions;
export default datasourceSlice.reducer;
