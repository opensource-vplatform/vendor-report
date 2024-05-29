import styled from 'styled-components';

import ErrorIcon from './ErrorIcon';

const Wrap = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 10px;
`;

const ErrorText = styled.span`
    color: red;
`;

export default function(){
    return <Wrap>
        <ErrorIcon></ErrorIcon>
        <ErrorText>错误</ErrorText>
    </Wrap>
}