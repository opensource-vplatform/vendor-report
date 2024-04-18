import {
  useContext,
  useEffect,
  useRef,
} from 'react';

import {
  useDispatch,
  useSelector,
} from 'react-redux';

import Hyperlink from '@components/hyperlink';
import DatasourceIcon from '@icons/data/datasource';
import {
  setIsShowDatasource,
  toggleBooleanValue,
  updateActiveSheetTablePath,
} from '@store/datasourceSlice/datasourceSlice';
import { setActive } from '@store/navSlice/navSlice';
import {
  findTreeNodeById,
  getActiveSheetTablesPath,
} from '@utils/commonUtil.js';
import { getNamespace } from '@utils/spreadUtil';
import { setTableCornerMarks } from '@utils/tableUtil.js';
import { setCellTag } from '@utils/worksheetUtil.js';

import DesignerContext from '../../DesignerContext.jsx';
import Datasources from './Datasources.jsx';
import DialogDatasourcesEdit from './DialogDatasourcesEdit.jsx';
import {
  DraggableDatasourcesBox,
  DraggableDatasourcesContent,
  DraggableDatasourcesFooter,
  DraggableDatasourcesHeander,
} from './ui.jsx';
import {
  BindingPathCellType,
  getCellInfo,
  getPath,
  highlightBlock,
  removeHighlightOneBlock,
  test,
} from './utils/utils.js';

//删除表格
function removeTable(params) {
    const { dispatch, context, spread, tableName } = params;
    const sheet = spread.getActiveSheet();
    const table = sheet.tables.findByName(tableName);
    debugger;
    setTableCornerMarks({
        setType: 'onlyRemove',
        sheet,
        ...table.range(),
    });
    sheet.tables.remove(table);
    //删除表格后，需隐藏表设计页签
    context.handleSelectionChange();

    //删除表格后需要重新保存数据源是否已经绑定
    const tablePaths = getActiveSheetTablesPath({
        sheet,
    });
    dispatch(updateActiveSheetTablePath({ tablePaths }));
}

//删除表格命令
function tableDeleteAllCommand(params) {
    const { commandManager } = params;
    const command = {
        canUndo: false,
        execute(spread, infos) {
            removeTable({
                ...params,
                spread,
                tableName: infos.tableName,
            });
        },
    };
    commandManager.register(
        'tableDeleteAllForContextMenu',
        command,
        null,
        false,
        false,
        false,
        false
    );
}

//清除单元格
function clearContents(params) {
    const { commandManager, spread, dispatch } = params;
    //清除动作。当触发清除动作的时候，需要调用接口清除已经绑定的数据源路径
    commandManager.addListener(
        'gc.spread.contextMenu.clearContents',
        function ({ command: { ranges: selections } }) {
            const activeSheet = spread.getActiveSheet();
            Array.isArray(selections) &&
                selections.forEach(function ({ col, row, colCount, rowCount }) {
                    const endRow = row + rowCount;
                    const endCol = col + colCount;
                    for (let rowIndex = row; rowIndex < endRow; rowIndex++) {
                        for (
                            let colIndex = col;
                            colIndex < endCol;
                            colIndex++
                        ) {
                            //清除绑定的数据源
                            if (
                                activeSheet.getBindingPath(rowIndex, colIndex)
                            ) {
                                activeSheet.setBindingPath(
                                    rowIndex,
                                    colIndex,
                                    ''
                                );
                                activeSheet.getCell(rowIndex, colIndex).tag('');
                            }

                            //清除角标
                            const style = activeSheet.getStyle(
                                rowIndex,
                                colIndex
                            );
                            if (style) {
                                if (
                                    style?.decoration?.cornerFold?.markType ===
                                    'table'
                                ) {
                                    delete style.decoration.cornerFold;
                                    activeSheet.setStyle(
                                        rowIndex,
                                        colIndex,
                                        style
                                    );
                                }
                            }
                        }
                    }
                });

            //清除表格后需要重新保存数据源是否已经绑定
            const tablePaths = getActiveSheetTablesPath({
                sheet: activeSheet,
            });
            dispatch(updateActiveSheetTablePath({ tablePaths }));
        }
    );
}

//移动表格
function tableMove(params) {
    const { commandManager, spread: _spread } = params;
    const command = {
        canUndo: false,
        execute(spread, infos) {
            const sheet = spread.getActiveSheet();
            const table = sheet.tables.findByName(infos.tableName);
            const cellRange = table.range();
            cellRange.rowCount = 1;
            highlightBlock(spread, cellRange);
            const GC = getNamespace();

            function mousemoveHandler(event) {
                const { cell, row, col } = getCellInfo({ event, spread }) || {};
                if (!cell) {
                    return;
                }

                const _cellRange = new GC.Spread.Sheets.Range(
                    row,
                    col,
                    cellRange.rowCount,
                    cellRange.colCount
                );
                highlightBlock(spread, _cellRange);
            }

            function mousedownHandler(event) {
                if (event.button === 0) {
                    spread.suspendPaint();
                    const oldTableRange = table.range();
                    setTableCornerMarks({
                        setType: 'onlyRemove',
                        sheet,
                        ...oldTableRange,
                    });
                    const { row, col } = getCellInfo({ event, spread }) || {};

                    //如果表格的结束索引大于表单的结束索引，则创建表单列以确保表单的结束索引不小于表格的结束索引
                    const spreadNS = GC.Spread.Sheets;
                    const sheetColumnCount = sheet.getColumnCount(
                        spreadNS.SheetArea.viewport
                    );

                    if (col + cellRange.colCount > sheetColumnCount) {
                        sheet.addColumns(col, cellRange.colCount - 1);
                    }

                    //超出行的范围，新增行
                    const sheetRowCount = sheet.getRowCount(
                        spreadNS.SheetArea.viewport
                    );
                    const { rowCount } = oldTableRange;
                    if (row + rowCount > sheetRowCount) {
                        sheet.addRows(row, rowCount - 1);
                    }
                    sheet.moveTo(
                        cellRange.row,
                        cellRange.col,
                        row,
                        col,
                        cellRange.rowCount,
                        cellRange.colCount,
                        GC.Spread.Sheets.CopyToOptions.tag
                    );

                    sheet.tables.move(table, row, col);

                    setTableCornerMarks({
                        setType: 'onlyAdd',
                        sheet,
                        ...table.range(),
                    });
                    sheet.setActiveCell(row, col);
                    removeHighlightOneBlock();
                    spread.resumePaint();
                    //清除事件
                    document.removeEventListener('mousemove', mousemoveHandler);
                    document.removeEventListener('mousedown', mousedownHandler);
                }
            }

            document.addEventListener('mousemove', mousemoveHandler);

            document.addEventListener('mousedown', mousedownHandler);
        },
    };
    commandManager.register(
        'tableMoveForContextMenu',
        command,
        null,
        false,
        false,
        false,
        false
    );
}

function toggleHyperlink(params) {
    const { commandManager, dispatch } = params;
    const command = {
        canUndo: false,
        execute(spread, infos) {
            dispatch(
                toggleBooleanValue({
                    code: 'showHyperlink',
                    value: true,
                })
            );
        },
    };
    commandManager.register(
        'toggleHyperlink',
        command,
        null,
        false,
        false,
        false,
        false
    );
}

function subContextMenuActions(params) {
    const { spread } = params;
    params.commandManager = spread.commandManager();

    //清除单元格
    clearContents(params);

    //删除表格
    tableDeleteAllCommand(params);

    //移动表格
    tableMove(params);

    //
    toggleHyperlink(params);
}

//可拖拽树形数据源列表
export default function Index() {
    const { spread } = useSelector(({ fontSlice }) => fontSlice);
    const { dsList, showHyperlink } = useSelector(
        ({ datasourceSlice }) => datasourceSlice
    );

    const context = useContext(DesignerContext);
    //是否允许查看数据源
    const isAllowToView = context?.conf?.dataSource?.allowToView !== false;

    const { filterButtonVisible } = useSelector(
        ({ tableDesignSlice }) => tableDesignSlice
    );

    const dispatch = useDispatch();
    const cacheDatasRef = useRef({
        hasBindEvent: false,
        spread,
        dsList,
        tableNameIndex: 0,
    });
    window.mySpread = spread;
    cacheDatasRef.current.spread = spread;
    cacheDatasRef.current.dsList = dsList;
    useEffect(
        function () {
            if (!spread) {
                return;
            }
            subContextMenuActions({ spread, dispatch, context });
        },
        [spread]
    );
    useEffect(function () {
        if (!cacheDatasRef.current.hasBindEvent) {
            cacheDatasRef.current.hasBindEvent = true;
            let dragged = null;
            document.addEventListener(
                'dragstart',
                function (ev) {
                    console.log(ev.target, '目标元素');
                    if (ev?.target) {
                        // 存储相关的拖拽元素
                        dragged = ev.target;
                        // 设置拖拽元素的透明度
                        ev.target.style.opacity = 0.5;
                    }
                },
                false
            );
            /* 事件在拖拽元素上触发 */
            document.addEventListener(
                'dragend',
                function (event) {
                    // 重设透明度

                    dragged && (dragged.style.opacity = 1);
                },
                false
            );

            //drag 事件在用户拖动元素或选择的文本时，每隔几百毫秒就会被触发一次。
            document.addEventListener(
                'drag',
                function (event) {
                    const childrenCount = Number(dragged.dataset.childrenCount);
                    const { spread } = cacheDatasRef.current;
                    if (!spread) {
                        return;
                    }
                    const { cell, row, col, rowCount, colCount } =
                        getCellInfo({
                            event,
                            spread,
                        }) || {};
                    if (!cell) {
                        return;
                    }
                    const GC = getNamespace();
                    const cellRange = new GC.Spread.Sheets.Range(
                        row,
                        col,
                        childrenCount > 0 ? 1 : rowCount,
                        childrenCount > 0 ? childrenCount : colCount
                    );
                    highlightBlock(spread, cellRange);
                },
                false
            );

            /* 事件在目标区域触发 */
            document.addEventListener(
                'dragover',
                function (event) {
                    // 默认情况下是无法允许一个元素放置在另一个元素上的，要放置必须阻止默认行为
                    event.preventDefault();
                },
                false
            );

            /* 事件在目标区域触发 */
            document.addEventListener(
                'dragenter',
                function (event) {
                    // 当拖拽元素进入潜在放置区域时可以在这做优化提示。例如高亮处理
                    console.log('dragenter');
                },
                false
            );

            /* 事件在目标区域触发 */
            document.addEventListener(
                'dragleave',
                function (event) {
                    // 当拖拽元素离开潜在放置区域时重置该目标区域的样式。例如高亮
                },
                false
            );

            /* 松开鼠标，触发 drop */
            document.addEventListener('drop', function (event) {
                try {
                    // 阻止默认行为（drop的默认处理方式是当初链接处理）
                    event.preventDefault();

                    dragged.style.opacity = 1;

                    // 把拖拽元素移入目标区域
                    //获取拖动物理在屏幕的位置
                    const { spread, dsList } = cacheDatasRef.current;
                    const { cell, row, col } = getCellInfo({ event, spread });
                    if (!cell) {
                        return true;
                    }
                    spread.suspendPaint();
                    const sheet = spread.getActiveSheet();
                    //获取拖动块的值
                    const parentId = dragged.dataset.itemParentId;
                    const itemId = dragged.dataset.itemId;
                    let current = null;
                    let parent = null;
                    if (parentId) {
                        parent = findTreeNodeById(parentId, dsList);
                        const children = Array.isArray(parent.children)
                            ? parent.children
                            : [];
                        current = children.find(function (item) {
                            return item.id === itemId;
                        });
                    } else {
                        current = findTreeNodeById(itemId, dsList);
                    }

                    const dataPath = getPath(current, dsList);
                    const GC = getNamespace();
                    const spreadNS = GC.Spread.Sheets;
                    if (current.type === 'table') {
                        /*  addTable({
                            columnsTemp: current.children,
                            sheet,
                            spreadNS,
                            dispatch,
                            row,
                            col,
                            dataPath,
                            filterButtonVisible,
                        }); */

                        test({
                            columnsTemp: current.children,
                            sheet,
                            dispatch,
                            row,
                            col,
                            dataPath,
                            dsName: current.name,
                        });
                    } else {
                        const bindingPathCellType = new BindingPathCellType();
                        cell.bindingPath(dataPath).cellType(
                            bindingPathCellType
                        );
                        cell.value(`[${current.name}]`);
                        if (dataPath.includes('.')) {
                            const parent = findTreeNodeById(
                                current.parentId,
                                dsList
                            );
                            cell.value(`[${parent?.name}.${current?.name}]`);
                        }
                        debugger;
                        setCellTag(sheet, row, col, 'bindInfo', {
                            bindType: 'cell',
                            bindDsInstanceId: itemId,
                        });
                    }
                } catch (error) {
                } finally {
                    if (cacheDatasRef?.current?.spread?.resumePaint) {
                        cacheDatasRef.current.spread.resumePaint();
                        removeHighlightOneBlock();
                    }
                }
            });
        }
    }, []);
    return (
        <>
            {showHyperlink && <Hyperlink></Hyperlink>}
            <DialogDatasourcesEdit></DialogDatasourcesEdit>
            <DraggableDatasourcesBox>
                <DraggableDatasourcesHeander>
                    <div
                        style={{
                            width: '100%',
                            fontSize: '14px',
                            fontWeight: 'bold',
                        }}
                    >
                        数据源
                    </div>
                    {isAllowToView && (
                        <DatasourceIcon
                            onClick={function () {
                                const isShowData =
                                    context?.conf?.nav?.data !== false;
                                isShowData &&
                                    dispatch(setActive({ code: 'data' }));
                                dispatch(setIsShowDatasource());
                            }}
                        ></DatasourceIcon>
                    )}
                </DraggableDatasourcesHeander>
                <DraggableDatasourcesContent>
                    <Datasources
                        isShowAddSubDatasource={false}
                        draggable={true}
                    ></Datasources>
                </DraggableDatasourcesContent>
                <DraggableDatasourcesFooter></DraggableDatasourcesFooter>
            </DraggableDatasourcesBox>
        </>
    );
}
