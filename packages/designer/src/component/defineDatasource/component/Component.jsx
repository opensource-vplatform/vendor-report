import styled from 'styled-components';

export const Item = styled.div`
    font-size: 12px;
`;

export const ItemList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    background-color: white;
    padding: 8px;
`;

export const Title = styled.span`
    font-size: 12px;
    flex: 1;
    &[data-disabled='true'] {
        opacity: 0.6;
    }
`;