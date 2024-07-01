import { useDrag } from 'react-dnd';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import { uuid } from '@toone/report-util';

import Tree from './Tree';

const Wrap = styled.div`
  width: 350px;
  border-right: 1px solid #ddd;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const DragWrap = styled.div`
  opacity: 1 !important;
  padding-left: 10px;
  padding-bottom: 10px;
  border-bottom: 1px solid #ddd;
  /* cursor: move; */
`;

const ControlListWrap = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px 0;
  gap: 10px;
  flex: 1;
  overflow-y: auto;
`;

const Title = styled.div`
  display: flex;
  height: 30px;
  justify-content: right;
  align-items: center;
  padding-right: 20px;
  font-weight: bold;
`;

const DragWrapTitle = styled.div`
  display: flex;
  height: 30px;
  align-items: center;
  font-weight: bold;
`;

const DragWrapContent = styled.div``;

const DragWrapContentItem = styled.div`
  display: flex;
  height: 26px;
  align-items: center;
  cursor: pointer;
  padding: 0 16px;
  &:hover {
    background-color: #ddd;
  }
`;

function ControlListItem(props) {
  const { item, addControls } = props;
  const drag = useDrag(() => ({
    type: 'box',
    item: {},
    collect(monitor) {
      return {
        isDragging: monitor.isDragging(),
      };
    },
    canDrag: () => false,
  }))[1];

  const { params = [], code, name } = item;

  return (
    <DragWrap
      ref={drag}
      onDoubleClick={(e) => {
        const { fieldCode, fieldName, fieldType } = e?.target?.dataset || {};
        const control = {
          config: {
            code: fieldCode,
            label: fieldName,
            fieldName,
            datasource: code,
            datasourceName: name,
          },
          type: fieldType,
          id: uuid(),
        };
        addControls(control);
      }}
    >
      <DragWrapTitle>{name}</DragWrapTitle>
      <DragWrapContent>
        {params.map((data) => {
          return (
            <DragWrapContentItem
              key={data.paramName}
              data-field-code={data.paramName}
              data-field-name={data.paramNameCn}
              data-field-type={data.paramsType}
            >
              {data.paramNameCn || data.paramName}
            </DragWrapContentItem>
          );
        })}
      </DragWrapContent>
    </DragWrap>
  );
}

function ControlList(props) {
  const { finalDsList } = useSelector(({ datasourceSlice }) => datasourceSlice);
  const queryParameterList = finalDsList.filter(
    ({ type, params }) =>
      type === 'table' && Array.isArray(params) && params.length > 0
  );
  return (
    <ControlListWrap>
      {queryParameterList.map((item) => {
        return (
          <ControlListItem
            {...props}
            key={item.code}
            item={item}
          ></ControlListItem>
        );
      })}
    </ControlListWrap>
  );
}

export default function (props) {
  const { addControls, config } = props;
  const { finalDsList } = useSelector(({ datasourceSlice }) => datasourceSlice);
  const queryParameterList = finalDsList.reduce((result, item) => {
    const { type, params, name, code } = item;
    if (type === 'table' && Array.isArray(params) && params.length > 0) {
      const children = params.map((item) => {
        let disabled = false;
        const items = config?.items || [];
        items.forEach((configItem) => {
          if (
            configItem?.config?.datasource === code &&
            configItem?.config?.code === item.paramName
          ) {
            disabled = true;
          }
        });
        return {
          ...item,
          label: item.paramNameCn,
          type: item.paramsType,
          disabled,
        };
      });
      result.push({
        ...item,
        label: name,
        children,
        enableDoubleClick: false,
      });
    }
    return result;
  }, []);

  return (
    <Tree
      title='数据集查询 参数'
      datas={queryParameterList}
      onDoubleClick={(datas) => {
        const { paramName, paramNameCn, paramsType, parent = {} } = datas;
        const control = {
          config: {
            code: paramName,
            label: paramNameCn,
            fieldName: paramNameCn,
            datasource: parent.code,
            datasourceName: parent.name,
          },
          type: paramsType,
          id: uuid(),
        };
        let hasAdd = false;
        const items = config?.items || [];
        items.forEach((item) => {
          if (
            item?.config?.datasource === parent.code &&
            item?.config?.code === paramName
          ) {
            hasAdd = true;
          }
        });
        if (hasAdd) {
          return;
        }
        addControls(control);
      }}
    ></Tree>
  );
  return (
    <Wrap>
      <Title>可选参数</Title>
      <ControlList {...props}></ControlList>
    </Wrap>
  );
}
