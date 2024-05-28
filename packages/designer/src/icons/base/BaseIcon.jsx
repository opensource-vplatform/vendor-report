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
    &[data-size='large'] {
        padding: 0px;
        margin: 0px;
        height: 24px;
        width: 24px;
    }
    &[data-size='middle'] {
        padding: 0px;
        margin: 0px;
        height: 21px;
        width: 21px;
    }
    &[data-size='small'] {
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
        size,
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
            data-size={size}
            data-disabled={disabled}
            data-hoverable={hoverable}
        >
            <Icon style={icSt} data-size={size}></Icon>
            {children}
        </IconWrap>
    );
}

export default Index;
