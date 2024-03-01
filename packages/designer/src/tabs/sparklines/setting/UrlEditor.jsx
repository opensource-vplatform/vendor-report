import { useState } from 'react';

import styled from 'styled-components';

const Wrap = styled.div`
    display: flex;
    width: 100%;
    height: 100%;
    padding: 0px;
    border: 1px solid #d3d3d3;
    min-height: 24px;
    background: white;
}
`;

const InputWrap = styled.div`
    padding: 0px;
    display: flex;
    width: 100%;
    background-color: white;
`;

const Input = styled.input`
    width: 100%;//calc(100% - 24px);
    height: 100%;
    border: none;
    padding-top: 1px;
    padding-bottom: 1px;
    align-self: center;
    outline: none;
`;

export default function (props) {
    const { value, onIconClick, style={} } = props;
    const [data, setData] = useState(value);
    const handleInput = (evt) => {
        const target = evt.target;
        setData(target.value);
    };
    return (
        <Wrap style={style}>
            <InputWrap>
                <Input value={data} onInput={handleInput}></Input>
                {/*<ToSettingIcon onClick={onIconClick}></ToSettingIcon>*/}
            </InputWrap>
        </Wrap>
    );
}
