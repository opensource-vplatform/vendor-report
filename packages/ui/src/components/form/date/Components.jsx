import { createContext } from 'react';

import styled from 'styled-components';

export const DateContext = createContext(null);

export const PanelWrap = styled.div`
    margin: 0;
    padding: 0;
`;

export const PanelCellsWrap = styled.div`
    width: 196px;
    margin: 10px;
    padding: 0;
    white-space: normal;
`;
