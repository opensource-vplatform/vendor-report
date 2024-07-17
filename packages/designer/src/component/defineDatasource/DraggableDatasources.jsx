import {
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';

import {
  useDispatch,
  useSelector,
} from 'react-redux';

import { Commands } from '@commands/index';
import Hyperlink from '@components/hyperlink';
import {
  bind,
  EVENTS,
} from '@event/EventManager';
import DatasourceIcon from '@icons/data/datasource';
import {
  setDatasourceSelectorVisible,
  setIsShowDatasource,
  toggleBooleanValue,
  updateActiveSheetTablePath,
} from '@store/datasourceSlice/datasourceSlice';
import { setActive } from '@store/navSlice/navSlice';
import {
  isArray,
  uuid,
} from '@toone/report-util';
import {
  findTreeNodeByPath,
  getActiveSheetTablesPath,
} from '@utils/commonUtil.js';
import {
  getDataSourceConfig,
  getNavConfig,
} from '@utils/configUtil';
import {
  exeCommand,
  getNamespace,
} from '@utils/spreadUtil';
import { setTableCornerMarks } from '@utils/tableUtil.js';
import { getActiveIndexBySheet } from '@utils/worksheetUtil';

import DesignerContext from '../../DesignerContext.jsx';
import DownIcon from '../../icons/arrow/Down';
import RightIcon from '../../icons/arrow/Right';
import AddIcon from '../../icons/shape/Add.jsx';
import { isFormula } from '../../utils/formulaUtil.js';
import Datasources from './Datasources.jsx';
import DatasourceSelector from './DatasourceSelector.jsx';
import DialogDatasourcesEdit from './DialogDatasourcesEdit.jsx';
import {
  DraggableDatasourcesBox,
  DraggableDatasourcesContent,
  DraggableDatasourcesFooter,
  DraggableDatasourcesHeander,
} from './ui.jsx';
import {
  bindingPath,
  bindingTablePathHandler,
  getCellInfo,
  highlightBlock,
  removeHighlightOneBlock,
} from './utils/utils.js';

//删除表格
function removeTable(params) {
  const { dispatch, context, spread, tableName } = params;
  const sheet = spread.getActiveSheet();
  const table = sheet.tables.findByName(tableName);
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
      isArray(selections) &&
        selections.forEach(function ({ col, row, colCount, rowCount }) {
          const endRow = row + rowCount;
          const endCol = col + colCount;
          for (let rowIndex = row; rowIndex < endRow; rowIndex++) {
            for (let colIndex = col; colIndex < endCol; colIndex++) {
              //清除绑定的数据源
              if (activeSheet.getBindingPath(rowIndex, colIndex)) {
                activeSheet.setBindingPath(rowIndex, colIndex, '');
                activeSheet.getCell(rowIndex, colIndex).tag('');
              } else if (activeSheet.getCell(rowIndex, colIndex).tag()) {
                //清除单元格插件
                activeSheet.getCell(rowIndex, colIndex).tag('');
                activeSheet.resumePaint();
              }

              //清除角标
              const style = activeSheet.getStyle(rowIndex, colIndex);
              if (style?.decoration) {
                delete style.decoration;
                activeSheet.setStyle(rowIndex, colIndex, style);
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
          const sheetRowCount = sheet.getRowCount(spreadNS.SheetArea.viewport);
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
  const { spread } = useSelector(({ appSlice }) => appSlice);
  const { dsList, showHyperlink, datasourceSelectorVisible } = useSelector(
    ({ datasourceSlice }) => datasourceSlice
  );

  const context = useContext(DesignerContext);
  //是否允许查看数据源
  const isAllowToView = !getDataSourceConfig(context, 'allowToView');

  const isAllowSelect = !getDataSourceConfig(context, 'allowToSelect');

  const dispatch = useDispatch();

  const cacheDatasRef = useRef({
    hasBindEvent: false,
    spread,
    dsList,
    tableNameIndex: 0,
    caretOffset: 0,
    currentClickBar: true,
    currentformulaValue: '',
    notChangecurrentClickBar: false,
  });

  const [treeOpenTrigger, setTreeOpenTrigger] = useState(Promise.resolve(true));

  const [openInfos, setOpenInfos] = useState({});
  const isOpenAll = Object.values(openInfos).some(function (val) {
    return val;
  });

  const openAll = function () {
    const result = Object.values(openInfos).some(function (val) {
      return val;
    });
    setOpenInfos({});
    setTreeOpenTrigger(Promise.resolve(!result));
  };

  const setOpenInfo = function (id, value) {
    setOpenInfos({
      ...openInfos,
      [id]: value,
    });
  };

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

  useEffect(() => {
    const id = uuid();
    const unBindHandler = bind({
      id,
      event: EVENTS.EditEnding,
      handler: (args) => {
        // console.log('editEnding', args);
        const editingText = args.editingText || '';
        if (isFormula(editingText)) {
          console.log('formula');
          cacheDatasRef.current.currentformulaValue = editingText.slice(1);
          setTimeout(() => {
            cacheDatasRef.current.currentformulaValue = '';
          }, 500);
        } else {
          cacheDatasRef.current.currentformulaValue = '';
        }
        let index = 1;
        if (cacheDatasRef.current.currentClickBar) index = 0;
        let element = document.getElementsByClassName(
          'gcsj-func-color-content'
        )[index];

        if (element !== undefined) {
          var caretOffset = {};
          var doc = element.ownerDocument || element.document;
          var win = doc.defaultView || doc.parentWindow;
          var sel;
          // 谷歌、火狐
          if (typeof win.getSelection != 'undefined') {
            sel = win.getSelection();
            // 选中的区域
            if (sel.rangeCount > 0) {
              var range = win.getSelection().getRangeAt(0);
              var preCaretRange = range.cloneRange();
              preCaretRange.selectNodeContents(element);
              preCaretRange.setEnd(range.endContainer, range.endOffset);
              caretOffset = preCaretRange.toString().length;
            }
            // IE
          } else if ((sel = doc.selection) && sel.type != 'Control') {
            let textRange = sel.createRange();
            let preCaretTextRange = doc.body.createTextRange();
            preCaretTextRange.moveToElementText(element);
            preCaretTextRange.setEndPoint('EndToStart', textRange);
            caretOffset = preCaretTextRange.text.length;
          }

          cacheDatasRef.current.caretOffset = caretOffset;
        }
      },
    });
    return unBindHandler;
  }, []);
  useEffect(() => {
    const id = uuid();
    const unBindHandler = bind({
      id,
      event: EVENTS.CellDoubleClick,
      handler: () => {
        // 记录点击单元格编辑表达式
        cacheDatasRef.current.currentClickBar = false;
      },
    });
    return unBindHandler;
  }, []);
  useEffect(() => {
    const id = uuid();
    const unBindHandler = bind({
      id,
      event: EVENTS.EditStarting,
      handler: () => {
        // 记录点击表达式框
        if (!cacheDatasRef.current.notChangecurrentClickBar)
          cacheDatasRef.current.currentClickBar = true;
      },
    });
    return unBindHandler;
  }, []);
  const setCellBindPath = () => {};

  /**
   * 光标移动到指定位置
   *
   * @param {number} index - 光标索引值
   */
  const moveCursorToCharIndex = (index) => {
    let editableDiv = document.getElementsByClassName(
      'gcsj-func-color-content'
    )[cacheDatasRef.current.currentClickBar ? 0 : 1];
    var charCount = 0;

    function traverseNodes(node) {
      if (node.nodeType === Node.TEXT_NODE) {
        var textLength = node.textContent.length;
        if (charCount + textLength >= index) {
          var range = document.createRange();
          range.setStart(node, index - charCount);
          range.collapse(true);

          var selection = window.getSelection();
          selection.removeAllRanges();
          selection.addRange(range);
          try {
            editableDiv.parentElement.parentElement.parentElement.focus();
            // Ensure the cursor is in the visible area
            const cursorRect = range.getBoundingClientRect();
            const divRect =
              editableDiv.parentElement.parentElement.parentElement.getBoundingClientRect();
            if (cursorRect.left < divRect.left) {
              editableDiv.parentElement.parentElement.parentElement.scrollLeft -=
                divRect.left - cursorRect.left;
            } else if (cursorRect.right > divRect.right) {
              editableDiv.parentElement.parentElement.parentElement.scrollLeft +=
                cursorRect.right - divRect.right;
            }
            editableDiv.parentElement.parentElement.parentElement.scrollLeft += 20;
          } catch (err) {}
          return true;
        } else {
          charCount += textLength;
        }
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        for (var i = 0; i < node.childNodes.length; i++) {
          if (traverseNodes(node.childNodes[i])) {
            return true;
          }
        }
      }
      return false;
    }

    traverseNodes(editableDiv);
  };

  useEffect(function () {
    if (!cacheDatasRef.current.hasBindEvent) {
      cacheDatasRef.current.hasBindEvent = true;
      let dragged = null;
      document.addEventListener(
        'dragstart',
        function (ev) {
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
          const $Path = dragged.dataset.itemPath;
          const $PathName = dragged.dataset.itemPathName;
          let current = findTreeNodeByPath($Path, dsList);
          console.log(current, 11);
          if (current.type === 'table' || current.type === 'map') {
            let columnsTemp = current.children;
            exeCommand(spread, Commands.CellType.BindingPath, {
              handler() {
                bindingTablePathHandler({
                  columnsTemp,
                  sheet,
                  dispatch,
                  row,
                  col,
                  path: $Path,
                  pathName: $PathName,
                  context,
                });
              },
            });
          } else {
            exeCommand(spread, Commands.CellType.BindingPath, {
              handler() {
                bindingPath({
                  row,
                  col,
                  sheet,
                  context,
                  value: `[${$PathName}]`,
                  path: $Path,
                });
              },
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
  const handleDbClick = (node) => {
    if (!node || (node.children && node.children.length > 0)) {
      //双击实体节点不做任何处理
      return;
    }
    //数据源双击，对选中单元格进行字段绑定，如果当前单元格有函数，则作为函数参数
    const sheet = spread.getActiveSheet();

    if (sheet) {
      const { $Path, $PathName } = node;
      const { row, col } = getActiveIndexBySheet(sheet);
      const cell = sheet.getCell(row, col);
      let formula = cacheDatasRef.current.currentformulaValue || cell.formula();
      if (formula) {
        const parameters = $Path.split('.').reduce((res, cur) => {
          if (res) {
            return `${res},"${cur}"`;
          } else {
            return `"${cur}"`;
          }
        }, '');

        let txt = `TOONE.GET(${parameters})`;
        const handleFormula = (formula, flag) => {
          formula = formula.trim();
          const lastIndex = formula.length - 1;
          const char = formula.charAt(lastIndex);
          if (char == ')' && !flag) {
            formula = formula.substring(0, lastIndex);
            formula = handleFormula(formula, true) + ')';
          } else if (char == '(') {
            formula += txt;
          } else {
            let startStrHasComma =
              formula.slice(
                cacheDatasRef.current.caretOffset - 2,
                cacheDatasRef.current.caretOffset - 1
              ) == ',';
            let endStrHasComma =
              formula.slice(
                cacheDatasRef.current.caretOffset - 1,
                cacheDatasRef.current.caretOffset
              ) == ',';

            //补全","
            if (
              !startStrHasComma &&
              formula.slice(
                cacheDatasRef.current.caretOffset - 2,
                cacheDatasRef.current.caretOffset - 1
              ) !== '('
            ) {
              txt = ',' + txt;
            }
            if (
              !endStrHasComma &&
              cacheDatasRef.current.caretOffset - 1 !== formula.length
            ) {
              txt = txt + ',';
            }
            formula =
              formula.slice(0, cacheDatasRef.current.caretOffset - 1) +
              txt +
              formula.slice(cacheDatasRef.current.caretOffset - 1);
          }

          return formula;
        };
        formula = handleFormula(formula);
        cell.formula(formula);
        cacheDatasRef.current.notChangecurrentClickBar = true;
        sheet.startEdit(true);
        // 获取编辑控件并设置光标位置
        moveCursorToCharIndex(cacheDatasRef.current.caretOffset + txt.length);
        cacheDatasRef.current.notChangecurrentClickBar = false;
      } else {
        //单元格整个进行数据源绑定
        exeCommand(spread, Commands.CellType.BindingPath, {
          handler() {
            bindingPath({
              row,
              col,
              sheet,
              value: `[${$PathName}]`,
              path: $Path,
              context,
            });
          },
        });
      }
    }
  };
  return (
    <>
      {showHyperlink && <Hyperlink></Hyperlink>}
      <DialogDatasourcesEdit></DialogDatasourcesEdit>
      {datasourceSelectorVisible && <DatasourceSelector></DatasourceSelector>}
      <DraggableDatasourcesBox>
        <DraggableDatasourcesHeander>
          {isOpenAll ? (
            <DownIcon onClick={openAll}></DownIcon>
          ) : (
            <RightIcon onClick={openAll}></RightIcon>
          )}
          <div
            style={{
              width: '100%',
              fontSize: '12px',
              fontWeight: 'bold',
            }}
          >
            数据集
          </div>
          {isAllowSelect && (
            <AddIcon
              onClick={() => {
                dispatch(setDatasourceSelectorVisible(true));
              }}
            ></AddIcon>
          )}
          {isAllowToView && (
            <DatasourceIcon
              onClick={function () {
                !getNavConfig(context, 'data') &&
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
            onDoubleClick={handleDbClick}
            treeOpenTrigger={treeOpenTrigger}
            setOpenInfo={setOpenInfo}
          ></Datasources>
        </DraggableDatasourcesContent>
        <DraggableDatasourcesFooter></DraggableDatasourcesFooter>
      </DraggableDatasourcesBox>
    </>
  );
}
