import styled from 'styled-components';

import FillCheckIcon from '@icons/shape/FillCheck';
import FillUnCheckIcon from '@icons/shape/FillUnCheck';

const Label = styled.label`
    display: flex;
    align-items: center;
    cursor: pointer;
    padding: 4px;
    box-sizing: border-box;
    &.defaultHover:hover {
        background-color: #dadada;
    }
    &[data-disabled='true'] {
        background-color: transparent !important;
        cursor: not-allowed;
    }
    &[data-readonly='true'] {
        background-color: transparent !important;
    }
`;

const Input = styled.input`
    margin: 0px;
    padding: 0px;
`;

const Title = styled.span`
    margin-left: 12px;
    font-size: 12px;
    min-width: max-content;
`;

export default function (props) {
    const {
        title,
        value,
        onChange,
        style = {},
        iconStyle = {},
        disabled,
        desc = '',
        children,
        readonly=false,
        titleStyle = {},
        hover = 'defaultHover',
    } = props;
    const dsb = !!disabled;
    const checked = !!value;
    const defaultStyle = dsb
        ? { backgroundColor: 'transparent', cursor: 'not-allowed' }
        : {};
    return (
        <Label
            className={hover}
            data-disabled={dsb}
            data-readonly={readonly}
            style={style}
            title={desc}
            onClick={() => !disabled && onChange && onChange(!checked)}
        >
            {checked ? (
                <FillCheckIcon
                    style={{
                        ...defaultStyle,
                        color: dsb ? '#aaaaaa' : '#155cec',
                    }}
                    hoverable={!(readonly||disabled)}
                    iconStyle={iconStyle}
                >
                    {children}
                </FillCheckIcon>
            ) : (
                <FillUnCheckIcon
                    style={{
                        ...defaultStyle,
                        color: dsb ? '#aaaaaa' : '#6d6d6d',
                    }}
                    hoverable={!(readonly||disabled)}
                    iconStyle={iconStyle}
                >
                    {children}
                </FillUnCheckIcon>
            )}
            {title && <Title style={titleStyle}>{title}</Title>}
        </Label>
    );
}
