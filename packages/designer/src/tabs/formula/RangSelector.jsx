import styled from 'styled-components';

import ToSettingIcon from '@icons/formula/ToSetting';

const Wrap = styled.div`
    width:100%;
    margin-top: 10px;
`;

const InputWrap = styled.div`
    padding: 1px;
    display: flex;
    border: 1px solid #d3d3d3;
    height: 100%;
    background-color: white;
    &:hover {
        border: solid 1px #5292f7;
    }
    &:focus-within {
        border: solid 1px #5292f7;
    }
`;

const Input = styled.input`
    padding-left: 2px;
    width: calc(100% - 24px);
    border: none;
    padding-top: 1px;
    padding-bottom: 1px;
    align-self: center;
    outline: none;
`;

export default function(props){
    const {data,setData} = props;
    const handleInput = (evt)=>{
        const target = evt.target;
        const current = data.current;
        const arg = data.args[current];
        const newArg = {...arg,exp:target.value};
        data.args[current] = newArg;
        setData({
            ...data,
            args:data.args
        });
    }
    return <Wrap>
        <InputWrap>
            <Input value={data.args[data.current].exp} onInput={handleInput}></Input>
            <ToSettingIcon onClick={()=>{
                setData(data=>{
                    return {
                        ...data,
                        mode:'base'
                    };
                });
            }}></ToSettingIcon>
        </InputWrap>
    </Wrap>
}