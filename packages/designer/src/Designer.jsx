import React, { Fragment } from 'react';

import { useSelector } from 'react-redux';
import styled from 'styled-components';

import CellStyleSetting from './component/cellStyles/cellStyleSetting';
import {
  DraggableDatasourceList,
} from './component/defineDatasource/defineDatasource';
import Excel from './Excel';
import Nav from './Nav';
import Preview from './Preview';

const Wrap = styled.div`
    height: 100%;
    width: 100%;
    overflow: hidden;
    display: flex;
    flex-direction: column;
`;

const SpreadWrap = styled.div`
    display: flex;
    height: 100%;
    width: 100%;
`;

function Designer() {
    const { mode } = useSelector(({ appSlice }) => appSlice);
    return (
        <Wrap>
            {mode == 'edit' ? (
                <Fragment>
                    <Nav></Nav>
                    <SpreadWrap>
                        <DraggableDatasourceList></DraggableDatasourceList>
                        <Excel></Excel>
                    </SpreadWrap>
                    <CellStyleSetting></CellStyleSetting>
                </Fragment>
            ) : (
                <Preview></Preview>
            )}
        </Wrap>
    );
}

export default Designer;
