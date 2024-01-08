import styled from 'styled-components';

const IconWrap = styled.label`
    margin: 0px 2px;
    display: flex;
    cursor:pointer;
    align-items: center;

    &:hover {
        background-color: #dadada;
    }
    &[data-disabled='true']{
        cursor:not-allowed;
        opacity: 0.5;
    }
    &[data-disabled='true']:hover{
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
    const { icon, tips, active = false, onClick,disabled=false, style={},iconStyle={},children } = pros;
    const st = {...style}
    if(active){
        st.backgroundColor = '#dadada';
    }
    const icSt = {...iconStyle};
    return (
        <IconWrap title={tips} onClick={onClick} style={st} data-disabled={disabled}>
            <Icon
                style={icSt}
                viewBox="0 0 24 24"
            ><path d={icon}></path></Icon>
            {children}
        </IconWrap>
    );
}

export default Index;
