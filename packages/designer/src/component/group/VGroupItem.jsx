import styled from 'styled-components';

export default styled.div`
    display: flex;
    flex-direction: column;
    &~div{
        border-left: solid 1px lightgray;
    }
`;
