import styled from 'styled-components';

const Wrap = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    cursor: pointer;
    &:hover{
        background-color: lightgray;
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
    const {title,desc='',icon,onClick,style={}} = props;
    return <Wrap title={desc} onClick={onClick} style={style}>
        <IconWrap>
        {icon}
        </IconWrap>
        <TitleWrap>
            <Title>{title}</Title>
        </TitleWrap>
    </Wrap>
}