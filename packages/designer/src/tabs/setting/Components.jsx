import styled from 'styled-components';

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

export const VGroupItem = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
`;

export const ItemList = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    padding: 8px 6px;
`;

export const Selector = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
`;
export const SelectTittle = styled.span`
    font-size: 12px;
    margin-left: 8px;
    flex: 1;
`;
export const SelectWrapper = styled.span`
    flex: 1.5;
`;