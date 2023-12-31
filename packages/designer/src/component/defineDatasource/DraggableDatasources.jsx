import {
  useContext,
  useEffect,
  useRef,
} from 'react';

import {
  useDispatch,
  useSelector,
} from 'react-redux';

import DatasourceIcon from '@icons/data/datasource';
import {
  removeBindInfosByCellInstanceId,
  saveBindInfos,
  setIsShowDatasource,
  updateActiveSheetTablePath,
} from '@store/datasourceSlice/datasourceSlice';
import {
  setActive,
  showTab,
} from '@store/navSlice/navSlice';
import { setData } from '@store/tableDesignSlice/tableDesignSlice';
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
  getCellInstanceId,
  getSheetInstanceId,
  setCellTag,
} from '@utils/worksheetUtil.js';

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
  addTable,
  BindingPathCellType,
  getCellInfo,
  getPath,
  highlightBlock,
  removeHighlightOneBlock,
} from './utils/utils.js';

//可拖拽树形数据源列表
export default function Index() {
    const { spread } = useSelector(({ fontSlice }) => fontSlice);
    const { dsList } = useSelector(({ datasourceSlice }) => datasourceSlice);

    const context = useContext(DesignerContext);
    //是否允许查看数据源
    const isAllowToView = context?.conf?.dataSource?.allowToView !== false;
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

            //清除动作。当触发清除动作的时候，需要调用接口清除已经绑定的数据源路径
            const commandManager = spread.commandManager();
            commandManager.addListener(
                'gc.spread.contextMenu.clearContents',
                function ({ command: { selections } }) {
                    const activeSheet = spread.getActiveSheet();
                    Array.isArray(selections) &&
                        selections.forEach(function ({
                            col,
                            row,
                            colCount,
                            rowCount,
                        }) {
                            const endRow = row + rowCount;
                            const endCol = col + colCount;
                            for (
                                let rowIndex = row;
                                rowIndex < endRow;
                                rowIndex++
                            ) {
                                for (
                                    let colIndex = col;
                                    colIndex < endCol;
                                    colIndex++
                                ) {
                                    //清除绑定的数据源
                                    if (
                                        activeSheet.getBindingPath(
                                            rowIndex,
                                            colIndex
                                        )
                                    ) {
                                        activeSheet.setBindingPath(
                                            rowIndex,
                                            colIndex,
                                            ''
                                        );
                                        dispatch(
                                            removeBindInfosByCellInstanceId({
                                                cellInstanceId:
                                                    getCellInstanceId(
                                                        activeSheet,
                                                        rowIndex,
                                                        colIndex
                                                    ),
                                            })
                                        );
                                    }

                                    //清除角标
                                    const style = activeSheet.getStyle(
                                        rowIndex,
                                        colIndex
                                    );
                                    if (style) {
                                        if (
                                            style?.decoration?.cornerFold
                                                ?.markType === 'table'
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

            let tableDeleteAllCommand = {
                canUndo: false,
                execute: function (spread, infos, c /* boolean */) {
                    const sheet = spread.getActiveSheet();
                    const table = sheet.tables.findByName(infos.tableName);
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
                },
            };
            commandManager.register(
                'tableDeleteAllForContextMenu',
                tableDeleteAllCommand,
                null,
                false,
                false,
                false,
                false
            );
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
                    const { spread } = cacheDatasRef.current;
                    const { cell, row, col } =
                        getCellInfo({ event, spread }) || {};
                    if (!cell) {
                        return;
                    }
                    const childrenCount = Number(dragged.dataset.childrenCount);
                    const GC = getNamespace();
                    const cellRange = new GC.Spread.Sheets.Range(
                        row,
                        col,
                        1,
                        childrenCount > 0 ? childrenCount : 1
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
                    const itemId = dragged.dataset.itemId;
                    const current = findTreeNodeById(itemId, dsList);

                    const dataPath = getPath(current, dsList);
                    const GC = getNamespace();
                    const spreadNS = GC.Spread.Sheets;

                    const cellInstanceId = getCellInstanceId(sheet, row, col);
                    const sheetInstanceId = getSheetInstanceId(sheet);

                    if (current.type === 'table') {
                        addTable({
                            columnsTemp: current.children,
                            sheet,
                            spreadNS,
                            dispatch,
                            row,
                            col,
                            cellInstanceId,
                            sheetInstanceId,
                            dataPath,
                            itemId,
                        });
                        sheet.setActiveCell(row, col);
                        //切换到表设计视图
                        dispatch(showTab({ code: 'table' }));
                        dispatch(setData({ data: parseTable(sheet) }));
                        dispatch(setActive({ code: 'table' }));
                    } else {
                        const bindingPathCellType = new BindingPathCellType();
                        cell.bindingPath(dataPath).cellType(
                            bindingPathCellType
                        );
                        setCellTag(sheet, row, col, 'bindInfo', {
                            bindType: 'cell',
                            bindDsInstanceId: itemId,
                        });
                        dispatch(
                            saveBindInfos({
                                bindInfos: {
                                    row,
                                    col,
                                    path: dataPath,
                                    id: itemId,
                                    bindType: 'cell',
                                    cellInstanceId,
                                    sheetInstanceId,
                                },
                            })
                        );
                    }
                } catch (error) {
                } finally {
                    cacheDatasRef.current.spread.resumePaint();
                    removeHighlightOneBlock();
                }
            });
        }
    }, []);
    return (
        <>
            <DialogDatasourcesEdit></DialogDatasourcesEdit>
            <DraggableDatasourcesBox>
                <DraggableDatasourcesHeander>
                    <div style={{ width: '100%' }}>数据源</div>
                    {isAllowToView && (
                        <DatasourceIcon
                            onClick={function () {
                                dispatch(setActive({ code: 'data' }));
                                dispatch(setIsShowDatasource());
                            }}
                        ></DatasourceIcon>
                    )}
                </DraggableDatasourcesHeander>
                <DraggableDatasourcesContent>
                    <Datasources
                        isShowAddSubDatasource={false}
                        width={350}
                        draggable={true}
                    ></Datasources>
                </DraggableDatasourcesContent>
                <DraggableDatasourcesFooter></DraggableDatasourcesFooter>
            </DraggableDatasourcesBox>
        </>
    );
}
