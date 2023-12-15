import styled from 'styled-components';

import Clear from '@icons/table/Clear';

const Wrap = styled.div`
    display: flex;
    font-size: 12px;
    margin: 4px;
    padding: 4px 8px;
    align-items: center;
    &:hover{
        background-color: lightgray;
    }
`;

const Title = styled.span`
    display: flex;
    margin-left: 8px;
    margin-top: -2px;
    algin-items: center;
`;

export default function(props){
    const {onClick} = props;
    return <Wrap onClick={onClick}>
        <Clear iconStyle={{width:10,height:10}}></Clear>
        <Title>清除</Title>
    </Wrap>
}