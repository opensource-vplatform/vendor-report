import GC from '@grapecity/spread-sheets';

import {
    removeBindInfos,
    saveBindInfos,
    setPreviewViewDatas,
} from '../../store/datasourceSlice/datasourceSlice';
import { findTreeNodeById, genUUID } from '../../utils/commonUtil.js';
import {
    getCellInstanceId,
    getCellTag,
    getSheetInstanceId,
    setCellTag,
} from '../../utils/worksheetUtil.js';

export function addTable(params) {
    const {
        columnsTemp,
        sheet,
        spreadNS,
        dispatch,
        row,
        col,
        cellInstanceId,
        sheetInstanceId,
        dataPath,
        itemId,
    } = params;

    const tableColumnsCount = Array.isArray(columnsTemp)
        ? columnsTemp.length
        : 0;

    if (tableColumnsCount <= 0) {
        return;
    }
    //如果表格的结束索引大于表单的结束索引，则创建表单列以确保表单的结束索引不小于表格的结束索引
    const sheetColumnCount = sheet.getColumnCount(spreadNS.SheetArea.viewport);
    if (col + tableColumnsCount > sheetColumnCount) {
        sheet.addColumns(col, tableColumnsCount - 1);
    }

    const tableName = `tableName_${genUUID()}`;
    const table = sheet.tables.add(
        tableName,
        row,
        col,
        1,
        tableColumnsCount,
        spreadNS.Tables.TableThemes.light6
    );

    table.autoGenerateColumns(false);

    if (Array.isArray(columnsTemp)) {
        const tableColumns = [];
        columnsTemp.forEach(function ({ id, name, code }, index) {
            //以数据源id作为表格列的唯一id，将数据源与列关联起来，方便处理当数据源发生变化时候，同步更改列
            const tableColumn = new spreadNS.Tables.TableColumn(id, code, name);
            tableColumns.push(tableColumn);
            setCellTag(sheet, row, col + index, 'bindInfo', {
                bindType: 'tableColumn',
                bindDsInstanceId: id,
            });
        });

        tableColumns.length > 0 && table.bindColumns(tableColumns);
    }

    table.bindingPath(dataPath);
    dispatch(
        saveBindInfos({
            bindInfos: {
                row,
                col,
                path: dataPath,
                id: itemId,
                bindType: 'table',
                cellInstanceId,
                sheetInstanceId,
                tableName,
            },
        })
    );
}

export function getPath(node, treeNodes) {
    if (!node.parentId) {
        return node.code;
    }
    const parent = findTreeNodeById(node.parentId, treeNodes);
    if (parent && parent.type !== 'entity') {
        return node.code;
    }
    return getPath(parent, treeNodes) + '.' + node.code;
}

//校验数据源是否发生改变
export function getChanged(params) {
    const { dsList, finalDsList } = params;
    const result = {
        updated: [],
        added: [],
        deleted: [],
    };
    const stack = [...dsList];
    while (stack.length > 0) {
        const current = stack.shift();
        const { id, children } = current;
        const oldData = findTreeNodeById(id, finalDsList);
        if (oldData) {
            const hanChanged = Object.entries(oldData).some(function ([
                key,
                value,
            ]) {
                return JSON.stringify(current[key]) !== JSON.stringify(value);
            });
            hanChanged && result.updated.push({ ...current });
        } else {
            result.added.push({ ...current });
        }
        if (Array.isArray(children)) {
            stack.push(...children);
        }
    }
    return result;
}

//如果数据源编码发生改变，则校验当前数据源是否已经绑定到单元格上，如果已经绑定，需要清除绑定
export function checkHasBind(params) {
    let result = false;
    const {
        spread,
        bindInfos,
        updated,
        dsList,
        sync = false,
        dispatch,
    } = params;
    if (updated.length <= 0) {
        return result;
    }

    const stack = [...updated];
    while (stack.length > 0) {
        const current = stack.shift();
        const { id, children, type } = current;
        const dsBindInfo = bindInfos[id];
        const newPath = getPath(current, dsList);
        if (dsBindInfo) {
            result = Object.entries(dsBindInfo).some(function ([
                sheetInstanceId,
                cellBindInfos,
            ]) {
                //获取表单实例
                const sheetInstance = spread.sheets.find(function (sheet) {
                    return getSheetInstanceId(sheet) === sheetInstanceId;
                });
                if (!sheetInstance) {
                    return false;
                }

                //数据源是否已经绑定单元格
                const hasBindCell = Object.values(cellBindInfos).some(
                    function ({ row, col, bindType, path, cellInstanceId }) {
                        const _cellInstanceId = getCellInstanceId(
                            sheetInstance,
                            row,
                            col
                        );

                        if (_cellInstanceId !== cellInstanceId) {
                            return false;
                        }

                        const { bindDsInstanceId } =
                            getCellTag(sheetInstance, row, col, 'bindInfo') ||
                            {};

                        if (bindDsInstanceId !== id) {
                            return false;
                        }

                        if (
                            path !== newPath ||
                            (bindType !== 'table' && type === 'entity')
                        ) {
                            //如果同步更改，则不中断迭代
                            if (sync) {
                                //如果类型发生变化，则清除绑定
                                if (bindType !== 'table' && type === 'entity') {
                                    sheetInstance
                                        .getCell(row, col)
                                        .bindingPath('');

                                    dispatch(
                                        removeBindInfos({
                                            bindInfos: {
                                                cellInstanceId,
                                                sheetInstanceId,
                                                id,
                                            },
                                        })
                                    );
                                    return false;
                                }

                                //如果不是类型发生变化，则同步修改
                                sheetInstance
                                    .getCell(row, col)
                                    .bindingPath(newPath);
                                dispatch(
                                    saveBindInfos({
                                        bindInfos: {
                                            row,
                                            col,
                                            path: newPath,
                                            id,
                                            bindType: 'cell',
                                            cellInstanceId,
                                            sheetInstanceId,
                                        },
                                    })
                                );

                                return false;
                            }
                            return true;
                        }

                        return false;
                    }
                );

                if (hasBindCell && !sync) {
                    return true;
                }

                //数据源是否已经绑定表格
                return Object.values(cellBindInfos).some(function ({
                    bindType,
                    tableName,
                    sheetInstanceId: _sheetInstanceId,
                    cellInstanceId,
                    row,
                    col,
                    path,
                }) {
                    if (_sheetInstanceId === sheetInstanceId) {
                        const hasChanged =
                            bindType === 'table' && type !== 'entity';
                        if (hasChanged && !sync) {
                            return true;
                        }

                        if (tableName && sync) {
                            spread.suspendPaint();
                            const table =
                                sheetInstance.tables.findByName(tableName);
                            //其它逻辑
                            if (hasChanged && sync) {
                                if (table) {
                                    sheetInstance.tables.remove(table);
                                    return true;
                                }
                            }
                            if (!table) {
                                return false;
                            }

                            let columnHasChange = false;
                            debugger;
                            //字段发生变化
                            table.BSt.forEach(function (tableColumn, index) {
                                if (
                                    Array.isArray(children) &&
                                    children.length > 0
                                ) {
                                    const columnId = tableColumn.id();
                                    const columnName = tableColumn.name();
                                    const dataField = tableColumn.dataField();
                                    const ds = children.find(function (child) {
                                        return child?.id === columnId;
                                    });
                                    if (ds) {
                                        if (ds.code !== dataField) {
                                            tableColumn.dataField(ds.code);
                                            columnHasChange = true;
                                        }
                                        if (ds.name !== columnName) {
                                            tableColumn.name(ds.name);
                                            columnHasChange = true;
                                        }
                                    } else {
                                        table.deleteColumns(index, 1);
                                    }
                                }
                            });

                            let isInsert = false;
                            //数据源新增字段
                            if (Array.isArray(children)) {
                                children.forEach(function ({ id }) {
                                    const tableColumn = table.BSt.find(
                                        function (tableColumn) {
                                            return tableColumn.id() === id;
                                        }
                                    );
                                    if (!tableColumn) {
                                        isInsert = true;
                                        columnHasChange = true;
                                    }
                                });
                            }
                            if (isInsert && sync) {
                                sheetInstance.tables.remove(table);
                                addTable({
                                    columnsTemp: children,
                                    sheet: sheetInstance,
                                    spreadNS: GC.Spread.Sheets,
                                    dispatch,
                                    row,
                                    col,
                                    cellInstanceId,
                                    sheetInstanceId,
                                    dataPath: path,
                                    itemId: id,
                                });
                            }
                            spread.resumePaint();
                            return columnHasChange;
                        }
                        return false;
                    }

                    return false;
                });
            });
            if (result) {
                break;
            }
        }
        if (Array.isArray(children)) {
            stack.push(...children);
        }
    }
    return result;
}

export function getCellInfo(params) {
    const result = {};
    const { spread, event } = params;
    const targetElement = spread.getHost();
    const { x: offsetLeft, y: offsetTop } =
        targetElement.getBoundingClientRect();

    //根据坐标获取单元格
    const x = event.pageX - offsetLeft;
    const y = event.pageY - offsetTop;

    const target = spread.hitTest(x, y);
    if (!target) {
        return result;
    }
    const { row, col } = target?.worksheetHitInfo || {};

    //目标区域中不存在单元格，则退出
    if (typeof row !== 'number' || typeof col !== 'number') {
        return result;
    }

    const sheet = spread.getActiveSheet();
    const cell = sheet.getCell(row, col);
    return { cell, col, row };
}

export class BindingPathCellType extends GC.Spread.Sheets.CellTypes.Text {
    constructor() {
        super();
    }

    paint(ctx, value, x, y, w, h, style, context) {
        if (value === null || value === undefined) {
            let sheet = context.sheet,
                row = context.row,
                col = context.col;
            if (sheet && (row === 0 || !!row) && (col === 0 || !!col)) {
                let bindingPath = sheet.getBindingPath(
                    context.row,
                    context.col
                );
                if (bindingPath) {
                    value = '[' + bindingPath + ']';
                }
            }
        }
        super.paint(ctx, value, x, y, w, h, style, context);
    }
}

export function preview(params) {
    const { spread, state, dispatch } = params;
    const sheets = [];
    spread.sheets.forEach(function (sheet) {
        const sheetColumnCount = sheet.getColumnCount();
        const sheetRowCount = sheet.getRowCount();
        const sheetName = sheet.name();
        const _sheet = {
            sheetName,
            row: {},
            tables: [],
        };

        //收集单元格值以及绑定的数据源路径
        for (let rowIndex = 0; rowIndex < sheetRowCount; rowIndex++) {
            _sheet.row[rowIndex] = {};
            for (let colIndex = 0; colIndex < sheetColumnCount; colIndex++) {
                //单元格的值
                const cell = sheet.getCell(rowIndex, colIndex);
                const cellValue = cell.value();
                const bindInfo = getCellTag(
                    sheet,
                    rowIndex,
                    colIndex,
                    'bindInfo'
                );
                if (cellValue && bindInfo?.bindType !== 'tableColumn') {
                    _sheet.row[rowIndex][colIndex] =
                        _sheet.row[rowIndex][colIndex] || {};
                    _sheet.row[rowIndex][colIndex].value = cellValue;
                }

                //收集单元格绑定数据源路径
                const path = sheet.getBindingPath(rowIndex, colIndex);
                if (path) {
                    _sheet.row[rowIndex][colIndex] =
                        _sheet.row[rowIndex][colIndex] || {};
                    _sheet.row[rowIndex][colIndex].path = path;
                }
            }
        }

        //收集表格
        const tables = sheet.tables.all();
        tables.forEach(function (table) {
            debugger;
            const range = table.range();
            const tableName = table.name();
            const path = table.bindingPath();
            const columns = [];
            table.BSt.forEach(function (tableColumn) {
                const columnId = tableColumn.id();
                const columnName = tableColumn.name();
                const dataField = tableColumn.dataField();
                columns.push({
                    columnId,
                    columnName,
                    dataField,
                });
            });
            _sheet.tables.push({
                range,
                tableName,
                path,
                columns,
            });
        });
        sheets.push(_sheet);
    });

    const datas = {};
    state.datasourceSlice.finalDsList.forEach(function ({
        type,
        code,
        name,
        children,
    }) {
        if (type !== 'entity') {
            datas[code] = name + '1';
        } else {
            datas[code] = [];
            if (Array.isArray(children)) {
                for (let i = 1; i <= 10; i++) {
                    const instanceObject = {};
                    children.forEach(function ({ code, name }) {
                        instanceObject[code] = name + i;
                    });
                    datas[code].push(instanceObject);
                }
            }
        }
    });

    /*   let source = new GC.Spread.Sheets.Bindings.CellBindingSource(datas);
    spread.sheets.forEach(function (sheet) {
        sheet.setDataSource(source);
    });
 */
    dispatch(
        setPreviewViewDatas({
            datas: {
                sheets,
                datas,
            },
        })
    );
    console.log({
        sheets,
        datas,
    });
}
