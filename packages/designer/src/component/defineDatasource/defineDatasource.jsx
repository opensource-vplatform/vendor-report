import { useEffect, useRef, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import GC from '@grapecity/spread-sheets';

import {
    deleteDsList,
    pushDsList,
    saveBindInfos,
    toggleActiveDs,
    updateDslist,
} from '../../store/datasourceSlice/datasourceSlice';
import {
    findTreeNodeById,
    genUUID,
    hasSameNode,
} from '../../utils/commonUtil.js';
import {
    getCellInstanceId,
    getSheetInstanceId,
    setCellTag,
} from '../../utils/worksheetUtil.js';
import Dialog from '../dialog/Index.jsx';
import DropdownBox from '../dropdownBox/dropdownBox';
import LineSepatator from '../lineSeparator/lineSeparator';
import {
    addTable,
    BindingPathCellType,
    checkHasBind,
    getCellInfo,
    getChanged,
    getPath,
    preview,
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

    const draggableClass = ` ${
        draggable && parentType !== 'entity'
            ? 'draggable'
            : draggable
              ? 'notDraggable'
              : ''
    }`;
    return (
        <DatasourceListOl
            onClick={listClickHandler}
            style={{ width: width + 'px' }}
        >
            {datas.map(function (dataItem) {
                const { name, id, children, type } = dataItem;
                datasObj[id] = dataItem;
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
                            draggable={draggable && parentType !== 'entity'}
                        >
                            <div className='text'>{name || '-'}</div>
                            {type === 'entity' && isShowAddSubDatasource ? (
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
                        {type === 'entity' ? (
                            <DatasourceTree
                                datas={children}
                                activeId={activeId}
                                click={click}
                                indent={2 * indent}
                                parentId={id}
                                isNotAllow={isNotAllow}
                                draggable={draggable}
                                parentType='entity'
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
    const state = useSelector((state) => state);
    const {
        fontSlice: { spread },
        datasourceSlice: { dsList, bindInfos },
    } = state;
    const dispatch = useDispatch();
    console.log('bindInfos==>', bindInfos);
    const [opened, setOpened] = useState(false);

    const cacheDatasRef = useRef({
        hasBindEvent: false,
        spread,
        dsList,
        tableNameIndex: 0,
    });
    window.mySpread = spread;
    cacheDatasRef.current.spread = spread;
    cacheDatasRef.current.dsList = dsList;
    useEffect(function () {
        if (!cacheDatasRef.current.hasBindEvent) {
            cacheDatasRef.current.hasBindEvent = true;
            let dragged = null;
            const oldStyles = [];
            let lastRow = null,
                lastCol = null;
            document.addEventListener(
                'dragstart',
                function (ev) {
                    // 存储相关的拖拽元素
                    dragged = ev.target;
                    // 设置拖拽元素的透明度
                    ev.target.style.opacity = 0.5;
                },
                false
            );
            /* 事件在拖拽元素上触发 */
            document.addEventListener(
                'dragend',
                function (event) {
                    // 重设透明度
                    dragged.style.opacity = 1;
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

                    if (lastRow === row && lastCol === col) {
                        return;
                    }
                    //还原样式
                    while (oldStyles.length > 0) {
                        const { cell, value } = oldStyles.shift();
                        cell.backColor(value);
                    }
                    lastCol = col;
                    lastRow = row;
                    //存储旧样式
                    oldStyles.push({
                        cell,
                        value: cell.backColor(),
                        row,
                        col,
                    });

                    cell.backColor('#F7A711');
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
                // 阻止默认行为（drop的默认处理方式是当初链接处理）
                event.preventDefault();

                dragged.style.opacity = 1;
                while (oldStyles.length > 0) {
                    const { cell, value } = oldStyles.shift();
                    cell.backColor(value);
                }

                // 把拖拽元素移入目标区域
                //获取拖动物理在屏幕的位置
                const { spread, dsList } = cacheDatasRef.current;
                spread.suspendPaint();
                const { cell, row, col } = getCellInfo({ event, spread });
                if (!cell) {
                    return;
                }
                debugger;
                const sheet = spread.getActiveSheet();
                //获取拖动块的值
                const itemId = dragged.dataset.itemId;
                const current = findTreeNodeById(itemId, dsList);

                const dataPath = getPath(current, dsList);
                const spreadNS = GC.Spread.Sheets;

                const cellInstanceId = getCellInstanceId(sheet, row, col);
                const sheetInstanceId = getSheetInstanceId(sheet);

                if (current.type === 'entity') {
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
                } else {
                    const bindingPathCellType = new BindingPathCellType();
                    cell.bindingPath(dataPath).cellType(bindingPathCellType);
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
                spread.resumePaint();
            });
        }
    }, []);
    return (
        <>
            {opened ? (
                <Dialog
                    open={true}
                    width='100%'
                    height='100%'
                    onClose={function () {
                        setOpened(false);
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
                <span
                    style={{
                        backgroundColor: '#f6f6f6',
                        borderBottom: '1px solid #ababab',
                        height: '32px',
                        lineHeight: '32px',
                    }}
                    onClick={function () {
                        setOpened(!opened);
                    }}
                >
                    数据源
                </span>
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
                        /* const sheet = spread.getActiveSheet();
                        const spreadNS = GC.Spread.Sheets;
                        let source = new spreadNS.Bindings.CellBindingSource({
                            name: 'zona',
                            age: 18,
                            work: [
                                {
                                    startDate: '2001',
                                    endDate: '2010',
                                    companyName: 'A公司',
                                },
                                {
                                    startDate: '2011',
                                    endDate: '2020',
                                    companyName: 'B公司',
                                },
                            ],
                        });
                        sheet.setDataSource(source); */
                        preview({
                            spread,
                            state,
                            dispatch,
                        });
                    }}
                >
                    测试预览
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

//编辑
function Index(props) {
    const dispatch = useDispatch();
    const [isShowConfirmDialog, setIsShowConfirmDialog] = useState(false);
    const cacheDatasRef = useRef({
        updated: [],
    });
    let {
        fontSlice: { spread },
        datasourceSlice: { dsList, bindInfos, activeDs, finalDsList },
    } = useSelector((state) => state);
    if (!activeDs.id && dsList.length > 0) {
        activeDs = dsList[0];
    }
    const datasourceTypeDatas = [
        { value: 'string', text: '字符串' },
        { value: 'entity', text: '实体' },
    ];

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
                    {activeDs.parentId ? (
                        ''
                    ) : (
                        <>
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
                                        };
                                        dispatch(updateDslist({ newData }));
                                    }}
                                >
                                    <div className={`uiText show`}>
                                        {activeDs.type === 'string'
                                            ? '字符串'
                                            : '实体'}
                                    </div>
                                    <div className='uiArrowBox'>
                                        <span className='uiArrow'></span>
                                    </div>
                                </DropdownBox>
                            </div>
                        </>
                    )}

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
