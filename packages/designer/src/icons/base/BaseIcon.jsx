import styled from 'styled-components';

import { IconWrap } from './Component';

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
