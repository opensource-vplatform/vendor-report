import {
  useEffect,
  useRef,
} from 'react';

import styled from 'styled-components';

import ToRangeIcon from '@icons/formula/ToRange';

const InputArea = styled.div`
      margin-top: 4px;
      margin-bottom: 4px;
      width: 260px;
      height: 26px;
  `;
  
  const InputWrap = styled.div`
      display: flex;
      box-sizing: border-box;
      border: 1px solid #d3d3d3;
      height: 100%;
      background-color: white;
      cursor:text;
      &[data-disabled='false']:hover {
          border: solid 1px #5292f7;
      }
      &[data-disabled='false']:focus-within {
          border: solid 1px #5292f7;
      }
      &[data-disabled='true']{
        cursor: not-allowed;
        background-color: #f3f3f3;
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
      &:disabled{
        cursor: not-allowed;
      }
  `;

export default function (props) {
    const {value,autoFocus,disabled,onIconClick,onChange,onFocus,style={}} = props;
    const ref = useRef(null);
    const handleWrapClick = ()=>{
        if(ref.current){
            ref.current.focus();
        }
    }
    useEffect(()=>{
        if(ref.current&&autoFocus){
            ref.current.focus();
        }
    },[]);
    const handleChange = ()=>{
        onChange&&onChange(ref.current.value);
    }
    return (
        <InputArea style={style}>
            <InputWrap onClick={handleWrapClick} data-disabled={disabled}>
                <Input
                    ref={ref}
                    onFocus={onFocus}
                    onChange={handleChange}
                    disabled={disabled}
                    value={value}
                ></Input>
                <ToRangeIcon disabled={disabled} onClick={()=>onIconClick(ref.current?.value)}></ToRangeIcon>
            </InputWrap>
        </InputArea>
    );
}
