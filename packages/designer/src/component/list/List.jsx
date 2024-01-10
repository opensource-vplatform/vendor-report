import React, {
  createRef,
  useEffect,
  useState,
} from 'react';

import styled from 'styled-components';

import { scrollIntoView } from '@utils/domUtil';

const Wrap = styled.div`
    margin: 5px 0px;
`;

const Input = styled.input`
    height: 25px;
    width: calc(100% - 12px);
    padding-left: 10px;
    display: flex;
    align-items: center;
    font-size: 12px;
    border: 1px solid lightgray;
    &:focus-visible {
        outline: unset;
    }
`;

const ListWrap = styled.div`
    border: 1px solid lightgray;
    overflow: auto;
    height: 100%;
    width: 100%;
`;

const ListItem = styled.div`
    height: 30px;
    width: auto;
    margin: 2px;
    padding-left: 10px;
    display: flex;
    align-items: center;
    cursor: pointer;
    font-size: 12px;
    &:hover,
    :active {
        background-color: #dbdbdb;
    }
    &[data-selected= 'true'] {
        height: 30px;
        width: auto;
        margin: 2px;
        padding-left: 10px;
        display: flex;
        align-items: center;
        cursor: pointer;
        font-size: 12px;
        background-color: #dbdbdb;
    }
    &[data-style= 'red'] {
        color: red;
    }
`;

const List = ({
    values, // 数据源：数组类型
    objDatas = null, //数据源拓展：可传对象
    width = 'auto',
    height = 'auto',
    selectedValue,
    onChange,
    isHasInput = false,
    onDoubleClick = () => {},
    style = {},
}) => {
    const [filterText, setFilterText] = useState(selectedValue);
    const listDom = createRef(null);
    const handleItemClick = (value) => {
        onChange(value);
        setFilterText(value);
    };
    useEffect(() => {
        //将选中的元素滚动到可视范围内
        const dom = listDom.current;
        if (dom) {
            const children = dom.children;
            if (children && children.length > 0) {
                for (let index = 0; index < children.length; index++) {
                    const child = children[index];
                    const dataset = child.dataset;
                    if (dataset&&dataset.selected == 'true') {
                        scrollIntoView(child, true);
                        break;
                    }
                }
            }
        }
    }, [selectedValue]);
    return (
        <Wrap style={{ width, height, ...style }}>
            {isHasInput && (
                <Input
                    onChange={(e) => setFilterText(e.target.value)}
                    value={filterText}
                />
            )}
            <ListWrap ref={listDom}>
                {values?.map((value, index) => {
                    const isSelected = selectedValue === value;
                    return (
                        <ListItem
                            key={value + index}
                            data-selected={isSelected}
                            onClick={() => handleItemClick(value)}
                            onDoubleClick={onDoubleClick}
                        >
                            {value}
                        </ListItem>
                    );
                })}
                {objDatas &&
                    Object.keys(objDatas).map((key) => {
                        const isSelected = selectedValue === key;
                        return (
                            <ListItem
                                key={key}
                                data-selected={isSelected}
                                data-style={key.includes('red') ? 'red' : ''}
                                onClick={() => handleItemClick(key)}
                            >
                                {objDatas[key]}
                            </ListItem>
                        );
                    })}
            </ListWrap>
        </Wrap>
    );
};

export default List;
