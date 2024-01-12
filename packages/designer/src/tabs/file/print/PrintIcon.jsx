import styled from 'styled-components';

import PrintIcon from '@icons/shape/Print';

const Wrap = styled.div`
    width: 80px;
    height: 80px;
    margin: 15px 0px 15px 50px;
    border: 1px solid #dadada;
    display: flex;
    flex-direction: column;
    align-items: center;
    cursor: pointer;
    &:hover{
        color:#1976d2;
        background-color: #d3f0e0;
    }
`;

const Title = styled.div`
    font-size: 12px;
`;

export default function(props){
    return <Wrap {...props}>
        <PrintIcon style={{backgroundColor:'transparent'}} iconStyle={{width:60,height:60}}></PrintIcon>
        <Title>打印</Title>
    </Wrap>
}