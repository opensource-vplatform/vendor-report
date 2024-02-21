import styled from 'styled-components';

export const VGroupItem = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
`;

export const Wrapper = styled.div`
    margin: 10px;
`;

export const Label = styled.span`
    font-size: 12px;
    margin: 4px;
    &[data-disabled='true'] {
        opacity:0.6;
    }
`;

export const HLayout = styled.div`
    display: flex;
`;