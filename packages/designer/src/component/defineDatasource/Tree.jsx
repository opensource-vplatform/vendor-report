import {
  useContext,
  useRef,
} from 'react';

import { useDispatch } from 'react-redux';

import {
  deleteDsList,
  pushDsList,
} from '@store/datasourceSlice/datasourceSlice';
import { genUUID } from '@utils/commonUtil.js';

import DesignerContext from '../../DesignerContext.jsx';
import { rawData } from './constant.js';
import {
  DatasourceListOl,
  DddSubDatasource,
  DelDatasource,
  ListItemText,
} from './ui.jsx';

//树形数据源列表

export default function Index(props) {
    debugger;
    const dispatch = useDispatch();
    const context = useContext(DesignerContext);
    //是否允许编辑数据源

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
        activeSheetTablePath = {},
        notAllowEdit = true,
        onDoubleClick,
        disabledTypes = [],
        parentDisabled = false,
    } = props;

    let isAllowToEdit = context?.conf?.dataSource?.allowToEdit !== false;
    if (!notAllowEdit) {
        isAllowToEdit = false;
    }

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
            ...rawData,
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

    const listDoubleClickHandler = function (data) {
        if (typeof onDoubleClick === 'function') {
            onDoubleClick(data);
        }
    };

    return (
        <DatasourceListOl
            onClick={listClickHandler}
            style={{ width: width + 'px' }}
        >
            {datas.map(function (dataItem) {
                const { name, id, children, type, code } = dataItem;
                datasObj[id] = dataItem;

                let draggableClass = '';
                let isDraggable = draggable;
                if (draggable && parentType !== 'table') {
                    draggableClass = 'draggable';
                    if (
                        type === 'table' &&
                        (!Array.isArray(children) ||
                            children.length === 0 ||
                            activeSheetTablePath[code])
                    ) {
                        draggableClass = 'notDraggable';
                        isDraggable = false;
                    }
                } else if (draggable) {
                    draggableClass = 'notDraggable';
                    isDraggable = false;
                }
                const disabled = disabledTypes.includes(type);
                if (disabled || parentDisabled) {
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
                            onDoubleClick={function () {
                                if (
                                    draggableClass === 'notDraggable' ||
                                    parentType === 'table'
                                ) {
                                    return;
                                }
                                listDoubleClickHandler(dataItem);
                            }}
                        >
                            <div
                                className={`text ${
                                    type === 'text' ? 'string' : type
                                }`}
                            >
                                {name || '-'}
                            </div>
                            {type === 'table' && isShowAddSubDatasource
                                ? isAllowToEdit && (
                                      <DddSubDatasource
                                          data-not-allow={isNotAllow}
                                          onClick={addSubDatasourceClickHandler}
                                      ></DddSubDatasource>
                                  )
                                : ''}
                            {isShowAddSubDatasource
                                ? isAllowToEdit && (
                                      <DelDatasource
                                          data-item-id={id}
                                          onClick={delDatasourceClickHandler}
                                      ></DelDatasource>
                                  )
                                : ''}
                        </ListItemText>
                        {type === 'table' ? (
                            <Index
                                {...props}
                                datas={children}
                                indent={2 * indent}
                                parentId={id}
                                parentType='table'
                                parentDisabled={disabled}
                            ></Index>
                        ) : (
                            ''
                        )}
                    </li>
                );
            })}
        </DatasourceListOl>
    );
}
