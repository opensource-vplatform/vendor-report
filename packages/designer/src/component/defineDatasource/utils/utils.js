import {
  saveTables,
  updateActiveSheetTablePath,
} from '@store/datasourceSlice/datasourceSlice';
import {
  setActive,
  showTab,
} from '@store/navSlice/navSlice';
import { setData } from '@store/tableDesignSlice/tableDesignSlice';
import {
  isArray,
  uuid,
} from '@toone/report-util';
import {
  findTreeNodeById,
  getActiveSheetTablesPath,
} from '@utils/commonUtil.js';
import { getNamespace } from '@utils/spreadUtil';
import {
  parseTable,
  setTableCornerMarks,
} from '@utils/tableUtil.js';
import {
  getSheetInstanceId,
  setCellTag,
} from '@utils/worksheetUtil.js';

const GC = getNamespace();

export function addTable(params) {
  /*  test(params);
    return; */
  const {
    columnsTemp,
    sheet,
    spreadNS,
    dispatch,
    row,
    col,
    dataPath,
    filterButtonVisible,
    addingMode = 'drag',
    groups = [],
    sumColumns = [],
    rowMergeColumns = [],
    colMergeColumns = [],
  } = params;

  const tableColumnsCount = isArray(columnsTemp) ? columnsTemp.length : 0;

  if (tableColumnsCount <= 0) {
    return;
  }
  //如果表格的结束索引大于表单的结束索引，则创建表单列以确保表单的结束索引不小于表格的结束索引
  const sheetColumnCount = sheet.getColumnCount(spreadNS.SheetArea.viewport);
  const diff = col + tableColumnsCount - sheetColumnCount;
  if (diff > 0) {
    sheet.addColumns(sheetColumnCount, diff);
  }

  const rowCount = 3;

  //超出行的范围，新增行
  const sheetRowCount = sheet.getRowCount(spreadNS.SheetArea.viewport);
  if (row + rowCount > sheetRowCount) {
    sheet.addRows(row, rowCount - 1);
  }

  const tableName = `tableName_${uuid()}`;
  const table = sheet.tables.add(tableName, row, col, 3, tableColumnsCount);
  table.style(undefined);
  table.allowAutoExpand(false);
  table.autoGenerateColumns(false);

  //设置表格的四个角标
  setTableCornerMarks({
    sheet,
    row,
    col,
    rowCount,
    colCount: tableColumnsCount,
  });

  if (isArray(columnsTemp)) {
    const tableColumns = [];
    const groupsFields = [];
    const sumFields = [];
    columnsTemp.forEach(function ({ id, name, code }, index) {
      //以数据源id作为表格列的唯一id，将数据源与列关联起来，方便处理当数据源发生变化时候，同步更改列
      const tableColumn = new spreadNS.Tables.TableColumn(id, code, name);
      const inGroupsIndex = groups.findIndex((group) => group.id === id);
      const inSumIndex = sumColumns.findIndex((sum) => sum.id === id);
      if (inGroupsIndex >= 0) {
        groupsFields[inGroupsIndex] = tableColumn;
      } else if (inSumIndex >= 0) {
        sumFields[inSumIndex] = tableColumn;
      } else {
        tableColumns.push(tableColumn);
      }

      setCellTag(sheet, row, col + index, 'bindInfo', {
        bindType: 'tableColumn',
        bindDsInstanceId: id,
      });
    });
    tableColumns.unshift(...groupsFields);
    tableColumns.push(...sumFields);
    tableColumns.length > 0 && table.bindColumns(tableColumns);
    const { colCount } = table.range();
    if (!filterButtonVisible) {
      for (let i = 0, l = colCount; i < l; i++) {
        table.filterButtonVisible(i, false);
      }
    }
  }
  table.expandBoundRows(true);
  table.bindingPath(dataPath);
  sheet.setActiveCell(row, col);

  //切换到表设计视图
  dispatch(showTab({ code: 'table' }));
  dispatch(setData({ data: parseTable(sheet) }));
  dispatch(setActive({ code: 'table' }));

  const tablePaths = getActiveSheetTablesPath({ sheet });
  dispatch(updateActiveSheetTablePath({ tablePaths }));
  const sheetInstanceId = getSheetInstanceId(sheet);
  dispatch(
    saveTables({
      sheetInstanceId,
      tableInfo: {
        [dataPath]: addingMode,
      },
      tableGroups: {
        [tableName]: groups,
      },
      sumColumns: {
        [tableName]: sumColumns,
      },
      rowMergeColumns: {
        [tableName]: rowMergeColumns,
      },
      colMergeColumns: {
        [tableName]: colMergeColumns,
      },
    })
  );
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
      const hanChanged = Object.entries(oldData).some(function ([key, value]) {
        return JSON.stringify(current[key]) !== JSON.stringify(value);
      });
      hanChanged &&
        result.updated.push({
          newData: { ...current },
          oldData: { ...oldData },
        });
    } else {
      result.added.push({ newData: { ...current } });
    }
    if (isArray(children)) {
      stack.push(...children);
    }
  }

  //查找已经删除了的数据源（旧数据源中有而新数据源中没有，则定义为删除的数据）
  const oldStack = [...finalDsList];
  while (oldStack.length > 0) {
    const current = oldStack.shift();
    const { id } = current;
    const newData = findTreeNodeById(id, dsList);
    if (!newData) {
      result.deleted.push({
        newData: { ...current, isDel: true },
        oldData: { ...current, isDel: true },
      });
    }
  }

  return result;
}

//如果数据源编码发生改变，则校验当前数据源是否已经绑定到单元格上，如果已经绑定，需要清除绑定
export function checkHasBind(params) {
  let result = false;
  const {
    spread,
    updated,
    dsList,
    sync = false,
    finalDsList,
    filterButtonVisible,
    deleted,
    tablesBindInfos,
    dispatch,
  } = params;
  if (updated.length <= 0 && deleted.length <= 0) {
    return result;
  }

  const stack = [...updated, ...deleted];

  /*  const bindInfos = [];
    const spreadJson = spread.toJSON();
    Object.values(spreadJson.sheets).forEach(function (sheet) {
        const dataTable = sheet.data.dataTable;
        if (dataTable) {
            Object.values(dataTable).forEach(function (rowDataTable) {
                Object.values(rowDataTable).forEach(function ({
                    bindingPath,
                    value,
                }) {
                    if (bindingPath) {
                        const res = bindInfos.some(function (item) {
                            return item.bindingPath === bindingPath;
                        });
                        !res &&
                            bindInfos.push({
                                bindingPath,
                                value,
                            });
                    }
                });
            });
        }
    }); */

  while (stack.length > 0) {
    const { newData, oldData } = stack.shift();

    const { children, type, parentId, isDel = false } = newData;
    const { type: oldType } = oldData;

    const newPath = getPath(newData, dsList);
    const oldPath = getPath(oldData, finalDsList);
    const typeHasChanged = type !== oldType;

    sync && spread.suspendPaint();

    spread.sheets.some(function (sheet) {
      const {
        tables = [],
        data: { dataTable = {} },
      } = sheet.toJSON();

      const sheetInstanceId = getSheetInstanceId(sheet);
      const tableBindInfos = tablesBindInfos[sheetInstanceId] || {};
      //其它单元格
      if (!parentId) {
        Object.entries(dataTable).some(function ([row, colInfos]) {
          Object.entries(colInfos).some(function ([col, { bindingPath }]) {
            if (
              bindingPath === oldPath &&
              (bindingPath !== newPath || type === 'table' || isDel)
            ) {
              result = true;
              if (sync) {
                const _row = Number(row);
                const _col = Number(col);
                let path = typeHasChanged || isDel ? '' : newPath;
                sheet.getCell(_row, _col).bindingPath(path);
              }
            }

            return result && !sync;
          });
          return result && !sync;
        });

        if (result && !sync) {
          return result;
        }
      }

      //处理实体
      result = tables.some(function ({ bindingPath, name: tableName }) {
        const table = sheet.tables.findByName(tableName);
        const addingMode = tableBindInfos[bindingPath];
        //数据源类型已经发生改变或数据源已经被删除，需要移除表格
        if ((typeHasChanged || isDel) && bindingPath === oldPath) {
          result = true;
          setTableCornerMarks({
            setType: 'onlyRemove',
            sheet,
            ...table.range(),
          });
          sync && sheet.tables.remove(table);
        }

        if (!typeHasChanged && !isDel && bindingPath === oldPath) {
          //判断表格已经绑定的实体编码是否与修改后的实体编码一致
          if (bindingPath === oldPath && bindingPath !== newPath) {
            result = true;

            if (sync) {
              table.bindingPath(newPath);
              dispatch(
                saveTables({
                  sheetInstanceId,
                  tableInfo: {
                    [newPath]: addingMode,
                    [bindingPath]: undefined,
                  },
                })
              );
            }
          }

          //判断表格列绑定的实体字段是否与修改后的实体字段编码一致

          const { BSt } = table;
          //字段发生变化
          BSt.forEach(function (tableColumn, index) {
            if (isArray(children) && children.length > 0) {
              const columnId = tableColumn.id();
              const columnName = tableColumn.name();
              const dataField = tableColumn.dataField();
              const ds = children.find(({ id }) => id === columnId);

              if (ds) {
                if (ds.code !== dataField) {
                  sync && tableColumn.dataField(ds.code);
                  result = true;
                }
                if (ds.name !== columnName) {
                  sync && tableColumn.name(ds.name);
                  result = true;
                }
              } else {
                result = true;
                const node = findTreeNodeById(columnId, finalDsList);
                sync && node && table.deleteColumns(index, 1);
              }
            }
          });

          //数据源新增字段
          if (isArray(children) && addingMode === 'drag') {
            let isInserted = false;
            children.forEach(function ({ id, name, code }, index) {
              const col = BSt.find((item) => item.id() === id);
              if (!col) {
                result = true;
                if (sync) {
                  isInserted = true;
                  setTableCornerMarks({
                    setType: 'onlyRemove',
                    sheet,
                    ...table.range(),
                  });

                  const isZero = index === 0;
                  table.insertColumns(index - (isZero ? 0 : 1), 1, !isZero);
                  !filterButtonVisible &&
                    table.filterButtonVisible(index, false);
                  const newCol = BSt[index];
                  newCol.id(id);
                  newCol.name(name);
                  newCol.dataField(code);
                }
              }
            });

            isInserted &&
              setTableCornerMarks({
                setType: 'onlyAdd',
                sheet,
                ...table.range(),
              });
          }
        }

        return result && !sync;
      });
    });

    sync && spread.resumePaint();
  }
  return result;
}

export function getCellInfo(params) {
  const result = {};
  const { spread, event } = params;
  if (!spread) {
    return;
  }
  const targetElement = spread.getHost();
  const { x: offsetLeft, y: offsetTop } = targetElement.getBoundingClientRect();

  //根据坐标获取单元格
  const x = event.pageX - offsetLeft;
  const y = event.pageY - offsetTop;

  const target = spread.hitTest(x, y);
  if (!target) {
    return result;
  }
  let { row, col } = target?.worksheetHitInfo || {};

  //目标区域中不存在单元格，则退出
  if (typeof row !== 'number' || typeof col !== 'number') {
    return result;
  }

  const sheet = spread.getActiveSheet();
  const cell = sheet.getCell(row, col);
  const GC = getNamespace();
  //add by xiedh 2024-3-13 解决拖拽数据源到合并单元格中只高亮一个单元格大小问题
  let rowCount = 1,
    colCount = 1;
  const range = new GC.Spread.Sheets.Range(row, col, 1, 1);
  const spans = sheet.getSpans(range);
  if (spans && spans.length > 0) {
    spans.forEach((span) => {
      if (span.row < row) {
        row = span.row;
      }
      if (span.col < col) {
        col = span.col;
      }
      if (rowCount < span.rowCount) {
        rowCount = span.rowCount;
      }
      if (colCount < span.colCount) {
        colCount = span.colCount;
      }
    });
  }
  return { cell, col, row, rowCount, colCount };
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
    if (container) {
      for (let n = 0; n < cellRacts.length; n++) {
        let decoration = void 0;
        if (9 <= n) {
          (decoration = document.createElement('div')).classList.add(
            decorationClass
          );
          container.appendChild(decoration);
        } else {
          decoration = container.querySelectorAll(decorationSelector)[n];
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
    return container;
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

export function bindingPath(params) {
  const { sheet, value, path, row, col, context } = params;
  const cell = sheet.getCell(row, col);
  //const bindingPathCellType = new BindingPathCellType();
  //bindingPathCellType.setBasePath(getBaseUrl());
  //cell.bindingPath(path).cellType(bindingPathCellType);
  cell.bindingPath(path); //绑定字段要放在设置单元格之前，否则造成DefaultCell中获取绑定字段获取不到问题  add by xiedh;
  cell.value(value);
  //开始设置字段默认格式
  // const defines = getDefineByBindingPath(sheet.getParent(), path);
  // const define = defines.pop();
  // if (define) {
  //   const type = define.type;
  //   let formatter;
  //   formatter = getTextFieldDataSourceFormatter(context, path);
  //   if (!formatter)
  //     formatter = getFieldTypeFormatter(context, type);

  //   if (formatter) {
  //     cell.formatter(formatter);
  //   }
  // }
  /*let style = sheet.getStyle(row, col);
    if (!style) {
        style = new GC.Spread.Sheets.Style();
    }

    style.decoration = {
        cornerFold: {
            size: 8,
            position: 8,
            color: 'blue',
        },
    };
    sheet.setStyle(row, col, style);*/
}

export function bindingTablePathHandler(params) {
  const { row, col, path, pathName, sheet, context } = params;
  let { columnsTemp } = params;
  columnsTemp = columnsTemp.reduce((res, cur) => {
    const { code, name, type, children } = cur;
    if (type === 'map') {
      if (isArray(children)) {
        children.forEach(({ code: _code, name: _name }) => {
          res.push({
            $PathName: pathName
              ? `[${pathName}.${name}.${_name}]`
              : `[${name}.${_name}]`,
            $Path: path ? `${path}.${code}.${_code}` : `${code}.${_code}`,
          });
        });
      }
    } else {
      res.push({
        $PathName: pathName ? `[${pathName}.${name}]` : `[${name}]`,
        $Path: path ? `${path}.${code}` : code,
      });
    }
    return res;
  }, []);

  let columnCount = sheet.getColumnCount();
  const diff = col + columnsTemp.length - columnCount;
  if (diff > 0) {
    columnCount += diff;
    sheet.setColumnCount(columnCount);
  }

  let index = 0;
  sheet.suspendPaint();
  columnsTemp.forEach(function ({ $Path, $PathName }) {
    const newCol = col + index;
    bindingPath({
      sheet,
      row,
      col: newCol,
      context,
      value: $PathName,
      path: $Path,
    });

    const span = sheet.getSpan(row, newCol) || {
      colCount: 1,
    };
    index += span.colCount;
  });
  sheet.resumePaint();
}
