import { useDrag } from 'react-dnd';
import styled from 'styled-components';

import { uuid } from '@toone/report-util';

import {
  optionalControls,
  optionalControlsMap,
} from './constant.js';

const Wrap = styled.div`
  width: 350px;
  border-right: 1px solid #ddd;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const DragWrap = styled.div`
  opacity: 1 !important;
  cursor: move;
`;

const ControlListWrap = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
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

function ControlListItem(props) {
  const { type, config, addControls } = props;
  const drag = useDrag(() => ({
    type: 'box',
    item: { type, config },
    collect(monitor) {
      return {
        isDragging: monitor.isDragging(),
      };
    },
    canDrag(monitor) {
      console.log(monitor);
      return true;
    },
  }))[1];
  const Component = optionalControlsMap[type];
  return (
    <DragWrap
      ref={drag}
      onDoubleClick={() => {
        addControls({
          type,
          config,
          id: uuid(),
        });
      }}
    >
      <div style={{ pointerEvents: 'none' }}>
        <Component labelText={config.labelText}></Component>
      </div>
    </DragWrap>
  );
}

function ControlList(props) {
  return (
    <ControlListWrap>
      {optionalControls.map(({ type, config }, index) => {
        return (
          <ControlListItem
            {...props}
            type={type}
            key={index}
            config={config}
          ></ControlListItem>
        );
      })}
    </ControlListWrap>
  );
}

export default function (props) {
  return (
    <Wrap>
      <Title>可选控件</Title>
      <ControlList {...props}></ControlList>
    </Wrap>
  );
}
