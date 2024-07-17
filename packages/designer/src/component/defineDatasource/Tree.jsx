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

import {
  deleteDsList,
  pushDsList,
} from '@store/datasourceSlice/datasourceSlice';
import { Highlight } from '@toone/report-ui';
import {
  isArray,
  uuid,
} from '@toone/report-util';
import { getDataSourceConfig } from '@utils/configUtil';

import DesignerContext from '../../DesignerContext.jsx';
import DownIcon from '../../icons/arrow/Down';
import RightIcon from '../../icons/arrow/Right';
import { rawData } from './constant.js';
import {
  DatasourceListOl,
  DddSubDatasource,
  DelDatasource,
  ListItemText,
  NumberIcon,
  TableIcon,
  TextIcon,
  TreeSwitchWrap,
} from './ui.jsx';

const typeIcons = {
  table: TableIcon,
  text: TextIcon,
  integer: NumberIcon,
  decimals: NumberIcon,
};

function TreeSwitch(props) {
  const { isTable, isOpen, setOpen } = props;
  if (!isTable) {
    return null;
  }
  let Component = isOpen ? DownIcon : RightIcon;
  return (
    <TreeSwitchWrap className='treeSwitch'>
      <Component
        style={{
          width: '16px',
          height: '16px',
        }}
        onClick={function () {
          setOpen(!isOpen);
        }}
      ></Component>
    </TreeSwitchWrap>
  );
}

function Icon(props) {
  const { type } = props;
  const Icon = typeIcons[type];
  if (Icon) {
    return <Icon></Icon>;
  }
  return <div></div>;
}

function TreeItem(props) {
  const {
    id,
    draggableClass,
    parentId,
    indent = 0,
    children,
    listDoubleClickHandler,
    delDatasourceClickHandler,
    addSubDatasourceClickHandler,
    name,
    isShowAddSubDatasource = true,
    isAllowToEdit,
    originalDatasourceIds,
    type,
    activeId,
    isDraggable,
    searchKey,
    dataItem,
    disabled,
    treeOpenTrigger,
    setOpenInfo,
  } = props;

  const isTable = type === 'table' || type === 'map';

  let childrenCount = isTable && isArray(children) ? children.length : 0;

  const listItemTextClass = `${
    id === activeId ? 'active' : ''
  } ${draggableClass}`;

  const [isOpen, setOpen] = useState(true);

  useEffect(function () {
    setOpenInfo?.(id, isOpen);
  }, []);

  useEffect(
    function () {
      treeOpenTrigger &&
        treeOpenTrigger.then(function (value) {
          if (value !== isOpen) {
            setOpen(value);
            setOpenInfo?.(id, value);
          }
        });
    },
    [treeOpenTrigger]
  );

  return (
    <li className={`listItem ${draggableClass}`} data-item-id={id}>
      <ListItemText
        className={listItemTextClass}
        data-item-id={id}
        data-item-parent-id={parentId}
        data-item-path={dataItem.$Path}
        data-item-path-name={dataItem.$PathName}
        /* style={{ paddingLeft: isTable ? 0 : indent + 'px' }} */
        style={{ paddingLeft: indent + 'px' }}
        draggable={isDraggable}
        data-children-count={childrenCount}
        onDoubleClick={function () {
          if (draggableClass === 'notDraggable') {
            return;
          }
          listDoubleClickHandler(dataItem);
        }}
      >
        <div className='text'>
          <TreeSwitch
            isTable={isTable}
            isOpen={isOpen}
            setOpen={function (val) {
              setOpen(val);
              setOpenInfo?.(id, val);
            }}
          ></TreeSwitch>
          <Icon type={type}></Icon>
          <div className='textBox'>
            <Highlight text={name || '-'} highlight={searchKey}></Highlight>
          </div>
        </div>
        {isTable && isShowAddSubDatasource
          ? isAllowToEdit &&
            !originalDatasourceIds[id] && (
              <DddSubDatasource
                /*  data-not-allow={isNotAllow} */
                onClick={addSubDatasourceClickHandler}
              ></DddSubDatasource>
            )
          : ''}
        {isShowAddSubDatasource
          ? isAllowToEdit &&
            !originalDatasourceIds[id] &&
            !originalDatasourceIds[parentId] && (
              <DelDatasource
                data-item-id={id}
                onClick={delDatasourceClickHandler}
              ></DelDatasource>
            )
          : ''}
      </ListItemText>
      {isTable && isOpen ? (
        <Index
          {...props}
          datas={children}
          indent={indent + 20}
          parentId={id}
          parentNode={dataItem}
          parentType='table'
          parentDisabled={disabled}
        ></Index>
      ) : (
        ''
      )}
    </li>
  );
}

//树形数据源列表
export default function Index(props) {
  const dispatch = useDispatch();
  const context = useContext(DesignerContext);
  const container = useRef();

  let { originalDatasourceIds } = useSelector(
    ({ datasourceSlice }) => datasourceSlice
  );
  //是否允许编辑数据源

  const datasObj = useRef({}).current;

  useEffect(() => {
    if (container.current) {
      container.current.querySelector('.active')?.scrollIntoView?.({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'nearest',
      });
    }
  });

  const {
    datas,
    click,
    width,
    draggable = false,
    parentNode = null,
    activeSheetTablePath = {},
    notAllowEdit = true,
    onDoubleClick,
    disabledTypes = [],
    parentDisabled = false,
    searchKey = '',
  } = props;

  let _datas = datas;
  if (searchKey) {
    _datas = datas.filter(function ({ name = '', children }) {
      let result = name.includes(searchKey);
      if (!result && isArray(children) && children.length > 0) {
        result = children.some(({ name = '' }) => name.includes(searchKey));
      }
      return result;
    });
  }

  let isAllowToEdit = !getDataSourceConfig(context, 'allowToEdit');
  if (!notAllowEdit) {
    isAllowToEdit = false;
  }

  if (!isArray(datas)) {
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
    const id = uuid();
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
      onDoubleClick(data, parentNode);
    }
  };

  return (
    <DatasourceListOl
      onClick={listClickHandler}
      style={{ width: width + 'px' }}
      ref={container}
    >
      {_datas.map(function (dataItem) {
        const { name, id, children, type, code, parentId } = dataItem;
        datasObj[id] = dataItem;
        let draggableClass = '';
        let isDraggable = draggable;
        if (draggable) {
          draggableClass = 'draggable';
          if (
            type === 'table' &&
            (!isArray(children) ||
              children.length === 0 ||
              activeSheetTablePath[code])
          ) {
            draggableClass = 'notDraggable';
            isDraggable = false;
          }
        }

        const disabled = disabledTypes.includes(type);
        if (disabled || parentDisabled) {
          draggableClass = 'notDraggable';
          isDraggable = false;
        }

        const _props = {
          ...props,
          id,
          draggableClass,
          parentId,
          children,
          listDoubleClickHandler,
          delDatasourceClickHandler,
          addSubDatasourceClickHandler,
          name,
          isAllowToEdit,
          originalDatasourceIds,
          type,
          isDraggable,
          searchKey,
          dataItem: {
            ...dataItem,
            $Path: parentNode ? `${parentNode.$Path}.${code}` : code,
            $PathName: parentNode
              ? `${parentNode.$PathName}.${name}`
              : `${name}`,
          },
          disabled,
        };

        return <TreeItem {..._props} key={id}></TreeItem>;
      })}
    </DatasourceListOl>
  );
}
