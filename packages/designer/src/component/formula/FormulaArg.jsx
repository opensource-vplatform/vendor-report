import {
  memo,
  useEffect,
  useRef,
} from 'react';

import styled from 'styled-components';

import ToRangeIcon from '@icons/formula/ToRange';

const Wrap = styled.div`
      display: flex;
      padding: 0px;
      margin: 4px;
  `;
  
  const Title = styled.div`
      display: flex;
      flex-direction: row-reverse;
      align-items: center;
      width: 100px;
      font-size: 11pt;
      margin-right: 10px;
  `;
  
  const InputArea = styled.div`
      margin-top: 4px;
      margin-bottom: 4px;
      width: 260px;
      height: 26px;
  `;
  
  const InputWrap = styled.div`
      padding: 1px;
      display: flex;
      border: 1px solid #d3d3d3;
      height: 100%;
      background-color: white;
      cursor:text;
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
  
  export default memo(function (params) {
      const {
          id,
          value,
          title,
          onIconClick,
          onFocus,
          focus = false,
          onInput,
      } = params;
      const ref = useRef();
      useEffect(() => {
          if (focus && ref.current) {
              ref.current.focus();
          }
      }, [value]);
      const handleWrapClick = ()=>{
          if(ref.current){
              ref.current.focus();
          }
      }
      return (
          <Wrap>
              <Title>{title}:</Title>
              <InputArea>
                  <InputWrap onClick={handleWrapClick}>
                      <Input
                          ref={ref}
                          data-id={id}
                          onFocus={onFocus}
                          onInput={onInput}
                          value={value}
                      ></Input>
                      <ToRangeIcon onClick={(evt)=>{onIconClick(evt,id)}}></ToRangeIcon>
                  </InputWrap>
              </InputArea>
          </Wrap>
      );
  });