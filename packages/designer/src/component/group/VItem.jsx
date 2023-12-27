import styled from 'styled-components';

const Wrap = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    cursor: pointer;
    align-items: center;
    &:hover{
        background-color: #dadada;
    }
`;

const IconWrap = styled.div`
    padding: 4px;
`;

const TitleWrap = styled.div`
    display: flex;
    align-items: center;
`;

const Title = styled.div`
    align-self: center;
    font-size: 10px;
    width:100%;
    text-align:center;
`;

export default function(props){
    const {title,desc='',icon,onClick,style={},children} = props;
    return <Wrap title={desc} onClick={onClick} style={style}>
        <IconWrap>
        {icon}
        </IconWrap>
        <TitleWrap>
            <Title>{title}</Title>
        </TitleWrap>
        {children}
    </Wrap>
}