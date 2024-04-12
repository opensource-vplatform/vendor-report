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
import { Setting as CellStylesSetting } from '@components/cellStyles/Index';
import { DraggableDatasources } from '@components/defineDatasource/Index';
import Error from '@components/error/Index';
import Loading from '@components/loading/Index';
import { SelectBox } from '@components/range/Index';
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
import { initWizardSlice } from '@store/wizardSlice';
import { setBaseUrl } from '@utils/environmentUtil';
import { isBindingTable } from '@utils/worksheetUtil';

import DesignerContext from './DesignerContext';
import EditorBar from './EditorBar';
import Excel from './Excel';
import Nav from './Nav';
import Preview from './Preview';
import { isFormulaSparklineSelected } from './utils/formulaUtil';

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
    if (conf && conf.baseUrl) {
        setBaseUrl(conf.baseUrl);
    }
    const dispatch = useDispatch();
    const { mode, spread, waitMsg, errorMsg, navStyle } = useSelector(
        ({ appSlice }) => appSlice
    );
    const { active, hideCodes } = useSelector(({ navSlice }) => navSlice);
    const { visible } = useSelector(({rangeSlice})=>rangeSlice);
    const cellSettingSlice = useSelector(({cellSettingSlice})=>cellSettingSlice);
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
            const sparklinesSel = isFormulaSparklineSelected(
                data.spread,
                sheet
            );
            if (sparklinesSel) {
                if (data.hideCodes.indexOf('sparklines') != -1) {
                    dispatch(showTab({ code: 'sparklines' }));
                    dispatch(setActive({ code: 'sparklines' }));
                }
            } else if (data.hideCodes.indexOf('sparklines') == -1) {
                dispatch(hideTab({ code: 'sparklines' }));
            }
            if (
                (!inTable && data.active == 'table') ||
                (!sparklinesSel && data.active == 'sparklines')
            ) {
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
                    datasourceSlice: conf?.json?.context?.datasourceSlice,
                })
            );

            dispatch(
                initWizardSlice({
                    wizardSlice: conf?.json?.context?.wizardSlice,
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
                        {visible ? <SelectBox></SelectBox>:null}
                        {cellSettingSlice.visible ? <CellStylesSetting></CellStylesSetting>:null}
                        {isShowNav && <Nav></Nav>}
                        <SplitPane
                            style={{
                                width: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                overflow: 'hidden',
                            }}
                            onResize={() => spread.refresh()}
                        >
                            <EditorBar></EditorBar>
                            <Resizer
                                size={10}
                                minSize={26}
                                direction='v'
                            ></Resizer>
                            <SpreadWrap
                                style={{
                                    overflow: 'hidden',
                                    borderTop: '1px solid #ababab',
                                }}
                            >
                                <SplitPane
                                    style={{ width: '100%' }}
                                    onResize={() => spread.refresh()}
                                >
                                    <Pane style={{ width: 248 }}>
                                        <DraggableDatasources></DraggableDatasources>
                                    </Pane>
                                    <Resizer size={8}></Resizer>
                                    <Pane style={{ width: '100%', flex: 1 }}>
                                        <Excel></Excel>
                                    </Pane>
                                </SplitPane>
                            </SpreadWrap>
                        </SplitPane>
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
