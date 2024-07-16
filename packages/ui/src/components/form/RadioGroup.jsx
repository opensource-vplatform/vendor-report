import { createContext } from 'react';

import styled from 'styled-components';

import CheckedRadio from '../../icons/CheckedRadio';
import UnCheckRadio from '../../icons/UnCheckRadio';

const RadioWrap = styled.div`
  display: flex;
  padding: 4px;
  align-items: center;
  cursor: pointer;
  width: max-content;
  box-sizing: border-box;
  &:hover {
    background-color: #dadada;
  }
  &[data-direction='vertical'] {
    flex-direction: column;
  }
  &[data-disabled='true'] {
    background-color: transparent !important;
    cursor: not-allowed;
  }
`;

const Label = styled.span`
  margin-left: 12px;
  font-size: 12px;
`;

const StyledRadioButton = styled.button`
  background-color: ${(props) => (props.checked ? '#007bff' : 'white')};
  color: ${(props) => (props.checked ? 'white' : '')};
  border: 1px solid #d5ded5;
  cursor: pointer;
  padding: 5px 8px;
  outline: none;
  transition:
    background-color 0.3s,
    color 0.3s;

  &:first-child {
    border-radius: 4px 0 0 4px;
    border-right-width: 1px;
  }

  &:last-child {
    border-radius: 0 4px 4px 0;
    border-left-width: 1px;
  }

  &:not(:first-child):not(:last-child) {
    border-left-width: 1px;
    border-right-width: 1px;
  }

  &:hover {
    background-color: ${(props) => (props.checked ? '#0056b3' : '#e0e0e0')};
  }

  &:not(:first-child) {
    margin-left: -1px;
  }
`;

const Context = createContext(null);

export const Radio = function (props) {
  const {
    label,
    value,
    desc = '',
    children,
    style = {},
    labelStyle = {},
  } = props;
  return (
    <Context.Consumer>
      {(ctx) => {
        const checked = ctx.value === value;
        return (
          <RadioWrap
            data-disabled={ctx.disabled}
            title={desc}
            data-direction={ctx.direction}
            style={style}
            onClick={() =>
              !ctx.disabled && !checked && ctx.onChange(value, label)
            }
          >
            {checked ? (
              <CheckedRadio
                style={{ color: '#0075ff' }}
                disabled={ctx.disabled}
              ></CheckedRadio>
            ) : (
              <UnCheckRadio></UnCheckRadio>
            )}
            {<Label style={labelStyle}>{label}</Label>}
            {children}
          </RadioWrap>
        );
      }}
    </Context.Consumer>
  );
};

export const RadioGroup = function (props) {
  const {
    value,
    disabled = false,
    children,
    onChange,
    //可选值：水平-horizontal，垂直-vertical
    direction = 'horizontal',
  } = props;
  return (
    <Context.Provider value={{ value, disabled, onChange, direction }}>
      {children}
    </Context.Provider>
  );
};

const RadioButton = function (props) {
  const { value, children, style = {} } = props;
  return (
    <Context.Consumer>
      {(ctx) => {
        const checked = ctx.value === value;
        return (
          <StyledRadioButton
            checked={checked}
            data-disabled={ctx.disabled}
            data-direction={ctx.direction}
            style={style}
            onClick={() =>
              !ctx.disabled && !checked && ctx.onChange(value)
            }
          >
            {children}
          </StyledRadioButton>
        );
      }}
    </Context.Consumer>
  );
};

Radio.Button = RadioButton;
