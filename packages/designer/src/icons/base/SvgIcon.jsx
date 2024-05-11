import styled from 'styled-components';

import { IconWrap } from './Component';

const Icon = styled.svg`
    height: 24px;
    width: 24px;
    transform: scale(0.8);
    fill: currentColor;
    &[data-disabled='true'] {
        cursor: not-allowed;
    }
`;

const Path = styled.path`
    &[data-disabled='true'] {
        cursor: not-allowed;
    }
`;

function Index(pros) {
    const {
        icon,
        tips,
        active = false,
        hoverable = true,
        onClick,
        disabled = false,
        style = {},
        svgAttrs = {},
        pathAttrs = {},
        iconStyle = {},
        iconChildren = null,
        children,
    } = pros;
    const st = { ...style };
    if (active) {
        st.backgroundColor = '#dadada';
    }
    const icSt = { ...iconStyle };
    return (
        <IconWrap
            title={tips}
            onClick={onClick}
            style={st}
            data-disabled={disabled}
            data-hoverable={hoverable}
        >
            <Icon style={icSt} data-disabled={disabled} viewBox='0 0 24 24' {...svgAttrs}>
                {icon||pathAttrs ? <Path data-disabled={disabled} d={icon} {...pathAttrs}></Path> : null}
                {iconChildren}
            </Icon>
            {children}
        </IconWrap>
    );
}

export default Index;
