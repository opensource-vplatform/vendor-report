import {
  useEffect,
  useRef,
  useState,
} from 'react';

import {
  useDispatch,
  useSelector,
} from 'react-redux';

import Dialog from '@components/dialog/Index.jsx';
import DropdownBox from '@components/dropdownBox/dropdownBox';
import LineSepatator from '@components/lineSeparator/lineSeparator';
import DatasourceIcon from '@icons/data/datasource';
import {
  deleteDsList,
  pushDsList,
  removeBindInfosByCellInstanceId,
  saveBindInfos,
  setIsShowDatasource,
  toggleActiveDs,
  updateDslist,
} from '@store/datasourceSlice/datasourceSlice';
import {
  setActive,
  showTab,
} from '@store/navSlice/navSlice';
import { setData } from '@store/tableDesignSlice/tableDesignSlice';
import {
  findTreeNodeById,
  genUUID,
  hasSameNode,
} from '@utils/commonUtil.js';
import { getNamespace } from '@utils/spreadUtil';
import { parseTable } from '@utils/tableUtil.js';
import {
  getCellInstanceId,
  getSheetInstanceId,
  setCellTag,
} from '@utils/worksheetUtil.js';

import { testTransform } from '../../../../plugins/transform.js';
import {
  addTable,
  BindingPathCellType,
  checkHasBind,
  getCellInfo,
  getChanged,
  getPath,
  highlightBlock,
  removeHighlightOneBlock,
  setTableCornerMarks,
} from './fun.js';
import {
  AddDatasourceBtn,
  ConfirmDialogBox,
  DatasourceBox,
  DatasourceListOl,
  DatasourceOptBox,
  DatasourceOptBoxLeft,
  DatasourceOptBoxRight,
  DddSubDatasource,
  DelDatasource,
  InputField,
  ListItemText,
  OptBtnBox,
  SaveBtn,
  TextareaField,
} from './ui.jsx';

//弹窗
function ConfirmDialog(props) {
    const { onCancle, onConfirm } = props;
    function onClose() {
        if (typeof onCancle === 'function') {
            onCancle(false);
        }
    }

    function onClick() {
        if (typeof onConfirm === 'function') {
            onConfirm(true);
        }
    }
    return (
        <Dialog width='350px' height='150px' onClose={onClose}>
            <ConfirmDialogBox>
                <div>
                    之前绑定数据源与本次修改后的数据源不一致，将会同步修改，是否继续?
                </div>
                <button onClick={onClick}>确定</button>
            </ConfirmDialogBox>
        </Dialog>
    );
}

//树形数据源列表
function DatasourceTree(props) {
    const dispatch = useDispatch();
    const datasObj = useRef({}).current;
    const {
        datas,
        activeId,
        click,
        indent = 10,
        isNotAllow = false,
        isShowAddSubDatasource = true,
        width,
        draggable = false,
        parentType,
    } = props;
    if (!Array.isArray(datas)) {
        return '';
    }
    const listClickHandler = function (e) {
        if (typeof click === 'function') {
            const target = e.target.closest('.listItem');
            const itemId = target.dataset.itemId;
            click(datasObj[itemId]);
        }
    };
    const addSubDatasourceClickHandler = function (e) {
        e.stopPropagation();
        const id = genUUID();
        const target = e.target.closest('.listItem');
        const parentId = target.dataset.itemId;
        const newData = {
            ...initialDatasourceData,
            parentId,
            id,
        };

        dispatch(pushDsList({ datas: newData, parentId }));
    };

    const delDatasourceClickHandler = function (e) {
        e.stopPropagation();
        const itemId = e.target.dataset.itemId;
        dispatch(deleteDsList({ itemId }));
    };

    return (
        <DatasourceListOl
            onClick={listClickHandler}
            style={{ width: width + 'px' }}
        >
            {datas.map(function (dataItem) {
                const { name, id, children, type } = dataItem;
                datasObj[id] = dataItem;

                let draggableClass = '';
                let isDraggable = draggable;
                if (draggable && parentType !== 'table') {
                    draggableClass = 'draggable';
                    if (
                        type === 'table' &&
                        (!Array.isArray(children) || children.length === 0)
                    ) {
                        draggableClass = 'notDraggable';
                        isDraggable = false;
                    }
                } else if (draggable) {
                    draggableClass = 'notDraggable';
                    isDraggable = false;
                }

                return (
                    <li
                        className={`listItem ${draggableClass}`}
                        key={id}
                        data-item-id={id}
                    >
                        <ListItemText
                            className={`${
                                id === activeId ? 'active' : ''
                            } ${draggableClass}`}
                            data-item-id={id}
                            style={{ paddingLeft: indent + 'px' }}
                            draggable={isDraggable}
                            data-children-count={
                                type === 'table' && Array.isArray(children)
                                    ? children.length
                                    : 0
                            }
                        >
                            <div className='text'>{name || '-'}</div>
                            {type === 'table' && isShowAddSubDatasource ? (
                                <DddSubDatasource
                                    data-not-allow={isNotAllow}
                                    onClick={addSubDatasourceClickHandler}
                                ></DddSubDatasource>
                            ) : (
                                ''
                            )}
                            {isShowAddSubDatasource ? (
                                <DelDatasource
                                    data-item-id={id}
                                    onClick={delDatasourceClickHandler}
                                ></DelDatasource>
                            ) : (
                                ''
                            )}
                        </ListItemText>
                        {type === 'table' ? (
                            <DatasourceTree
                                datas={children}
                                activeId={activeId}
                                click={click}
                                indent={2 * indent}
                                parentId={id}
                                isNotAllow={isNotAllow}
                                draggable={draggable}
                                parentType='table'
                                isShowAddSubDatasource={isShowAddSubDatasource}
                            ></DatasourceTree>
                        ) : (
                            ''
                        )}
                    </li>
                );
            })}
        </DatasourceListOl>
    );
}

//数据源列表
export function DatasourceList(props) {
    const {
        activeId,
        click,
        isShowAddSubDatasource = true,
        width,
        draggable,
    } = props;
    let { dsList, activeDs, finalDsList } = useSelector(
        ({ datasourceSlice }) => datasourceSlice
    );
    if (draggable) {
        dsList = finalDsList;
    }
    if (!activeDs.id && dsList.length > 0) {
        activeDs = dsList[0];
    }
    const isCanBeSaved = activeDs.code && activeDs.name;
    const isNotAllow = !isCanBeSaved;
    return (
        <DatasourceTree
            width={width}
            datas={dsList}
            activeId={activeId}
            click={click}
            isNotAllow={isNotAllow}
            draggable={draggable}
            isShowAddSubDatasource={isShowAddSubDatasource}
        ></DatasourceTree>
    );
}

//可拖拽树形数据源列表
export function DraggableDatasourceList() {
    const { spread } = useSelector(({ fontSlice }) => fontSlice);

    const { dsList, isShowDatasource,finalDsList } = useSelector(
        ({ datasourceSlice }) => datasourceSlice
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
                }
            );

            let markWithRedBgCommand = {
                canUndo: false,
                execute: function (spread, infos, c /* boolean */) {
                    debugger;
                    const sheet = spread.getActiveSheet();
                    const table = sheet.tables.findByName(infos.tableName);
                    setTableCornerMarks({
                        setType: 'onlyRemove',
                        sheet,
                        ...table.range(),
                    });
                    sheet.tables.remove(table);
                },
            };
            commandManager.register(
                'tableDeleteAllForContextMenu',
                markWithRedBgCommand,
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
            {isShowDatasource ? (
                <Dialog
                    open={true}
                    width='100%'
                    height='100%'
                    onClose={function () {
                        dispatch(setIsShowDatasource());
                    }}
                >
                    <Index></Index>
                </Dialog>
            ) : (
                ''
            )}
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    textAlign: 'center',
                    borderRight: '1px solid #ababab',
                }}
            >
                <div
                    style={{
                        backgroundColor: '#f6f6f6',
                        borderBottom: '1px solid #ababab',
                        height: '32px',
                        lineHeight: '32px',
                        display: 'flex',
                        padding: '0 6px',
                    }}
                >
                    <div style={{ width: '100%' }}>数据源</div>
                    <DatasourceIcon
                        onClick={function () {
                            dispatch(setActive({ code: 'data' }));
                            dispatch(setIsShowDatasource());
                        }}
                    ></DatasourceIcon>
                </div>
                <DatasourceList
                    isShowAddSubDatasource={false}
                    width={350}
                    draggable={true}
                ></DatasourceList>
                <span
                    style={{
                        height: '27px',
                        background: '#f6f6f6',
                        marginTop: 'auto',
                        borderTop: '1px solid #ababab',
                    }}
                    onClick={function () {
                        window.localStorage.setItem(
                            'spreadJson',
                            JSON.stringify(spread.toJSON())
                        );

                        testTransform({
                            spreadJsonData: spread.toJSON(),
                            dsList:finalDsList,
                        });
                    }}
                >
                    保存数据源
                </span>
            </div>
        </>
    );
}

const initialDatasourceData = {
    id: '',
    value: '',
    type: 'string',
    desc: '',
    code: '',
    name: '',
    parentId: '',
};

const initDatasourceTypeDatas = [
    { value: 'text', text: '文本' },
    { value: 'integer', text: '整数' },
    { value: 'decimals', text: '小数' },
    { value: 'table', text: '表' },
];

//编辑
function Index(props) {
    const dispatch = useDispatch();
    const [isShowConfirmDialog, setIsShowConfirmDialog] = useState(false);
    const cacheDatasRef = useRef({
        updated: [],
    });

    let { spread } = useSelector(({ fontSlice }) => fontSlice);

    let { dsList, bindInfos, activeDs, finalDsList } = useSelector(
        ({ datasourceSlice }) => datasourceSlice
    );

    if (!activeDs.id && dsList.length > 0) {
        activeDs = dsList[0];
    }

    let datasourceTypeDatas = activeDs.parentId
        ? initDatasourceTypeDatas.filter(function (item) {
              return item.value !== 'table';
          })
        : [...initDatasourceTypeDatas];

    const isCanBeSaved = activeDs.code && activeDs.name;
    const isCanAdd = (isCanBeSaved && dsList.length > 0) || dsList.length === 0;

    //添加
    const addDatasourceClickHandler = function () {
        const id = genUUID();
        const newData = {
            ...initialDatasourceData,
            id,
        };
        dispatch(pushDsList({ datas: newData }));
    };

    //数据变化
    const dataChangeHandler = function (e) {
        const key = e.target.dataset.itemType;
        const value = e.target.value;
        if (value === activeDs[key]) {
            return;
        }
        console.log('onChange', e.target.value);
        const pattern = /^[a-zA-Z0-9_]+$/;
        if (key === 'code' && !pattern.test(value) && value) {
            e.target.value = activeDs[key];
            return;
        }
        const newData = {
            ...activeDs,
            [key]: value,
        };
        dispatch(updateDslist({ newData }));
    };

    //保存
    const saveBtnClickHandler = function () {
        if (!isCanBeSaved) {
            return;
        }
        const newData = {
            ...activeDs,
        };
        const { updated } = getChanged({
            dsList,
            finalDsList,
        });
        debugger;
        const result = checkHasBind({
            spread,
            bindInfos,
            updated,
            dsList,
        });

        cacheDatasRef.current.updated = updated;
        if (result) {
            setIsShowConfirmDialog(true);
        } else {
            dispatch(updateDslist({ newData, isSave: true }));
            dispatch(setIsShowDatasource());
        }
    };

    //校验编码是否唯一
    const checkIsUnique = function (e) {
        const _hasSameNode = hasSameNode(activeDs, dsList);
        if (_hasSameNode) {
            if (e?.target?.dataset?.itemType === 'code') {
                e?.target.focus();
            }
            return false;
        }
        return true;
    };

    //已有数据源点击事件(切换)
    const datasourceListClickHandler = function (data) {
        const result = checkIsUnique();
        if (!result) {
            return;
        }
        if (!isCanBeSaved) {
            return;
        }

        if (data && data.id !== activeDs.id && isCanBeSaved) {
            dispatch(toggleActiveDs({ dataItemId: data.id }));
        }
    };

    return (
        <DatasourceBox>
            {isShowConfirmDialog ? (
                <ConfirmDialog
                    onCancle={function () {
                        setIsShowConfirmDialog(false);
                    }}
                    onConfirm={function () {
                        setIsShowConfirmDialog(false);
                        const newData = {
                            ...activeDs,
                        };
                        dispatch(updateDslist({ newData, isSave: true }));
                        dispatch(setIsShowDatasource());
                        checkHasBind({
                            dispatch,
                            spread,
                            bindInfos,
                            dsList,
                            updated: cacheDatasRef.current.updated,
                            sync: true,
                        });
                        console.log('你确定了');
                    }}
                ></ConfirmDialog>
            ) : (
                ''
            )}
            <h1>数据源</h1>
            <LineSepatator type='horizontal'></LineSepatator>
            <DatasourceOptBox>
                <DatasourceOptBoxLeft>
                    <div className='header'>
                        <AddDatasourceBtn
                            data-not-allow={!isCanAdd}
                            onClick={addDatasourceClickHandler}
                        >
                            添加
                        </AddDatasourceBtn>
                    </div>
                    <DatasourceList
                        activeId={activeDs.id}
                        click={datasourceListClickHandler}
                    ></DatasourceList>
                </DatasourceOptBoxLeft>
                <DatasourceOptBoxRight
                    data-not-allow={activeDs.id ? false : true}
                >
                    <OptBtnBox>
                        <SaveBtn
                            data-not-allow={!isCanBeSaved}
                            onClick={saveBtnClickHandler}
                        >
                            保存
                        </SaveBtn>
                    </OptBtnBox>
                    <div>编码</div>
                    <div>
                        <InputField
                            type='text'
                            value={activeDs.code || ''}
                            onChange={dataChangeHandler}
                            onBlur={checkIsUnique}
                            data-item-type='code'
                            maxLength={20}
                        ></InputField>
                    </div>
                    <div>名称</div>
                    <div>
                        <InputField
                            type='text'
                            value={activeDs.name}
                            onChange={dataChangeHandler}
                            data-item-type='name'
                            maxLength={80}
                        ></InputField>
                    </div>
                    <div>类型</div>
                    <div>
                        <DropdownBox
                            datas={datasourceTypeDatas}
                            className='datasourceType'
                            style={{ minWidth: '500px' }}
                            release={true}
                            onChange={function (data) {
                                console.log(data);
                                const newData = {
                                    ...activeDs,
                                    type: data.value,
                                    typeName: data.text,
                                };
                                dispatch(updateDslist({ newData }));
                            }}
                        >
                            <div className={`uiText show`}>
                                {activeDs.typeName}
                            </div>
                            <div className='uiArrowBox'>
                                <span className='uiArrow'></span>
                            </div>
                        </DropdownBox>
                    </div>
                    <div>描述</div>
                    <div>
                        <TextareaField
                            onChange={dataChangeHandler}
                            value={activeDs.desc}
                            data-item-type='desc'
                            maxLength={200}
                        ></TextareaField>
                    </div>
                </DatasourceOptBoxRight>
            </DatasourceOptBox>
        </DatasourceBox>
    );
}

export default Index;
