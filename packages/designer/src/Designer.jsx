import React, { Fragment, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import styled, { createGlobalStyle } from 'styled-components';

import { hideTab, setActive, showTab } from '@store/navSlice/navSlice';
import { isBindingTable } from '@utils/bindingUtil';

import CellStyleSetting from './component/cellStyles/cellStyleSetting';
import { DraggableDatasourceList } from './component/defineDatasource/defineDatasource';
import DesignerContext from './DesignerContext';
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
    const dispatch = useDispatch();
    const { mode, spread } = useSelector(({ appSlice }) => appSlice);
    const { active, hideCodes } = useSelector(({ navSlice }) => navSlice);
    const [data] = useState({});
    data.spread = spread;
    data.active = active;
    data.hideCodes = hideCodes;
    const ctxValue = {
        handleSelectionChange: () => {
            const sheet = data.spread.getActiveSheet();
            const inTable = isBindingTable(sheet);
            if (inTable) {
                //在表格区域
                if (data.hideCodes.indexOf('table') != -1) {
                    //表格设计被隐藏，需要显示出来
                    dispatch(showTab({ code: 'table' }));
                }
            } else if (data.hideCodes.indexOf('table') == -1) {
                //不在表格区域，且存在表设计页签，需要隐藏表设计页签
                dispatch(hideTab({ code: 'table' }));
            }
            if (!inTable && data.active == 'table') {
                dispatch(setActive({ code: 'start' }));
            }
        },
    };
    return (
        <Fragment>
            <DesignerContext.Provider value={ctxValue}>
                <GlobalStyle></GlobalStyle>
                <Box style={{ display: mode == 'edit' ? 'block' : 'none' }}>
                    <Wrap>
                        <Nav></Nav>
                        <SpreadWrap
                            style={{
                                overflow: 'hidden',
                            }}
                        >
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
            </DesignerContext.Provider>
        </Fragment>
    );
}

export default Designer;
