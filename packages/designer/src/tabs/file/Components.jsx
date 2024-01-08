import styled from 'styled-components';

export const DetailWrap = styled.div`
    width: 100%;
    height: 100%;
    padding-left: 5%;
    display: flex;
    flex-direction: column;
`;

export const DetailTitle = styled.div`
    margin-bottom: 16px;
    font-size: x-large;
    color: #217346;
`;

export const DetailSubTitle = styled.div`
    margin-top: 8px;
    margin-bottom: 8px;
    font-size: medium;
`;

export const DetialOptions = styled.ul`
    list-style: none;
    padding: 0;
    margin: 0;
`;

export const DetailOption = styled.li`
    padding: 2px 0px;
    cursor: pointer;
`;

export const DetailLabel = styled.label`
    display: flex;
    width: max-content;
    align-items: center;
    &:hover{
        background-color: #dadada;
    }
`;

export const DetailInput = styled.input`
    cursor: pointer;
    &[type="text"]{
        margin-top: 8px;
        width: 200px;
        padding: 1px 5px;
        line-height: 24px;
        height: 24px;
        box-sizing: border-box;
        border: solid 1px #d3d3d3;
        border-radius: 4px;
        font-family: inherit;
        font-size: 12px;
    }
    &:focus-visible{
        border: solid 1px #5292f7;
        outline: none;
    }
    &:hover{
        border: solid 1px #5292f7;
    }
`;

export const DetailDesc = styled.span`
    cursor: pointer;
    margin-right: 8px;
`;

export const None = styled.div`
    display: none;
`;

export const ImportButtonWrap = styled.div`
    border: 1px solid #ababab;
    width: 91px;
    height: 91px;
    padding: 8px;
    margin: 30px 20px 20px 0;
    cursor: pointer;
    display:flex;
    flex-direction:column;
    justify-content: space-between;
    &:hover{
        background-color:#d3f0e0;
    }
`;

export const ExcelIcon = styled.div`
    background-image: url("data:image/png;base64,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");
    width: 32px;
    height: 32px;
    margin: 10px auto 10px auto;
`;

export const CsvIcon = styled.div`
    background-image: url("data:image/png;base64,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");
    width: 32px;
    height: 32px;
    margin: 10px auto 10px auto;
`;

export const IconTitle = styled.div`
    padding: 8px 0px;
    display: block;
    text-align: center;
    font-size: small;
`;