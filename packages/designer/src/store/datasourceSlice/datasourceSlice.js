import { createSlice } from '@reduxjs/toolkit';

import {
  deepCopy,
  findTreeNodeById,
  genValueByType,
} from '../../utils/commonUtil.js';

const typesMap = {
    text: '文本',
    integer: '整数',
    decimals: '小数',
    table: '表',
};

export const datasourceSlice = createSlice({
    name: 'datasourceSlice',
    initialState: {
        ds: {},
        activeDs: {},
        finalDsList: [],
        dsList: [],
        previewViewDatas: {},
        originalDatasourceIds: {}, //原始数据源不允许编辑与删除，但是允许扩展
        originalDatasourceCodes: {},
        isShowDatasource: false,
        activeSheetTablePath: {},
        tables: {
            /*  [sheetId]: {
                [dsCode]:'drag' || 'wizard'
            } */
        },
        tableGroups: {},
        sumColumns: {},
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
                if (mergeInfos[1]) {
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
                id,
            }) {
                if (state.originalDatasourceIds[id]) {
                    return;
                }

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

            state.previewViewDatas = { ...state.previewViewDatas, ...datas };
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
        initDatasource(state, { payload }) {
            let { datasource, datas, datasourceSlice } = payload;
            //从配置项json还原仓库数据
            if (datasourceSlice && typeof datasourceSlice === 'object') {
                Object.entries(datasourceSlice).forEach(([key, value]) => {
                    state[key] = value;
                });
            }

            //配置项中数据源定义覆盖json中的仓库数据。并且这些数据源不可编辑
            datasource = Array.isArray(datasource) ? datasource : [];
            datasource.forEach((_item) => {
                const item = { ..._item };
                if (!item?.id) {
                    item.id = item.code;
                }
                item.typeName = typesMap[item?.typeCode];
                if (Array.isArray(item.children)) {
                    item.children = item.children.map(function (_children) {
                        const children = { ..._children };
                        if (!children?.id) {
                            children.id = children.code;
                        }
                        children.typeName = typesMap[children?.typeCode];
                        children.parentId = item.id;
                        return children;
                    });
                }
                const { id, code } = item;
                const itemInDsListIndex = state.dsList.findIndex(
                    ({ id: _id, code: _code }) => {
                        return id === _id || code === _code;
                    }
                );
                if (itemInDsListIndex >= 0) {
                    state.dsList.splice(itemInDsListIndex, 1, item);
                } else {
                    state.dsList.push(item);
                }

                const itemInFinalDsListIndex = state.finalDsList.findIndex(
                    ({ id: _id, code: _code }) => {
                        return id === _id || code === _code;
                    }
                );
                if (itemInFinalDsListIndex >= 0) {
                    state.finalDsList.splice(itemInFinalDsListIndex, 1, item);
                } else {
                    state.finalDsList.push(item);
                }

                //标识当前数据源是通过配置项数据源定义生成的，这些数据源不可编辑
                state.originalDatasourceIds[id] = true;
                state.originalDatasourceCodes[code] = true;
            });
            if (datas) {
                state.previewViewDatas = datas;
            }
        },
        saveTables(state, { payload }) {
            const {
                sheetInstanceId,
                tableInfo = {},
                tableGroups = {},
                sumColumns = {},
            } = payload;
            if (!state.tables[sheetInstanceId]) {
                state.tables[sheetInstanceId] = {};
            }
            Object.entries(tableInfo).forEach(function ([dsCode, addingMode]) {
                if (addingMode) {
                    state.tables[sheetInstanceId][dsCode] = addingMode;
                } else {
                    delete state.tables[sheetInstanceId][dsCode];
                }
            });

            //分组
            state.tableGroups = { ...state.tableGroups, ...tableGroups };

            //求和
            state.sumColumns = { ...state.sumColumns, ...sumColumns };
        },
    },
});
export const {
    pushDsList,
    updateDslist,
    toggleActiveDs,
    deleteDsList,
    genPreviewDatas,
    setIsShowDatasource,
    updateActiveSheetTablePath,
    initDatasource,
    saveTables,
} = datasourceSlice.actions;
export default datasourceSlice.reducer;
