import {
  useRef,
  useState,
} from 'react';

import { arrayMoveMutable } from 'array-move';
import {
  DndProvider,
  useDrag,
  useDrop,
} from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import {
  SortableContainer,
  SortableElement,
} from 'react-sortable-hoc';
import styled from 'styled-components';

import {
  Dialog,
  IntegerItem,
  TextInput,
  TextItem,
} from '@toone/report-ui';
import { uuid } from '@toone/report-util';

const textDatas = [
    {
        id: 'A',
        type: 'Text',
        Component: TextItem,
        config: { labelText: '项目名称' },
    },
    {
        id: 'B',
        type: 'Integer',
        Component: IntegerItem,
        config: { labelText: '合同金额' },
    },
    {
        id: 'C',
        type: 'Text',
        Component: TextItem,
        config: { labelText: '合同名称' },
    },
    {
        id: 'D',
        type: 'Text',
        Component: TextItem,
        config: { labelText: '负责人' },
    },
    {
        id: 'E',
        type: 'Integer',
        Component: IntegerItem,
        config: { labelText: '项目周期' },
    },
    {
        id: 'F',
        type: 'Integer',
        Component: IntegerItem,
        config: { labelText: '项目人数' },
    },
];

const Wrap = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    user-select: none;
    background-color: #fff;
    border-top: 1px solid #ddd;
    font-size: 12px;
`;

const LeftWrap = styled.div`
    width: 350px;
    border-right: 1px solid #ddd;
    height: 100%;
    padding: 10px;
    display: flex;
    flex-direction: column;
    gap: 20px;
`;
const CenterWrap = styled.div`
    width: 100%;
    padding: 10px;
    flex: 1;
`;
const RightWrap = styled.div`
    width: 350px;
    border-left: 1px solid #ddd;
    padding: 10px;
`;

const MainWrap = styled.div`
    width: 100%;
    height: 100%;
`;

const MainItemWrap = styled.div`
    z-index: 999999;
    cursor: move;
    &[active='active'] {
        outline: 1px dashed #2d8cf0;
        outline-offset: 2px;
    }
`;

const PropertyWrap = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
`;

const PropertyItemWrap = styled.div`
    display: flex;
    align-items: center;
`;

const PropertyLable = styled.div`
    width: 80px;
`;

const DragWrap = styled.div`
    opacity: 1 !important;
    cursor: move;
`;

function OptionalControlListItem(props) {
    const { Component, type } = props;
    const [collected, drag, dragPreview] = useDrag(() => ({
        type: 'box',
        item: { Component, type, config: {} },
        collect(monitor) {
            return {
                isDragging: monitor.isDragging(),
            };
        },
        canDrag(monitor) {
            console.log(monitor);
            return true;
        },
    }));
    return (
        <DragWrap ref={drag}>
            <div style={{ pointerEvents: 'none' }}>
                <Component></Component>
            </div>
        </DragWrap>
    );
}

function OptionalControlList() {
    const controls = [
        { type: 'Text', Component: TextItem },
        { type: 'Integer', Component: IntegerItem },
    ];
    return (
        <>
            {controls.map(({ type, Component }, index) => {
                return (
                    <OptionalControlListItem
                        type={type}
                        Component={Component}
                        key={index}
                    ></OptionalControlListItem>
                );
            })}
        </>
    );
}

const MainItem = SortableElement((props) => {
    const { Component, config = {}, active } = props;
    const el = useRef();
    return (
        <MainItemWrap ref={el} active={active ? 'active' : ''}>
            <div style={{ pointerEvents: 'none' }}>
                <Component {...config} value={config.labelText}></Component>
            </div>
        </MainItemWrap>
    );
});

const Main = SortableContainer(function Main(props) {
    const { column = 2, setControls, controls, controlsIndex = 0 } = props;

    const drop = useDrop(() => ({
        accept: 'box',
        drop: (item, monitor) => {
            if (item?.Component) {
                setControls((controls) => {
                    return [...controls, { ...item, id: uuid() }];
                });
            }
        },
        collect: (monitor) => ({
            isOver: monitor.isOver(),
        }),
    }))[1];

    return (
        <MainWrap ref={drop}>
            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns: `repeat(${column}, 1fr)`,
                    gap: '20px',
                    zIndex: 9999999,
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
        </MainWrap>
    );
});

function Property(props) {
    const { controls, activeId, setControls } = props;
    const control = controls.find(({ id }) => id === activeId);
    const changeControlConfig = (key, value) => {
        setControls((datas) => {
            const newDatas = [...datas];
            const index = newDatas.findIndex(({ id }) => id === activeId);
            newDatas.splice(index, 1, {
                ...control,
                config: {
                    ...control?.config,
                    [key]: value,
                },
            });
            return newDatas;
        });
    };
    return (
        <PropertyWrap>
            <PropertyItemWrap>
                <PropertyLable>标签</PropertyLable>
                <TextInput
                    style={{ flex: 1 }}
                    value={control?.config?.labelText || ''}
                    onChange={(e) => {
                        changeControlConfig('labelText', e.target.value);
                    }}
                ></TextInput>
            </PropertyItemWrap>
            <PropertyItemWrap>
                <PropertyLable>标签宽度</PropertyLable>
                <TextInput style={{ flex: 1 }}></TextInput>
            </PropertyItemWrap>
            <PropertyItemWrap>
                <PropertyLable>数据集</PropertyLable>
                <TextInput style={{ flex: 1 }}></TextInput>
            </PropertyItemWrap>
            <PropertyItemWrap>
                <PropertyLable>字段</PropertyLable>
                <TextInput style={{ flex: 1 }}></TextInput>
            </PropertyItemWrap>
            <PropertyItemWrap>
                <PropertyLable>默认值</PropertyLable>
                <TextInput style={{ flex: 1 }}></TextInput>
            </PropertyItemWrap>
        </PropertyWrap>
    );
}

export default function (props) {
    const {} = props;

    const handleCancel = () => {
        onCancel && onCancel();
    };

    const [controls, setControls] = useState(textDatas);
    const [datas, setDatas] = useState({
        activeId: controls?.[0]?.id,
        controlsIndex: 0,
    });
    return (
        <Dialog
            title='查询面板设置'
            width='100%'
            height='100%'
            id={uuid()}
            onConfirm={() => {}}
            onCancel={handleCancel}
            style={{ marginTop: '-2px' }}
        >
            <Wrap>
                <DndProvider backend={HTML5Backend}>
                    <LeftWrap>
                        <OptionalControlList></OptionalControlList>
                    </LeftWrap>
                    <CenterWrap>
                        <Main
                            axis='xy'
                            lockToContainerEdges={true}
                            lockOffset='1px'
                            onSortStart={({ index }) => {
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
                            }}
                            onSortEnd={({ newIndex, oldIndex }) => {
                                if (newIndex == oldIndex) {
                                    setDatas((datas) => {
                                        return {
                                            ...datas,
                                            activeId: controls?.[newIndex]?.id,
                                        };
                                    });
                                    return;
                                }

                                setControls((controls) => {
                                    const newControls = [...controls];
                                    arrayMoveMutable(
                                        newControls,
                                        oldIndex,
                                        newIndex
                                    );
                                    const index = newControls.findIndex(
                                        ({ id }) => id === datas.activeId
                                    );
                                    setDatas((datas) => {
                                        return {
                                            ...datas,
                                            controlsIndex:
                                                index >= 0 ? index : newIndex,
                                        };
                                    });
                                    return newControls;
                                });
                            }}
                            controls={controls}
                            setControls={setControls}
                            controlsIndex={datas.controlsIndex}
                        ></Main>
                    </CenterWrap>
                    <RightWrap>
                        <Property
                            controls={controls}
                            activeId={datas.activeId}
                            setControls={setControls}
                        ></Property>
                    </RightWrap>
                </DndProvider>
            </Wrap>
        </Dialog>
    );
}
