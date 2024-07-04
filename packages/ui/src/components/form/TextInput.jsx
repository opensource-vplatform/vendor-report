import {
  useEffect,
  useRef,
  useState,
} from 'react';

import styled from 'styled-components';

const Wrap = styled.div`
  padding: 4px;
  width: 100%;
  min-height: 26px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #ddd;
  background-color: #fff;
  box-sizing: border-box;
  cursor: pointer;
  &[data-disabled='false']:hover {
    border: solid 1px #999999;
  }
  &[data-disabled='true'] {
    outline: none !important;
    cursor: not-allowed;
    background-color: #f3f3f3;
  }
`;

const Input = styled.input`
  width: 100%;
  position: relative;
  border: none;
  cursor: pointer;
  caret-color: #777;
  outline: none !important ;
  flex: 1;
  &:focus-visible {
    outline: none;
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
    onInput,
    onBlur = () => {},
    itemType = '',
    disabled = false,
    placeholder = '',
    minWidth,
    width,
    SuffixIcon = null,
    maxLength = 20,
    style = {},
  } = props;
  const [data, setData] = useState(() => {
    return { innerValue: value, value };
  });
  const ref = useRef();
  useEffect(() => {
    setData(() => {
      return {
        innerValue: value,
        value,
      };
    });
  }, [value]);
  const setVal = (val) => {
    setData((data) => {
      return {
        ...data,
        innerValue: val,
      };
    });
  };
  const handleInput = (evt) => {
    setVal(evt.target.value);
    onInput && onInput(evt.target.value);
  };
  const handleBlur = (evt) => {
    const newVal = evt.target.value;
    if (newVal != data.value) {
      setVal(newVal);
      onChange && onChange(newVal, evt);
    }
    onBlur && onBlur(evt);
  };
  return (
    <Wrap
      style={{ minWidth, width, ...style }}
      data-disabled={disabled}
      onClick={() => {
        if (ref.current && !disabled) {
          ref.current.focus();
        }
      }}
    >
      <Input
        type='text'
        ref={ref}
        value={data.innerValue}
        onInput={handleInput}
        onBlur={handleBlur}
        data-item-type={itemType}
        maxLength={maxLength}
        disabled={disabled}
        placeholder={placeholder}
      ></Input>
      {SuffixIcon}
    </Wrap>
  );
}
