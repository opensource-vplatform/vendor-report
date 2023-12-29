import {
  useCallback,
  useEffect,
  useState,
} from 'react';

import styled from 'styled-components';

import Menu from '@components/Menu/Index';
import ArrowDown from '@icons/arrow/ArrowDown';

const Wrap = styled.div`
    position: relative;
    border: 1px solid lightgray;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 10px;
    cursor: pointer;
    font-size: 12px;
    height: 24px;
    padding: 0 0 0 0.2em;
    width: 100%;
`;

const Text = styled.div``;

const mapToText = function (value, datas) {
    let text = '';
    if (datas && datas.length > 0) {
        for (let i = 0, l = datas.length; i < l; i++) {
            const data = datas[i];
            if (value == data.value) {
                text = data.text;
                break;
            }
        }
    }
    return text;
};

const valueToData = function(value,datas){
    return {
        text: mapToText(value,datas),
        value,
    };
}

export default function (props) {
    const {
        datas,
        style = {},
        optionStyle = {},
        onChange,
        lineIndexs = [],
        //能否取消选择
        cancelAble = false,
        //取消选择值
        cancelValue = undefined,
        value,
    } = props;
    const [data, setData] = useState({ text: mapToText(value), value });
    useEffect(() => {
        setData(valueToData(value,datas));
    }, [value]);
    const handleChange = useCallback((val)=>{
        if(val!==value){
            setData(valueToData(val,datas));
            onChange&&onChange(val);
        }
    });
    return (
        <Menu
            datas={datas}
            optionStyle={optionStyle}
            onNodeClick={handleChange}
            lineIndexs={lineIndexs}
            cancelAble={cancelAble}
            cancelValue={cancelValue}
            value={data.value}
        >
            <Wrap style={style}>
                <Text>{data.text}</Text>
                <ArrowDown></ArrowDown>
            </Wrap>
        </Menu>
    );
}
