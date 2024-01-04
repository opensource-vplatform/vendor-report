import {
    removeBindInfos,
    saveBindInfos,
    updateActiveSheetTablePath,
} from '@store/datasourceSlice/datasourceSlice';
import {
    findTreeNodeById,
    genUUID,
    getActiveSheetTablesPath,
} from '@utils/commonUtil.js';
import { getNamespace } from '@utils/spreadUtil';
import { setTableCornerMarks } from '@utils/tableUtil.js';
import {
    getCellInstanceId,
    getCellTag,
    getSheetInstanceId,
    setCellTag,
} from '@utils/worksheetUtil.js';

const GC = getNamespace();

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
    const table = sheet.tables.add(tableName, row, col, 3, tableColumnsCount);
    table.autoGenerateColumns(false);

    //设置表格的四个角标
    setTableCornerMarks({
        sheet,
        row,
        col,
        rowCount: 3,
        colCount: tableColumnsCount,
    });

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
        const { colCount } = table.range();
        for (let i = 0, l = colCount; i < l; i++) {
            table.filterButtonVisible(i, false);
        }
    }
    table.expandBoundRows(true);
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

    const tablePaths = getActiveSheetTablesPath({ sheet });
    dispatch(updateActiveSheetTablePath({ tablePaths }));
}

export function getPath(node, treeNodes) {
    if (!node.parentId) {
        return node.code;
    }
    const parent = findTreeNodeById(node.parentId, treeNodes);
    if (parent && parent.type !== 'table') {
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
                            (bindType !== 'table' && type === 'table')
                        ) {
                            //如果同步更改，则不中断迭代
                            if (sync) {
                                //如果类型发生变化，则清除绑定
                                if (bindType !== 'table' && type === 'table') {
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
                            bindType === 'table' && type !== 'table';
                        if (hasChanged && !sync) {
                            return true;
                        }

                        if (tableName) {
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

                            if (path !== newPath && !sync) {
                                return true;
                            }

                            if (path !== newPath) {
                                table.bindingPath(newPath);
                            }

                            let columnHasChange = false;
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
                                            sync &&
                                                tableColumn.dataField(ds.code);
                                            columnHasChange = true;
                                        }
                                        if (ds.name !== columnName) {
                                            sync && tableColumn.name(ds.name);
                                            columnHasChange = true;
                                        }
                                    } else {
                                        columnHasChange = true;
                                        sync && table.deleteColumns(index, 1);
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
                                    dataPath: newPath,
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

const decorationContainerClass = 'decorationContainer';
const decorationContainerSelector = '.decorationContainer';
const decorationSelector = '.decoration';
const decorationClass = 'decoration';

//获取一个元素相对于文档主体的偏移量
function getOffsetFromBody(element) {
    let offsetLeft = 0,
        offsetTop = 0;

    for (let currentEle = element; currentEle; ) {
        offsetLeft += currentEle.offsetLeft;
        offsetTop += currentEle.offsetTop;
        currentEle = currentEle.offsetParent;
    }

    return {
        offsetLeft,
        offsetTop,
    };
}

function getCanvasGcuiElement(spread) {
    return spread.getHost().querySelector('canvas[gcuielement]');
}

export function getCellRacts(spread, cellRange) {
    const activeSheet = spread.getActiveSheet();
    const cellRacts = [];

    const canvasGcuiEleOffsetInfo = getOffsetFromBody(
        getCanvasGcuiElement(spread)
    );

    for (let a = 0; a <= 2; a++) {
        for (let i = 0; i <= 2; i++) {
            //获取视图中左列的索引
            let letColumnIndex = activeSheet.getViewportLeftColumn(i);
            //获取视图中右列的索引
            let rightColumnIndex = activeSheet.getViewportRightColumn(i);
            //获取视图中第一行的索引
            let topRowIndex = activeSheet.getViewportTopRow(a);
            //获取视图底部行索引
            let bottomRowIndex = activeSheet.getViewportBottomRow(a);
            let d = new GC.Spread.Sheets.Range(
                topRowIndex,
                letColumnIndex,
                bottomRowIndex - topRowIndex + 1,
                rightColumnIndex - letColumnIndex + 1
            );

            //获取两个单元格区域的交集
            const intersect = cellRange.getIntersect(
                d,
                Math.max(d.rowCount, cellRange.rowCount),
                Math.max(d.colCount, cellRange.colCount)
            );

            if (intersect) {
                const cellRact = new GC.Spread.Sheets.Rect(0, 0, 0, 0);
                const rangeRect = activeSheet.getRangeRect(a, i, intersect);
                cellRact.x = rangeRect.x + canvasGcuiEleOffsetInfo.offsetLeft;
                cellRact.y = rangeRect.y + canvasGcuiEleOffsetInfo.offsetTop;
                cellRact.width = rangeRect.width - 2;
                cellRact.height = rangeRect.height - 2;
                cellRacts.push(cellRact);
            }
        }
    }
    return cellRacts;
}

export function highlightBlock(spread, cellRange) {
    const cellRacts = getCellRacts(spread, cellRange);
    _createHighlightOneBlock();

    if (cellRacts && cellRacts.length > 0) {
        const container = document.querySelector(decorationContainerSelector);
        if (container)
            for (let n = 0; n < cellRacts.length; n++) {
                let decoration = void 0;
                if (9 <= n) {
                    (decoration = document.createElement('div')).classList.add(
                        decorationClass
                    );
                    container.appendChild(decoration);
                } else {
                    decoration =
                        container.querySelectorAll(decorationSelector)[n];
                }
                let r = cellRacts[n],
                    a = document.body,
                    i = 0,
                    l = 0;
                if (a && a.style) {
                    const s = getOffsetFromBody(a);
                    i = s.offsetTop;
                    l = s.offsetLeft;
                }

                decoration.style.width = r.width + 'px';
                decoration.style.height = r.height + 'px';
                decoration.style.left = r.x - l + 'px';
                decoration.style.top = r.y - i + 'px';
            }
    }
}

//函数的作用是创建一个用于高亮显示的装饰容器，并将其添加到文档中。
function _createHighlightOneBlock() {
    let container = document.querySelector(decorationContainerSelector);
    if (!container) {
        container = document.createElement('div');
        container.classList.add(decorationContainerClass);

        //容器样式
        container.style.position = 'absolute';
        container.style.top = 0;
        container.style.left = 0;
        container.style.botton = 0;
        container.style.right = 0;
        container.style.pointerEvent = 'none';

        //为什么是9个？
        for (let n = 0; n < 9; n++) {
            const decoration = document.createElement('div');
            decoration.classList.add(decorationClass);

            //样式
            decoration.style.border = '1px solid blue';
            decoration.style.outline = 'none';
            decoration.style.position = 'absolute';
            decoration.style.zIndex = 1000;
            decoration.style.boxShadow = '0px 0px 4px 0px #007eff';

            container.appendChild(decoration);
        }

        document.body.appendChild(container);
    }
}

//移除装饰容器
export function removeHighlightOneBlock() {
    const container = document.querySelector(decorationContainerSelector);
    container && container.remove();
}
