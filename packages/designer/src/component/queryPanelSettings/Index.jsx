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
  useDispatch,
  useSelector,
} from 'react-redux';
import {
  SortableContainer,
  SortableElement,
} from 'react-sortable-hoc';
import styled from 'styled-components';

import { saveQueryPanelSettings } from '@store/persistingDataSlice';
import {
  Button,
  Dialog,
} from '@toone/report-ui';
import { uuid } from '@toone/report-util';
import { getSheetInstanceId } from '@utils/worksheetUtil';

import {
  defaultQueryPanelSettings,
  optionalControlsMap,
} from './constant';
import Left from './left';
import Right from './right';

let textDatas = {
  visible: true,
  position: 'Top', //位置
  colCount: 3,
  triggerMode: 'Click', //Click||Change
  items: [
    {
      id: 'Select1',
      type: 'Select',
      config: { labelText: '地区' },
    },
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
const DialogWrap = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  user-select: none;
  background-color: #fff;
  border-top: 1px solid #ddd;
  font-size: 12px;
  flex: 1;
  flex-direction: column;
  overflow: hidden;
`;
const Wrap = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  user-select: none;
  background-color: #fff;
  border-top: 1px solid #ddd;
  font-size: 12px;
  flex: 1;
  overflow: hidden;
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

const SaveBtn = styled.div`
  cursor: pointer;
  padding: 3px 3px 0px 3px;
  border-radius: 4px;
  &:hover {
    background-color: #ddd;
  }
`;

function SaveIcon(props) {
  const { onClick } = props;
  return (
    <svg
      t='1718938314429'
      className='icon'
      viewBox='0 0 1024 1024'
      version='1.1'
      xmlns='http://www.w3.org/2000/svg'
      p-id='4264'
      width='22'
      height='22'
      onClick={onClick}
    >
      <path
        d='M925.248 356.928l-258.176-258.176a64 64 0 0 0-45.248-18.752H144a64 64 0 0 0-64 64v736a64 64 0 0 0 64 64h736a64 64 0 0 0 64-64V402.176a64 64 0 0 0-18.752-45.248zM288 144h192V256H288V144z m448 736H288V736h448v144z m144 0H800V704a32 32 0 0 0-32-32H256a32 32 0 0 0-32 32v176H144v-736H224V288a32 32 0 0 0 32 32h256a32 32 0 0 0 32-32V144h77.824l258.176 258.176V880z'
        p-id='4265'
        fill='#2c2c2c'
      ></path>
    </svg>
  );
}

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
    config: { items: controls = [], colCount: column },
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
  const dispatch = useDispatch();
  const { spread } = useSelector(({ appSlice }) => appSlice);
  const sheet = spread.getActiveSheet();
  const sheetId = getSheetInstanceId(sheet);
  const persistingDataSlice = useSelector(
    ({ persistingDataSlice }) => persistingDataSlice
  );
  let queryPanelSettings =
    persistingDataSlice?.sheets?.[sheetId]?.queryPanelSettings ||
    defaultQueryPanelSettings;
  const [config, setConfig] = useState(queryPanelSettings);

  const controls = config.items || [];
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

  const changeControlDropDownSource = (key, value) => {
    setConfig((config) => {
      const controls = config.items;
      const newControls = [];
      controls.forEach((control) => {
        if (control.id === datas.activeId) {
          newControls.push({
            ...control,
            config: {
              ...control?.config,
              dropDownSource: {
                ...(control?.config?.dropDownSource || {}),
                [key]: value,
              },
            },
          });
        } else {
          newControls.push(control);
        }
      });

      return { ...config, items: newControls };
    });
  };

  const saveHandler = () => {
    dispatch(
      saveQueryPanelSettings({
        sheetId,
        datas: config,
      })
    );
    console.log(sheetId, config);
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
      <DialogWrap>
        <div
          style={{
            height: '36px',
            display: 'flex',
            padding: '4px 10px',
            boxSizing: 'border-box',
            justifyContent: 'right',
          }}
          title='保存'
          onClick={saveHandler}
        >
          <SaveBtn>
            <SaveIcon></SaveIcon>
          </SaveBtn>
        </div>
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
              changeControlDropDownSource={changeControlDropDownSource}
            ></Right>
          </DndProvider>
        </Wrap>
      </DialogWrap>
    </Dialog>
  );
}
