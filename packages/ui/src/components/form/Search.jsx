import { useState } from 'react';

import ClearIcon from '../../icons/Clear';
import Search from '../../icons/Search';
import TextInput from './TextInput';

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
  return (
    <TextInput
      value={_value}
      placeholder='搜索'
      width='100%'
      SuffixIcon={
        _value ? (
          <ClearIcon
            style={{ width: 24, height: 24 }}
            hoverable={false}
            onClick={clearHandler}
          ></ClearIcon>
        ) : (
          <Search></Search>
        )
      }
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
