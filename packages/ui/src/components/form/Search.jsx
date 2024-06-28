import { useState } from 'react';

import styled from 'styled-components';

import ClearIcon from '../../icons/Clear';
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
    return <ClearIcon style={{width:24,height:24}} hoverable={false} onClick={clickHandler}></ClearIcon>;
}

export default function Index(props) {
    const { value = '', onInput, onClear } = props;
    const [_value, setValue] = useState(value);
    const inputHandler = function (val) {
        if (typeof onInput === 'function') {
            setValue(val);
            onInput(val);
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
            onInput={inputHandler}
            style={{
                border: 'none',
                outline: 'none',
                borderRadius: 'unset',
                borderBottom: 'solid 1px lightgray',
            }}
        ></TextInput>
    );
}
