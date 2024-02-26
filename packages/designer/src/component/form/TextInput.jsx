import { useRef } from 'react';

import styled from 'styled-components';

const Wrap = styled.div`
    padding: 8px;
    width: 100%;
    min-height: 26px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid #ddd;
    background-color: #fff;
    border-radius: 4px;
    box-sizing: border-box;
    cursor: pointer;
    &:hover {
        outline: 2px solid #ddd;
    }
    &:focus-within {
        outline: 2px solid #ddd;
    }
    &[data-disabled='true'] {
        outline: none !important;
        cursor: not-allowed;
    }
`;

const Input = styled.input`
    position: relative;
    border: none;
    cursor: pointer;
    caret-color: #777;
    outline: none !important ;
    flex: 1;
    &:focus {
        outline: 2px solid #ddd;
    }
    &:disabled {
        cursor: not-allowed;
        background-color: #f3f3f3;
        color: #333;
    }
`;
export default function Index(props) {
    const {
        value,
        onChange = () => {},
        onBlur = () => {},
        itemType = '',
        disabled = false,
        placeholder = '',
        minWidth,
        width,
        SuffixIcon = {},
        maxLength = 20,
        style = {},
    } = props;
    const ref = useRef();
    const { Component: SuffixComponent, props: SuffixComponentProps = {} } =
        SuffixIcon;

    return (
        <Wrap style={{ minWidth, width, ...style }} data-disabled={disabled} onClick={()=>{
            if(ref.current&&!disabled){
                ref.current.focus();
            }
        }}>
            <Input
                type='text'
                ref={ref}
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                data-item-type={itemType}
                maxLength={maxLength}
                disabled={disabled}
                placeholder={placeholder}
            ></Input>
            {SuffixComponent && (
                <SuffixComponent {...SuffixComponentProps}></SuffixComponent>
            )}
        </Wrap>
    );
}
