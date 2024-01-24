import styled from 'styled-components';

const IconWrap = styled.label`
    margin: 0px 2px;
    display: flex;
    align-items: center;
    &[data-hoverable='true']:hover {
        cursor: pointer;
        background-color: #dadada;
    }
    &[data-disabled='true'] {
        cursor: not-allowed;
        opacity: 0.5;
    }
    &[data-disabled='true']:hover {
        background-color: transparent;
    }
`;

const Icon = styled.svg`
    height: 24px;
    width: 24px;
    transform: scale(0.8);
    fill: currentColor;
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
            <Icon style={icSt} viewBox='0 0 24 24' {...svgAttrs}>
                {icon||pathAttrs ? <path d={icon} {...pathAttrs}></path> : null}
                {iconChildren}
            </Icon>
            {children}
        </IconWrap>
    );
}

export default Index;
