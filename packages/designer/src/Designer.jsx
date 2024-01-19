import React, {
  Fragment,
  useEffect,
  useState,
} from 'react';

import {
  useDispatch,
  useSelector,
} from 'react-redux';
import styled, { createGlobalStyle } from 'styled-components';

import CellStyleSetting from '@components/cellStyles/cellStyleSetting';
import { DraggableDatasources } from '@components/defineDatasource/Index';
import Error from '@components/error/Index';
import Loading from '@components/loading/Index';
import {
  Pane,
  Resizer,
  SplitPane,
} from '@components/splitpane/Index';
import { setErrorMsg } from '@store/appSlice/appSlice';
import { initDatasource } from '@store/datasourceSlice/datasourceSlice';
import {
  hideTab,
  setActive,
  showTab,
} from '@store/navSlice/navSlice';
import { isBindingTable } from '@utils/worksheetUtil';

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
    font-family: 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB',
        'Microsoft YaHei', 微软雅黑, Arial, sans-serif;
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

function Designer(props) {
    const { conf } = props;
    const dispatch = useDispatch();
    const { mode, spread, waitMsg, errorMsg, navStyle } = useSelector(
        ({ appSlice }) => appSlice
    );
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
        conf,
    };
    useEffect(
        function () {
            dispatch(
                initDatasource({
                    datasource: conf?.dataSource?.dataSourceDefinition,
                    datas: conf?.dataSource?.datas,
                })
            );
        },
        [conf?.dataSource?.dataSourceDefinition]
    );
    useEffect(() => {
        if (spread) {
            spread.refresh();
        }
    }, [navStyle]);
    //是否显示导航
    const isShowNav = conf?.nav !== false;
    return (
        <Fragment>
            <DesignerContext.Provider value={ctxValue}>
                <GlobalStyle></GlobalStyle>
                {waitMsg != null ? <Loading title={waitMsg}></Loading> : null}
                {errorMsg != null ? (
                    <Error
                        message={errorMsg}
                        onClose={() => {
                            dispatch(setErrorMsg({ message: null }));
                        }}
                    ></Error>
                ) : null}
                <Box style={{ display: mode == 'edit' ? 'block' : 'none' }}>
                    <Wrap>
                        {isShowNav && <Nav></Nav>}
                        <SpreadWrap
                            style={{
                                overflow: 'hidden',
                                marginTop: isShowNav ? 8:0
                            }}
                        >
                            <SplitPane
                                style={{ width: '100%' }}
                                onResize={() => spread.refresh()}
                            >
                                <Pane style={{ width: 248 }}>
                                    <DraggableDatasources></DraggableDatasources>
                                </Pane>
                                <Resizer width={8}></Resizer>
                                <Pane style={{ width: '100%', flex: 1 }}>
                                    <Excel></Excel>
                                </Pane>
                            </SplitPane>
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
