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

export const JRLIcon = styled.div`
    background-image: url(data:image/png;base64,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);
    width: 32px;
    height: 32px;
    margin: 10px auto 10px auto;
`;


export const PdfIcon = styled.div`
    background-image:url("data:image/png;base64,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");
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