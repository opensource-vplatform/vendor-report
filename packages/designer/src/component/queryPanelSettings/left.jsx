import { useDrag } from 'react-dnd';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import { uuid } from '@toone/report-util';

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

  const { children = [], code, name } = item;

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
        debugger;
        addControls(control);
      }}
    >
      <DragWrapTitle>{name}</DragWrapTitle>
      <DragWrapContent>
        {children.map((data) => {
          return (
            <DragWrapContentItem
              key={data.code}
              data-field-code={data.code}
              data-field-name={data.name}
              data-field-type={data.type}
            >
              {data.name}
            </DragWrapContentItem>
          );
        })}
      </DragWrapContent>
    </DragWrap>
  );
}

function ControlList(props) {
  const { finalDsList } = useSelector(({ datasourceSlice }) => datasourceSlice);
  const queryParameterList = finalDsList.filter(({ type }) => type === 'table');
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
  return (
    <Wrap>
      <Title>可选参数</Title>
      <ControlList {...props}></ControlList>
    </Wrap>
  );
}
