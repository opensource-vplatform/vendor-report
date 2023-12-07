import styled from 'styled-components';

const IconWrap = styled.label`
    margin: 0px 2px;
    display: flex;
    cursor:pointer;
    align-items: center;
    &:hover {
        background-color: #dadada;
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
`;

function Index(pros) {
    const { icon, tips, active = false, onClick, style={},iconStyle={},children } = pros;
    const st = {...style}
    if(active){
        st.backgroundColor = '#dadada';
    }
    const icSt = {...iconStyle};
    icSt.backgroundImage = icon;
    return (
        <IconWrap title={tips} onClick={onClick} style={st}>
            <Icon
                style={icSt}
            ></Icon>
            {children}
        </IconWrap>
    );
}

export default Index;
