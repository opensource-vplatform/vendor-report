import React, { Fragment } from 'react';

import { useSelector } from 'react-redux';
import styled, { createGlobalStyle } from 'styled-components';

import CellStyleSetting from './component/cellStyles/cellStyleSetting';
import {
  DraggableDatasourceList,
} from './component/defineDatasource/defineDatasource';
import Excel from './Excel';
import Nav from './Nav';
import Preview from './Preview';

const GlobalStyle = createGlobalStyle`
    ::-webkit-scrollbar {
        width: 10px;
        height: 10px;
    }

    ::-webkit-scrollbar-track {
        border: 2px solid #fff;
        background-color: #f3f3f3;
    }

    ::-webkit-scrollbar-thumb {
        border: 2px solid #fff;
        background-color: #d5d7da !important;
    }

    ::-webkit-scrollbar-thumb:hover {
        background-color: #b3b6bb !important;
    }

    ::-webkit-scrollbar-thumb:active {
        background-color: #b3b6bb !important;
    }
`;

const Wrap = styled.div`
    height: 100%;
    width: 100%;
    overflow: hidden;
    display: flex;
    flex-direction: column;
`;

const Box = styled.div`
    height: 100%;
    width: 100%;
    padding: 0px;
    margin: 0px;
`;

const SpreadWrap = styled.div`
    display: flex;
    height: 100%;
    width: 100%;
`;

function Designer() {
    const { mode } = useSelector(({ appSlice }) => appSlice);
    return (
        <Fragment>
            <GlobalStyle></GlobalStyle>
            <Box style={{ display: mode == 'edit' ? 'block' : 'none' }}>
                <Wrap>
                    <Nav></Nav>
                    <SpreadWrap>
                        <DraggableDatasourceList></DraggableDatasourceList>
                        <Excel></Excel>
                    </SpreadWrap>
                    <CellStyleSetting></CellStyleSetting>
                </Wrap>
            </Box>
            {mode == 'preview' ? (
                <Wrap>
                    <Preview></Preview>
                </Wrap>
            ) : null}
        </Fragment>
    );
}

export default Designer;
