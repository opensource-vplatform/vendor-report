import styled from 'styled-components';

export const Wrap = styled.div`
    display: flex;
    flex-direction: column;
    font-size: 12px;
`;

export const Title = styled.div`
    background-color: #f0f2f5;
    font-weight: bold;
    color: #444;
    padding: 3px 4px;
    height: 15px;
    font-size: 12px;
`;

export const Content = styled.div`
    display: flex;
    padding: 2px;
`;

export const BlockVList = styled.div`
    display: flex;
    flex-direction: column;
`;

export const BlockHList = styled.div`
    display: flex;
    flex-direction: row;
`;

export const ColorBlock = styled.div`
    width: 12px;
    height: 12px;
    margin: 0px 2px;
    border: 1.5px solid #fff;
    cursor: pointer;
    &:hover {
        border: 1.5px solid #f5ab5d;
    }
    &[data-selected='true'] {
        border: 1.5px solid #f5ab5d;
    }
`;

export const ColorButton = styled.div`
    display: flex;
    width: 100%;
    cursor: pointer;
    align-items: center;
    padding: 4px;
    &:hover {
        background-color: #dadada;
    }
`;

export const Divider = styled.div`
    width: 1px;
    height: 20px;
    margin: 0px 4px;
    border-left: solid 1px #dadada;
`;