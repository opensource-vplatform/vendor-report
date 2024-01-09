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
import {
  DatasourceListOl,
  DddSubDatasource,
  DelDatasource,
  ListItemText,
} from './ui.jsx';

//树形数据源列表

export default function Index(props) {
    const dispatch = useDispatch();
    const context = useContext(DesignerContext);
    //是否允许编辑数据源
    const isAllowToEdit = context?.conf?.dataSource?.allowToEdit !== false;
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
                                datas={children}
                                activeId={activeId}
                                click={click}
                                indent={2 * indent}
                                parentId={id}
                                isNotAllow={isNotAllow}
                                draggable={draggable}
                                parentType='table'
                                isShowAddSubDatasource={isShowAddSubDatasource}
                                activeSheetTablePath={activeSheetTablePath}
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
