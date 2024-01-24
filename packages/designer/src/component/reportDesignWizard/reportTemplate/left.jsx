import {
  useEffect,
  useRef,
  useState,
} from 'react';

import {
  DndProvider,
  useDrag,
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
  sortableHandle,
} from 'react-sortable-hoc';
import styled from 'styled-components';

import { CheckBox } from '@components/form/Index';
import Select from '@components/select/Index';
import {
  removeGroup,
  saveGroups,
  sortGroups,
} from '@store/wizardSlice';

const Wrap = styled.div`
    width: 300px;
    display: flex;
    flex-direction: column;
    height: 100%;
    overflow: hidden;
    border-right: 1px solid #ddd;
    padding: 12px;
    box-sizing: border-box;
`;

const Header = styled.div`
    display: flex;
    justify-content: right;
    font-size: 12px;
    align-items: center;
    padding-bottom: 12px;
    position: relative;
    z-index: 2;
`;
const FieldListWrap = styled.div`
    font-size: 12px;
    height: 100%;
    overflow: hidden;
    overflow-y: auto;
    border: 1px solid #ddd;
    position: relative;
    z-index: 1;
    flex: 1;
`;

const FieldListItemWrap = styled.div`
    display: flex;
    align-items: center;
    cursor: pointer;
    user-select: none;
    z-index: 2003;
    position: relative;
    border-top: 1px solid #ddd;
    border-bottom: 1px solid #ddd;
    margin-top: -1px;
    &:hover {
        background-color: #dadada;
    }
`;

const FieldText = styled.span`
    left: -6px;
    position: relative;
`;

const SortableHandle = styled.div`
    position: relative;
    top: 1px;
    display: block;
    width: 18px;
    height: 11px;
    opacity: 0.25;
    margin-right: 10px;
    margin-left: auto;
    cursor: row-resize;
    background: linear-gradient(
        180deg,
        #000,
        #000 20%,
        #fff 0,
        #fff 40%,
        #000 0,
        #000 60%,
        #fff 0,
        #fff 80%,
        #000 0,
        #000
    );
`;

const GroupWrap = styled.div`
    position: relative;
    height: 200px;
    border: 1px solid #ddd;
    margin-top: 40px;
    font-size: 12px;
    &::before {
        content: '分组列';
        position: absolute;
        top: -25px;
        right: 0;
        font-size: 12px;
    }
`;

const GroupItemWrap = styled.div`
    padding: 3px 4px;
    display: flex;
    justify-content: space-between;
    z-index: 2002;
    cursor: row-resize;
    &:hover {
        background-color: #dadada;
    }
`;

const ClearIcon = styled.div`
    width: 16px;
    height: 16px;
    padding: 0px;
    cursor: pointer;
    background-image: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB2aWV3Qm94PSIwIDAgMTYgMTYiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDU1LjIgKDc4MTgxKSAtIGh0dHBzOi8vc2tldGNoYXBwLmNvbSAtLT4KICAgIDx0aXRsZT5jbG9zZTwvdGl0bGU+CiAgICA8ZGVzYz5DcmVhdGVkIHdpdGggU2tldGNoLjwvZGVzYz4KICAgIDxnIGlkPSJjbG9zZSIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPHBhdGggZD0iTTkuMTQ1MTkwODUsOC4wMDAxNTM1NyBMMTIuNzYxOTkxNCw0LjM4MjE4MTEyIEMxMy4wNzkzMzYyLDQuMDY2MDAyMzUgMTMuMDc5MzM2MiwzLjU1MzMxNjc2IDEyLjc2MTk5MTQsMy4yMzcxMzQwOCBDMTIuNDQ2NDc5NiwyLjkyMDk1NTMxIDExLjkzNDQ2MTEsMi45MjA5NTUzMSAxMS42MTc3ODQyLDMuMjM3MTM0MDggTDguMDAwMzE5Niw2Ljg1NDkzMDc0IEw0LjM4MjE4MTEyLDMuMjM3MTM0MDggQzQuMDY2MDAyMzUsMi45MjA5NTUzMSAzLjU1MzMxNjc2LDIuOTIwOTU1MzEgMy4yMzcxMzQwOCwzLjIzNzEzNDA4IEMyLjkyMDk1NTMxLDMuNTUzMzEyODUgMi45MjA5NTUzMSw0LjA2NTk5ODQ0IDMuMjM3MTM0MDgsNC4zODIxODExMiBMNi44NTUxMDY1Myw4LjAwMDE1MzU3IEwzLjIzNzEzNDA4LDExLjYxODYyNDEgQzIuOTIwOTU1MzEsMTEuOTM0OTY4OSAyLjkyMDk1NTMxLDEyLjQ0NjY1NDQgMy4yMzcxMzQwOCwxMi43NjI5OTczIEMzLjU1MzMxMjg1LDEzLjA3OTM0MjEgNC4wNjU5OTg0NCwxMy4wNzkzNDIxIDQuMzgyMTgxMTIsMTIuNzYyOTk3MyBMOC4wMDAzMTk2LDkuMTQ1MjAwNjEgTDExLjYxNzc4NDIsMTIuNzYyOTk3MyBDMTEuOTM0NDYzLDEzLjA3OTM0MjEgMTIuNDQ2NjQ4NiwxMy4wNzkzNDIxIDEyLjc2MTk5MTQsMTIuNzYyOTk3MyBDMTMuMDc5MzM2MiwxMi40NDcxNTI1IDEzLjA3OTMzNjIsMTEuOTM0OTY2OSAxMi43NjE5OTE0LDExLjYxODYyNDEgTDkuMTQ1MTkwODUsOC4wMDAxNTM1NyBMOS4xNDUxOTA4NSw4LjAwMDE1MzU3IFoiIGlkPSLot6/lvoQiIGZpbGw9IiM2NjY2NjYiIGZpbGwtcnVsZT0ibm9uemVybyI+PC9wYXRoPgogICAgPC9nPgo8L3N2Zz4=);
`;

const DragHandle = sortableHandle(() => (
    <SortableHandle className='dragHandle'></SortableHandle>
));

const FieldListItem = SortableElement(function (props) {
    const dispatch = useDispatch();
    const _refState = useRef({});
    const { code, isChecked, changeHandler, name, id } = props;
    _refState.current.isChecked = isChecked;

    const [collected, drag, dragPreview] = useDrag(() => ({
        type: 'box',
        item: { id, name, code },
        collect(monitor) {
            return {
                isDragging: monitor.isDragging(),
            };
        },
        canDrag(monitor) {
            return _refState.current.isChecked;
        },
    }));

    const resolveChangeHandler = function () {
        const newResult = !isChecked;
        changeHandler(code, newResult);
        if (!newResult) {
            dispatch(
                removeGroup({
                    groupId: id,
                })
            );
        }
    };

    return (
        <FieldListItemWrap onClick={resolveChangeHandler} ref={drag}>
            <CheckBox
                value={isChecked}
                onChange={resolveChangeHandler}
            ></CheckBox>
            <FieldText>{name}</FieldText>
            <DragHandle></DragHandle>
        </FieldListItemWrap>
    );
});

const FieldList = SortableContainer(function (props) {
    const [_exclude, setExclude] = useState({});
    const { datas, onChange = () => {}, tableCode } = props;
    useEffect(
        function () {
            setExclude({});
        },
        [tableCode]
    );

    const changeHandler = function (code, res) {
        const newExclude = { ..._exclude, [code]: res };
        setExclude(newExclude);
        const exclude = Object.entries(newExclude).reduce(function (
            result,
            [key, value]
        ) {
            if (!value) {
                result.push(key);
            }
            return result;
        }, []);
        onChange(exclude);
    };

    return (
        <FieldListWrap>
            {datas.map(function (item, index) {
                const { name, id, code } = item;
                const isChecked = _exclude[code] !== false;
                return (
                    <FieldListItem
                        key={id}
                        name={name}
                        code={code}
                        isChecked={isChecked}
                        changeHandler={changeHandler}
                        index={index}
                        id={id}
                    ></FieldListItem>
                );
            })}
        </FieldListWrap>
    );
});

const GroupItem = SortableElement(function (props) {
    const { text, groupId } = props;
    const dispatch = useDispatch();

    return (
        <GroupItemWrap>
            {text}
            <ClearIcon
                onMouseDownCapture={function (e) {
                    dispatch(
                        removeGroup({
                            groupId,
                        })
                    );
                }}
            ></ClearIcon>
        </GroupItemWrap>
    );
});

const Groups = SortableContainer(function (props) {
    const dispatch = useDispatch();
    let { groups } = useSelector(({ wizardSlice }) => wizardSlice);

    const [collectedProps, drop] = useDrop(() => ({
        accept: 'box',
        drop: (item, monitor) => {
            dispatch(saveGroups({ newGroup: item }));
        },
        collect: (monitor) => ({
            isOver: monitor.isOver(),
        }),
    }));

    return (
        <GroupWrap ref={drop}>
            {groups.map(function ({ id, name }, index) {
                return (
                    <GroupItem
                        key={id}
                        text={name}
                        index={index}
                        groupId={id}
                    ></GroupItem>
                );
            })}
        </GroupWrap>
    );
});

export default function Index(props) {
    const dispatch = useDispatch();
    const {
        onChange = () => {},
        selectOnChange = () => {},
        selectDatas,
        value,
        fields,
        field,
        onSortEnd = () => {},
    } = props;

    return (
        <DndProvider backend={HTML5Backend}>
            <Wrap>
                <Header>
                    <span>请选择实体：</span>
                    <Select
                        datas={selectDatas}
                        style={{
                            width: 100,
                            height: 30,
                        }}
                        optionStyle={{ width: 104 }}
                        value={value}
                        onChange={function (value) {
                            selectOnChange({
                                tableCode: value,
                                field: fields[value] || [],
                            });
                        }}
                    ></Select>
                </Header>
                <FieldList
                    tableCode={value}
                    datas={field}
                    onChange={onChange}
                    onSortEnd={onSortEnd}
                    lockAxis='y'
                    lockToContainerEdges={true}
                    useDragHandle
                ></FieldList>
                <Groups
                    lockAxis='y'
                    lockToContainerEdges={true}
                    onSortEnd={function ({ oldIndex, newIndex }) {
                        dispatch(sortGroups({ oldIndex, newIndex }));
                    }}
                ></Groups>
            </Wrap>
        </DndProvider>
    );
}
