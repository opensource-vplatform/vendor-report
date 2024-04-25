import styled from 'styled-components';

const IconWrap = styled.label`
    margin: 0px 2px;
    display: flex;
    cursor: pointer;
    align-items: center;
    justify-content: center;
    &[data-hoverable='true']:hover {
        background-color: #dadada;
    }
    &[data-disabled='true'] {
        cursor: not-allowed;
        opacity: 0.5;
    }
    &[data-disabled='true']:hover {
        background-color: transparent;
    }
    &[data-type='toone-md'] {
        min-height: 24px;
        min-width: 24px;
    }
`;

const Icon = styled.div`
    height: 8px;
    width: 8px;
    padding: 4px;
    margin: 4px;
    background-repeat: no-repeat;
    background-position: center center;
    background-size: 100%;
    &[data-type='toone'] {
        padding: 0px;
        margin: 0px;
        height: 24px;
        width: 24px;
    }
    &[data-type='toone-md'] {
        padding: 0px;
        margin: 0px;
        height: 18px;
        width: 18px;
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
        iconStyle = {},
        type,
        children,
        ...others
    } = pros;
    const st = { ...style };
    if (active) {
        st.backgroundColor = '#dadada';
    }
    const icSt = { ...iconStyle };
    icSt.backgroundImage = icon;
    const handleClick = (...args) => {
        !disabled && onClick && onClick(...args);
    };
    return (
        <IconWrap
            {...others}
            title={tips}
            onClick={handleClick}
            style={st}
            data-type={type}
            data-disabled={disabled}
            data-hoverable={hoverable}
        >
            <Icon style={icSt} data-type={type}></Icon>
            {children}
        </IconWrap>
    );
}

export default Index;
