import { useState } from 'react';

import styled from 'styled-components';

import Search from '../../icons/Search';
import TextInput from './TextInput';

const CIcon = styled.div`
    width: 16px;
    height: 16px;
    padding: 0px;
    cursor: pointer;
`;

function SearchIcon() {
    return <Search></Search>;
}

function CloseIcon(props) {
    const { onClick } = props;
    const clickHandler = function () {
        if (typeof onClick === 'function') {
            onClick();
        }
    };
    return <CIcon onClick={clickHandler}></CIcon>;
}

export default function Index(props) {
    const { value = '', onInput, onClear } = props;
    const [_value, setValue] = useState(value);
    const inputHandler = function (e) {
        if (typeof onInput === 'function') {
            const newValue = e?.target?.value;
            setValue(newValue);
            onInput(newValue);
        }
    };
    const clearHandler = function () {
        if (typeof onClear === 'function') {
            setValue('');
            onClear();
        }
    };
    const SuffixIcon = _value
        ? {
              Component: CloseIcon,
              props: {
                  onClick: clearHandler,
              },
          }
        : { Component: SearchIcon };
    return (
        <TextInput
            value={_value}
            placeholder='搜索'
            width='100%'
            SuffixIcon={SuffixIcon}
            onChange={inputHandler}
            style={{
                border: 'none',
                outline: 'none',
                borderRadius: 'unset',
                borderBottom: 'solid 1px lightgray',
            }}
        ></TextInput>
    );
}
