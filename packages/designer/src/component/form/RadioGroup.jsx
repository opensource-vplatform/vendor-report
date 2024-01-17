import { createContext } from 'react';

import styled from 'styled-components';

import CheckedRadio from '@icons/shape/CheckedRadio';
import UnCheckRadio from '@icons/shape/UnCheckRadio';

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

const Context = createContext(null);

export const Radio = function (props) {
    const {
        label,
        //可选值：水平-horizontal，垂直-vertical
        direction = 'horizontal',
        value,
        desc = '',
        children,
    } = props;
    return (
        <Context.Consumer>
            {(ctx) => {
                const checked = ctx.value === value;
                return (
                    <RadioWrap
                        data-disabled={ctx.disabled}
                        title={desc}
                        data-direction={direction}
                        onClick={() =>
                            !ctx.disabled && !checked && ctx.onChange(value)
                        }
                    >
                        {checked ? (
                            <CheckedRadio
                                style={{ color: '#0075ff' }}
                            ></CheckedRadio>
                        ) : (
                            <UnCheckRadio></UnCheckRadio>
                        )}
                        {<Label>{label}</Label>}
                        {children}
                    </RadioWrap>
                );
            }}
        </Context.Consumer>
    );
};

export const RadioGroup = function (props) {
    const { value, disabled = false, children, onChange } = props;
    return (
        <Context.Provider value={{ value, disabled, onChange }}>
            {children}
        </Context.Provider>
    );
};
