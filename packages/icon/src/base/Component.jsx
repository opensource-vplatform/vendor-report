import styled from 'styled-components';

export const IconWrap = styled.label`
    margin: 0px 2px;
    display: flex;
    cursor: pointer;
    align-items: center;
    justify-content: center;
    &[data-hoverable='true']:hover {
        background-color: #dadada;
    }
    &[data-disabled='true'] {
        cursor: not-allowed;
        opacity: 0.5;
    }
    &[data-disabled='true']:hover {
        background-color: transparent;
    }
    &[data-size='middle'] {
        min-height: 24px;
        min-width: 24px;
    }
`;