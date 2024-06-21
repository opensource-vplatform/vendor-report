import {
  useRef,
  useState,
} from 'react';

import { arrayMoveMutable } from 'array-move';
import {
  DndProvider,
  useDrop,
} from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import {
  SortableContainer,
  SortableElement,
} from 'react-sortable-hoc';
import styled from 'styled-components';

import {
  Button,
  Dialog,
} from '@toone/report-ui';
import { uuid } from '@toone/report-util';

import { optionalControlsMap } from './constant';
import Left from './left';
import Right from './right';

let textDatas = {
  visible: true,
  position: 'Top', //位置
  colCount: 3,
  triggerMode: 'Click', //Click||Change
  items: [
    {
      id: 'A',
      type: 'Text',
      config: { labelText: '项目名称' },
    },
    {
      id: 'B',
      type: 'Integer',
      config: { labelText: '合同金额' },
    },
    {
      id: 'C',
      type: 'Text',
      config: { labelText: '合同名称' },
    },
    {
      id: 'D',
      type: 'Text',
      config: { labelText: '负责人' },
    },
    {
      id: 'E',
      type: 'Integer',
      config: { labelText: '项目周期' },
    },
    {
      id: 'F',
      type: 'Integer',
      config: { labelText: '项目人数' },
    },
  ],
};
for (let i = 1; i <= 10; i++) {
  textDatas.items.push({
    id: `F${i}`,
    type: 'Integer',
    config: { labelText: `项目人数${i}` },
  });
}

//textDatas.items = [];

const Wrap = styled.div`
  height: calc(100% - 50px);
  width: 100%;
  display: flex;
  user-select: none;
  background-color: #fff;
  border-top: 1px solid #ddd;
  font-size: 12px;
  flex: 1;
`;

const MainBox = styled.div`
  width: 100%;
  height: 100%;
  flex: 1;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
`;
const MainBtnWrap = styled.div`
  box-sizing: border-box;
  height: 36px;
  z-index: 3;
  display: flex;
  padding: 4px 10px 4px 4px;
  gap: 10px;
  justify-content: right;
`;

const MainWrap = styled.div`
  width: 100%;
  height: 100%;
  flex: 1;
  box-sizing: border-box;
  overflow-y: auto;
  padding: 10px;
  position: relative;
`;

const MainItemWrap = styled.div`
  z-index: 999999;
  cursor: move;
  font-size: 12px;
  &[active='active'] {
    outline: 1px dashed #2d8cf0;
    outline-offset: 2px;
  }
`;

const DropTipWrap = styled.div`
  width: 100%;
  height: 100%;
  border: 4px dashed #ddd;
  justify-content: center;
  display: flex;
  align-items: center;
  border-radius: 10px;
  flex-direction: column;
  box-sizing: border-box;
  opacity: 0.6;
`;

const MainItem = SortableElement((props) => {
  const { type, config = {}, active } = props;
  const el = useRef();
  const Component = optionalControlsMap[type];
  return (
    <MainItemWrap ref={el} active={active ? 'active' : ''}>
      <div style={{ pointerEvents: 'none' }}>
        <Component {...config} value={config.defaultValue}></Component>
      </div>
    </MainItemWrap>
  );
});

const Main = SortableContainer(function Main(props) {
  const {
    addControls,
    config: { items: controls, colCount: column },
    controlsIndex = 0,
  } = props;

  const drop = useDrop(() => ({
    accept: 'box',
    drop: (item, monitor) => {
      const control = { ...item, id: uuid() };
      addControls(control);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }))[1];
  return (
    <MainBox>
      <MainWrap ref={drop}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${column}, 1fr)`,
            gap: '20px',
            width: '100%',
          }}
        >
          {controls.map((item, index) => {
            return (
              <MainItem
                key={index}
                {...item}
                index={index}
                active={index === controlsIndex}
              ></MainItem>
            );
          })}
        </div>
        {controls.length <= 0 ? (
          <DropTipWrap>
            <div>1，从可选控件区域拖拽控件或双击控件到此处来添加查询控件</div>
            <div>2，根据需求拖拽此处的控件进行排序</div>
            <div>3，点击此处的控件编辑控件属性</div>
          </DropTipWrap>
        ) : null}
      </MainWrap>
      {props.config.triggerMode === 'Click' && (
        <MainBtnWrap>
          <Button style={{ pointerEvents: 'none' }}>查询</Button>
          <Button style={{ pointerEvents: 'none' }}>重置</Button>
        </MainBtnWrap>
      )}
    </MainBox>
  );
});

export default function (props) {
  const { onClose } = props;
  const [config, setConfig] = useState(textDatas);

  const controls = config.items;
  const [datas, setDatas] = useState({
    activeId: controls?.[0]?.id,
    controlsIndex: 0,
    type: 'control',
  });

  const changePanelConfig = (key, value) => {
    setConfig((config) => {
      return { ...config, [key]: value };
    });
  };

  const changeControlConfig = (key, value) => {
    setConfig((config) => {
      const controls = config.items;
      const newControls = [];
      controls.forEach((control) => {
        let keyValue = control?.config?.[key];
        if (control.id === datas.activeId) {
          keyValue = value;
        }
        newControls.push({
          ...control,
          config: {
            ...control?.config,
            [key]: keyValue,
          },
        });
      });

      return { ...config, items: newControls };
    });
  };

  const addControls = (control) => {
    setConfig((config) => {
      const controls = config.items;
      setDatas((datas) => {
        return {
          ...datas,
          activeId: control.id,
          controlsIndex: controls.length,
          type: 'control',
        };
      });
      return {
        ...config,
        items: [...controls, control],
      };
    });
  };

  const removeControl = () => {
    setConfig((config) => {
      const controls = [];
      config.items.forEach((item) => {
        if (item.id != datas.activeId) {
          controls.push(item);
        }
      });
      setDatas((datas) => {
        return {
          ...datas,
          activeId: controls?.[0]?.id || '',
          controlsIndex: controls.length > 0 ? 0 : -1,
          type: controls.length > 0 ? 'control' : 'panel',
        };
      });
      return {
        ...config,
        items: controls,
      };
    });
  };

  const onSortEndHandler = ({ newIndex, oldIndex }) => {
    if (newIndex == oldIndex) {
      setDatas((datas) => {
        return {
          ...datas,
          activeId: controls?.[newIndex]?.id,
          type: 'control',
        };
      });
      return;
    }

    setConfig((config) => {
      const newControls = [...config.items];
      arrayMoveMutable(newControls, oldIndex, newIndex);
      const index = newControls.findIndex(({ id }) => id === datas.activeId);
      setDatas((datas) => {
        return {
          ...datas,
          controlsIndex: index >= 0 ? index : newIndex,
        };
      });

      return {
        ...config,
        items: newControls,
      };
    });
  };

  const onSortStartHandler = ({ index }) => {
    const activeItem = controls.find(
      (i, index) => index === datas?.controlsIndex
    );

    setDatas((datas) => {
      return {
        ...datas,
        activeId: activeItem?.id,
        controlsIndex: index,
      };
    });
  };
  console.log(config, 'config');
  return (
    <Dialog
      title='查询面板设置'
      width='100%'
      height='100%'
      id={uuid()}
      onClose={onClose}
      style={{ marginTop: '-2px', flex: 1 }}
    >
      <Wrap>
        <DndProvider backend={HTML5Backend}>
          <Left addControls={addControls}></Left>
          <Main
            axis='xy'
            lockToContainerEdges={true}
            lockOffset='1px'
            onSortStart={onSortStartHandler}
            onSortEnd={onSortEndHandler}
            config={config}
            addControls={addControls}
            controlsIndex={datas.controlsIndex}
          ></Main>
          <Right
            config={config}
            removeControl={removeControl}
            changeControlConfig={changeControlConfig}
            datas={datas}
            changePanelConfig={changePanelConfig}
          ></Right>
        </DndProvider>
      </Wrap>
    </Dialog>
  );
}
