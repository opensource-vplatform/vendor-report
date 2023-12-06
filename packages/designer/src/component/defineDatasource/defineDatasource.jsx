import './defineDatasource.scss';

import {
  useEffect,
  useRef,
} from 'react';

import {
  useDispatch,
  useSelector,
} from 'react-redux';

import GC from '@grapecity/spread-sheets';

import {
  pushDsList,
  toggleActiveDs,
  updateDslist,
} from '../../store/datasourceSlice/datasourceSlice';
import {
  findTreeNodeById,
  genUUID,
  hasSameNode,
} from '../../utils/commonUtil.js';
import DropdownBox from '../dropdownBox/dropdownBox';
import LineSepatator from '../lineSeparator/lineSeparator';

class BindingPathCellType extends GC.Spread.Sheets.CellTypes.Text {
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

function DatasourceTree(props) {
    const dispatch = useDispatch();
    const {
        datas,
        activeId,
        click,
        indent = 10,
        isNotAllow = false,
        isShowAddSubDatasource = true,
        width,
        draggable = false,
    } = props;
    if (!Array.isArray(datas)) {
        return '';
    }
    const datasObj = useRef({}).current;
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
    return (
        <ol
            className='datasourceList'
            onClick={listClickHandler}
            style={{ width: width + 'px' }}
        >
            {datas.map(function (dataItem) {
                const { name, id, children, type, path, code } = dataItem;
                const newPath = path ? `${path}.${code}` : code;
                datasObj[id] = dataItem;
                return (
                    <li
                        className={`listItem ${draggable ? 'draggable' : ''}`}
                        key={id}
                        data-item-id={id}
                    >
                        <div
                            className={`listItemText  ${
                                id === activeId ? 'active' : ''
                            }`}
                            data-item-id={id}
                            data-path={newPath}
                            style={{ paddingLeft: indent + 'px' }}
                            draggable={draggable}
                        >
                            <div className='text'>{name || '-'}</div>
                            {type === 'entity' && isShowAddSubDatasource ? (
                                <div
                                    className={`addSubDatasource  ${
                                        isNotAllow ? 'notAllow' : ''
                                    }`}
                                    onClick={addSubDatasourceClickHandler}
                                ></div>
                            ) : (
                                ''
                            )}
                        </div>
                        <DatasourceTree
                            datas={children}
                            activeId={activeId}
                            click={click}
                            indent={2 * indent}
                            parentId={id}
                            isNotAllow={isNotAllow}
                            draggable={draggable}
                        ></DatasourceTree>
                    </li>
                );
            })}
        </ol>
    );
}

export function DatasourceList(props) {
    const {
        activeId,
        click,
        isShowAddSubDatasource = true,
        width,
        draggable,
    } = props;
    let { dsList, activeDs } = useSelector(
        ({ datasourceSlice }) => datasourceSlice
    );
    if (!activeDs.id && dsList.length > 0) {
        activeDs = dsList[0];
    }
    const isCanBeSaved = activeDs.code && activeDs.name;
    const isNotAllow =
        (activeDs.id && activeDs.optType === 'add') || !isCanBeSaved;
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

export function DraggableDatasourceList() {
    const {
        fontSlice: { spread },
        datasourceSlice: { dsList },
    } = useSelector((state) => state);

    const cacheDatasRef = useRef({
        hasBindEvent: false,
        spread,
        dsList,
    });
    cacheDatasRef.current.spread = spread;
    cacheDatasRef.current.dsList = dsList;
    useEffect(function () {
        if (!cacheDatasRef.current.hasBindEvent) {
            cacheDatasRef.current.hasBindEvent = true;
            let dragged = null;

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
                    debugger;
                    dragged.style.opacity = 1;
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
                // 阻止默认行为（drop的默认处理方式是当初链接处理）
                event.preventDefault();
                // 把拖拽元素移入目标区域
                //获取拖动物理在屏幕的位置
                const { spread, dsList } = cacheDatasRef.current;
                const targetElement = spread.getHost();
                debugger;
                const { x: offsetLeft, y: offsetTop } =
                    targetElement.getBoundingClientRect();
                //获取拖动块的值
                const itemId = dragged.dataset.itemId;
                const current = findTreeNodeById(itemId, dsList);

                //根据坐标获取单元格
                const x = event.pageX - offsetLeft;
                const y = event.pageY - offsetTop;

                const target = spread.hitTest(x, y);
                const { row, col } = target.worksheetHitInfo;

                //目标区域中不存在单元格，则退出
                if (typeof row !== 'number' || typeof col !== 'number') {
                    return;
                }

                const sheet = spread.getActiveSheet();
                const dataPath = dragged.dataset.path;
                const spreadNS = GC.Spread.Sheets;
                if (current.type === 'entity') {
                    const tableColumnsCount = Array.isArray(current.children)
                        ? current.children.length
                        : 0;

                    const columnCount = sheet.getColumnCount(
                        spreadNS.SheetArea.viewport
                    );
                    if (col + tableColumnsCount > columnCount) {
                        sheet.addColumns(col, tableColumnsCount - 1);
                    }

                    const table = sheet.tables.add(
                        'tableRecordds',
                        row,
                        col,
                        10,
                        tableColumnsCount,
                        spreadNS.Tables.TableThemes.light6
                    );

                    table.autoGenerateColumns(false);

                    if (Array.isArray(current.children)) {
                        const tableColumns = [];
                        current.children.forEach(function ({ name, code }) {
                            const tableColumn = new spreadNS.Tables.TableColumn(
                                genUUID(),
                                code,
                                name
                            );
                            tableColumns.push(tableColumn);
                        });

                        tableColumns.length > 0 &&
                            table.bindColumns(tableColumns);
                    }

                    table.bindingPath(dataPath);
                } else {
                    const bindingPathCellType = new BindingPathCellType();
                    sheet
                        .getCell(row, col)
                        .bindingPath(dataPath)
                        .cellType(bindingPathCellType);
                }

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
                sheet.autoGenerateColumns = true;
                sheet.setDataSource(source);
            });
        }
    }, []);
    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                textAlign: 'center',
            }}
        >
            <span
                style={{
                    backgroundColor: '#f6f6f6',
                    borderBottom: '1px solid #ababab',
                }}
            >
                数据源
            </span>
            <DatasourceList
                isShowAddSubDatasource={false}
                width={200}
                draggable={true}
            ></DatasourceList>
            <span
                style={{
                    height: '26px',
                    background: '#f6f6f6',
                    marginTop: 'auto',
                    borderTop: '1px solid #ababab',
                }}
            ></span>
        </div>
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
    optType: 'add',
};

function Index(props) {
    const dispatch = useDispatch();
    let { dsList, activeDs } = useSelector(
        ({ datasourceSlice }) => datasourceSlice
    );
    if (!activeDs.id && dsList.length > 0) {
        activeDs = dsList[0];
    }
    const datasourceTypeDatas = [
        { value: 'a', text: '字符串' },
        { value: 'b', text: '实体' },
    ];

    const isCanBeSaved = activeDs.code && activeDs.name;

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
            optType: '',
        };
        dispatch(updateDslist({ newData }));
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
            saveBtnClickHandler();
            dispatch(toggleActiveDs({ dataItemId: data.id }));
        }
    };

    return (
        <div className='defineDatasourceBox'>
            <h1>数据源</h1>
            <LineSepatator type='horizontal'></LineSepatator>
            <div className='defineDatasourceOptBox'>
                <div className='defineDatasourceOptBoxLeft'>
                    <div className='header'>
                        <div
                            className={`addDatasource  ${
                                (activeDs.id && activeDs.optType === 'add') ||
                                !isCanBeSaved
                                    ? 'notAllow'
                                    : ''
                            }`}
                            onClick={addDatasourceClickHandler}
                        >
                            添加
                        </div>
                    </div>
                    <DatasourceList
                        activeId={activeDs.id}
                        click={datasourceListClickHandler}
                    ></DatasourceList>
                </div>
                <div
                    className={`defineDatasourceOptBoxRight ${
                        activeDs.id ? '' : 'notAllow'
                    }`}
                >
                    <div className='optBtnBox'>
                        <button
                            className={`saveBtn ${
                                isCanBeSaved ? '' : 'notAllow'
                            }`}
                            onClick={saveBtnClickHandler}
                        >
                            保存
                        </button>
                    </div>
                    <div>编码</div>
                    <div>
                        <input
                            className='hint'
                            type='text'
                            value={activeDs.code || ''}
                            onChange={dataChangeHandler}
                            onBlur={checkIsUnique}
                            data-item-type='code'
                            maxLength={20}
                            data-hint-msg='编码不能重复'
                        />
                    </div>
                    <div>名称</div>
                    <div>
                        <input
                            type='text'
                            value={activeDs.name}
                            onChange={dataChangeHandler}
                            data-item-type='name'
                            maxLength={80}
                        />
                    </div>
                    <div>类型</div>
                    <div>
                        <DropdownBox
                            datas={datasourceTypeDatas}
                            className='datasourceType'
                            style={{ minWidth: '500px' }}
                        ></DropdownBox>
                    </div>
                    <div>描述</div>
                    <div>
                        <textarea
                            onChange={dataChangeHandler}
                            value={activeDs.desc}
                            data-item-type='desc'
                            maxLength={200}
                        ></textarea>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Index;
