import styled from 'styled-components';

import FillCheckIcon from '@icons/shape/FillCheck';
import FillUnCheckIcon from '@icons/shape/FillUnCheck';

const Label = styled.label`
    display: flex;
    align-items: center;
    cursor: pointer;
    padding: 4px;
    box-sizing: border-box;
    &:hover {
        background-color: #dadada;
    }
    &[data-disabled='true'] {
        background-color: transparent !important;
        cursor: not-allowed;
    }
`;

const Input = styled.input`
    margin: 0px;
    padding: 0px;
`;

const Title = styled.span`
    margin-left: 12px;
    font-size: 12px;
`;

export default function (props) {
    const { title, value, onChange, disabled, desc = '', children } = props;
    const dsb = !!disabled;
    const checked = !!value;
    const defaultStyle = dsb
        ? { backgroundColor: 'transparent', cursor: 'not-allowed' }
        : {};
    return (
        <Label
            data-disabled={dsb}
            title={desc}
            onClick={() => !disabled && onChange && onChange(!checked)}
        >
            {checked ? (
                <FillCheckIcon
                    style={{
                        ...defaultStyle,
                        color: dsb ? '#bdbdbd' : '#0075ff',
                    }}
                >
                    {children}
                </FillCheckIcon>
            ) : (
                <FillUnCheckIcon
                    style={{
                        ...defaultStyle,
                        color: dsb ? '#bdbdbd' : '#6d6d6d',
                    }}
                >
                    {children}
                </FillUnCheckIcon>
            )}
            {title && <Title>{title}</Title>}
        </Label>
    );
}
