import {
  useCallback,
  useEffect,
  useState,
} from 'react';

import styled from 'styled-components';

import Menu from '@components/Menu/Index';
import ArrowDown from '@icons/arrow/ArrowDown';
import { isReactNode } from '@utils/reactUtil';

const Wrap = styled.div`
    position: relative;
    box-sizing: border-box;
    border: 1px solid lightgray;
    display: flex;
    justify-content: space-between;
    background-color: white;
    align-items: center;
    cursor: pointer;
    font-size: 12px;
    height: 24px;
    width: 100%;
    &[data-disabled='true'] {
        background: #f3f3f3;
        cursor: not-allowed;
    }
    &[data-disabled='false']:hover {
        //border: solid 1px #5292f7;
        border: solid 1px #999999;
    }
`;

const Text = styled.div`
    margin-left: 4px;
`;

const TextWrap = styled.div`
    height: 100%;
    width: calc(100% - 24px);
    display: flex;
    align-items: center;
    padding: 2px;
    overflow: hidden;
`;

const getNode = function (value, datas) {
    if (datas && datas.length > 0) {
        for (let i = 0; i < datas.length; i++) {
            const data = datas[i];
            if (data.value === value) {
                return data;
            }
            const node = getNode(value, data.children);
            if (node !== null) {
                return node;
            }
        }
    }
    return null;
};

const mapToText = function (value, node, datas) {
    let text = '';
    node = node ? node : getNode(value, datas);
    if (node) {
        return node.text;
    }
    return text;
};

const valueToData = function (value, node, datas) {
    return {
        text: mapToText(value, node, datas),
        value,
    };
};

export default function (props) {
    const {
        datas,
        style = {},
        wrapStyle = {},
        optionStyle = {},
        onChange,
        lineIndexs = [],
        //能否取消选择
        cancelAble = false,
        disabled = false,
        //取消选择值
        cancelValue = undefined,
        value,
    } = props;
    const [data, setData] = useState({ text: null, value });
    useEffect(() => {
        setData(valueToData(value, null, datas));
    }, [value]);
    const handleChange = useCallback((val, node) => {
        if (val !== value) {
            setData(valueToData(val, node, datas));
            onChange && onChange(val);
        }
    });
    return (
        <Menu
            datas={datas}
            style={wrapStyle}
            optionStyle={optionStyle}
            onNodeClick={handleChange}
            lineIndexs={lineIndexs}
            cancelAble={cancelAble}
            cancelValue={cancelValue}
            disabled={disabled}
            value={data.value}
        >
            <Wrap style={style} data-disabled={disabled}>
                {isReactNode(data.text) ? (
                    <TextWrap>{data.text}</TextWrap>
                ) : (
                    <Text
                        style={{
                            width: '100%',
                            height: '100%',
                            display: 'flex',
                            alignItems: 'center',
                        }}
                    >
                        {data.text}
                    </Text>
                )}
                <ArrowDown
                    style={{ height: '100%', margin: 0 }}
                    disabled={disabled}
                ></ArrowDown>
            </Wrap>
        </Menu>
    );
}
