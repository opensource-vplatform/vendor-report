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

import SparkLine from './component/sparkline/SparkLine';
import DesignerContext from './DesignerContext';
import EditorBar from './EditorBar';
import Excel from './Excel';
import Nav from './Nav';
import Preview from './Preview';
import { hasCellTagPlugin } from './utils/worksheetUtil';

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
    .toone-link{
        background-image:url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB2aWV3Qm94PSIwIDAgMTYgMTYiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8dGl0bGU+bGluazwvdGl0bGU+CiAgICA8ZyBpZD0ibGluayIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPHBhdGggZD0iTTExLjQ5OTk4OTksMSBDMTAuNTY1MTkxNywxIDkuNjg2NDM4NjYsMS4zNjQyODU4MiA5LjAyNTg3ODI0LDIuMDI1ODA0NDUgTDYuNDAwNjMxNTcsNC42NTA4Njc5NiBMNi40MDA2MzE4MSw0LjY1MDg2NzcyIEM1Ljc0MTY5NzAxLDUuMzA0OTA4OCA1LjM3MTkxNTA4LDYuMTk1NDE1NSA1LjM3Mzc0NzMzLDcuMTIzODA3OTcgQzUuMzczNzQ3MzMsOC4zMjA3NDc2NiA1Ljk3NzI2OTE2LDkuNDIxNjEwODEgNi45ODkxNDAwNSwxMC4wNzAxMjU1IEw2Ljk4OTE0MDA4LDEwLjA3MDEyNTUgQzcuMTM2MTMzMDQsMTAuMTY0Nzk3NCA3LjMxNDk3MTc2LDEwLjE5NjUyNDggNy40ODU1NjQ3NiwxMC4xNTgxOTQ2IEw3LjQ4NTU2NDgsMTAuMTU4MTk0NiBDNy44MzczNTQyMSwxMC4wODI0ODgzIDguMDYxMTU5ODYsOS43MzU5NTQ2OSA3Ljk4NTQ0ODY5LDkuMzg0MTg4NDcgQzcuOTg0OTc0MTUsOS4zODE5ODM2OCA3Ljk4NDQ4ODE2LDkuMzc5NzgxMzggNy45ODM5OTA3NSw5LjM3NzU4MTY0IEw3Ljk4Mzk5MDc4LDkuMzc3NTgxNzkgQzcuOTQ2OTIyMDEsOS4yMDczOTg4NSA3Ljg0MzU0NTQxLDkuMDU5MDA4MiA3LjY5Njc0NTM5LDguOTY1MjU3NjkgTDcuNjk2NzQ1NTQsOC45NjUyNTc3OSBDNy4wNjY4NTU0Nyw4LjU2NDg1NjczIDYuNjg1NDk4NjIsNy44NzAxNTY0IDYuNjg1ODgxNzYsNy4xMjM4MTEwNiBDNi42ODU4ODE3Niw2LjUzOTM1Mjg5IDYuOTE0MDc3MSw1Ljk4OTkyMDgzIDcuMzI3NDMwMjMsNS41Nzc1OTQgTDkuOTUyNjc2OSwyLjk1MjUzMDQ5IEw5Ljk1MjY3NjgyLDIuOTUyNTMwNTcgQzEwLjgxMDE1NzQsMi4wOTk2ODExNiAxMi4xOTY2OTk0LDIuMTAzMzg2NDEgMTMuMDQ5NjA5NywyLjk2MDgwNzA5IEMxMy40NTYyMjY0LDMuMzY5NTczNyAxMy42ODUyMTEzLDMuOTIyMjAwNjUgMTMuNjg2ODY1Niw0LjQ5ODc0NjE2IEMxMy42ODY4NjU2LDUuMDgzMjA0MzMgMTMuNDU5NjcxOSw1LjYzMjYzNjM5IDEzLjA0NjMxODgsNi4wNDU5NjIwNSBMMTEuODAxMjU1Myw3LjI5MDkzODY1IEwxMS44MDEyNTUzLDcuMjkwOTM4NjYgQzExLjU0NTA1MjQsNy41NDcxMjM2NSAxMS41NDUwNTI0LDcuOTYyNDgxMTcgMTEuODAxMjU1Myw4LjIxODY2NjE2IEMxMi4wNTc0NTgxLDguNDc0ODUxMTQgMTIuNDcyODQ0Nyw4LjQ3NDg1MTE0IDEyLjcyOTA0NzUsOC4yMTg2NjYxNSBMMTMuOTc0MTExLDYuOTczNjg5NTUgTDEzLjk3NDExMTEsNi45NzM2ODk0NCBDMTQuNjMzMDc3NCw2LjMxODkzMTM5IDE1LjAwMjUxNDUsNS40Mjc2NjM5NCAxNSw0LjQ5ODc1MTUzIEwxNSw0LjQ5ODc0MzM4IEMxNC45OTc3NzQ0LDIuNTY2NTY3MjYgMTMuNDMxMjg5NSwxLjAwMTA5ODc3IDExLjQ5ODk5MjMsMSBMMTEuNDk5OTg5OSwxIFogTTkuMDEwODY3MzcsNS45Mjg4NzMwMSBMOS4wMTA4NjczNyw1LjkyODg3MzAxIEM4LjcwODc4NDg4LDUuNzMxMzIyMTEgOC4zMDM3NDE3OCw1LjgxNjA0NDcgOC4xMDYxNzg0Nyw2LjExODEwNjI1IEM4LjAwOTAxMDExLDYuMjY2NjY5MjkgNy45NzY0NjIxLDYuNDQ4MzY0NzggOC4wMTYwMTgwMSw2LjYyMTQxNjk2IEw4LjAxNjAxODAxLDYuNjIxNDE2OTcgQzguMDUyNjM2MDUsNi43OTE1MjMyOSA4LjE1NTY4MzQyLDYuOTM5OTYwNDYgOC4zMDIyNjMxNCw3LjAzMzc0MTA3IEw4LjMwMjI2MzAzLDcuMDMzNzQxIEM4LjkzMjE1MzEsNy40MzQxNDIwNiA5LjMxMzUwOTk1LDguMTI4ODQyMzkgOS4zMTMxMjY4MSw4Ljg3NTE4NzczIEM5LjMxMzEyNjgxLDkuNDU5NjQ1OSA5LjA4NDkzMTQ3LDEwLjAwODA3NjQgOC42NzI1Nzk5OCwxMC40MjI0MDM2IEw2LjA0NzMzMzMsMTMuMDQ2NDY4MyBMNi4wNDczMzMyOCwxMy4wNDY0NjgzIEM1LjE4ODUyOTQ4LDEzLjg5ODc2OTEgMy44MDEzNTM5OCwxMy44OTM1NDY0IDIuOTQ4OTkxMDMsMTMuMDM0ODAyIEMyLjU0MzgwNDI1LDEyLjYyNjU4MTMgMi4zMTU0MTg3MSwxMi4wNzU0MDA2IDIuMzEzMTM5MDMsMTEuNTAwMjU2MiBDMi4zMTMxMzkwMywxMC45MTU3OTggMi41NDAzMzI3MywxMC4zNjYzNjYgMi45NTM2ODU4Niw5Ljk1MzA0MDMgTDQuMTk4NzQ5MzMsOC43MDgwNjM2OSBMNC4xOTg3NDkzNSw4LjcwODA2MzY4IEM0LjQ1NDk1MjIxLDguNDUzMDQzMDggNC40NTU4OTYzNyw4LjAzODYyOTY2IDQuMjAwODU3ODQsNy43ODI0NDQ2NyBDNC4yMDAxNTY2LDcuNzgxNzQwMjggNC4xOTk0NTM3Nyw3Ljc4MTAzNzUgNC4xOTg3NDkzMiw3Ljc4MDMzNjMgTDQuMTk4NzQ5MzIsNy43ODAzMzYzIEMzLjk0NDQ5NSw3LjUyNDE1MTMxIDMuNTMwNjg3NTcsNy41MjI1NzIzNCAzLjI3NDQ4NDcxLDcuNzc2ODA4MjggQzMuMjczMzA0MTQsNy43Nzc5Nzk3OSAzLjI3MjEyODAzLDcuNzc5MTU1ODIgMy4yNzA5NTY0Myw3Ljc4MDMzNjMxIEwyLjAyNDg5MTMyLDkuMDI1MzEyOTIgTDIuMDI0ODkxNDcsOS4wMjUzMTI3NyBDMS4zNjYyOTE5MSw5LjY4MDIzNTAxIDAuOTk3MjI0MjczLDEwLjU3MTQ4ODggMSwxMS41MDAyNTA3IEwxLDExLjUwMDI2MTkgQzEuMDAyMjI4MDQsMTMuNDMyMjA1NSAyLjU2Nzk0NzAyLDE0Ljk5Nzc5NzEgNC41MDAwMTE2NiwxNSBDNS40MzQ4MDk4NywxNSA2LjMxMzU2Mjk0LDE0LjYzNTcxNDIgNi45NzUxMjIyNiwxMy45NzQxOTU2IEw5LjYwMDM2ODkzLDExLjM0OTEzMiBMOS42MDAzNjkwMywxMS4zNDkxMzE5IEMxMC4yNTg4MTEyLDEwLjY5NDUxNDggMTAuNjI3ODcyLDkuODAzNjI2MzggMTAuNjI1MjQ3OSw4Ljg3NTE5Mjg2IEwxMC42MjUyNDc5LDguODc1MTM2ODEgQzEwLjYyNjkzMzMsNy42ODE0NTkwNSAxMC4wMTc4MzU1LDYuNTY5ODc2OTUgOS4wMTA4MDU4OCw1LjkyODg0NjY2IEw5LjAxMDg2NzM3LDUuOTI4ODczMDEgWiIgaWQ9IlNoYXBlIiBmaWxsPSIjNjY2NjY2IiBmaWxsLXJ1bGU9Im5vbnplcm8iPjwvcGF0aD4KICAgIDwvZz4KPC9zdmc+);
        background-repeat: no-repeat;
    }
    .toone-row-merge{
        background-image:url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB2aWV3Qm94PSIwIDAgMTYgMTYiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDUyLjYgKDY3NDkxKSAtIGh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaCAtLT4KICAgIDx0aXRsZT5tZXJnZSAmYW1wOyBjZW50ZXIyPC90aXRsZT4KICAgIDxkZXNjPkNyZWF0ZWQgd2l0aCBTa2V0Y2guPC9kZXNjPgogICAgPGcgaWQ9Im1lcmdlLSZhbXA7LWNlbnRlcjIiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPgogICAgICAgIDxnIGlkPSJtZXJnZS0mYW1wOy1jZW50ZXIiPgogICAgICAgICAgICA8cmVjdCBpZD0i55+p5b2iIiBmaWxsPSIjRkZGRkZGIiB4PSIwIiB5PSIwIiB3aWR0aD0iMTUiIGhlaWdodD0iMTUiPjwvcmVjdD4KICAgICAgICAgICAgPHBhdGggZD0iTTgsMTIgTDgsMTUgTDcsMTUgTDcsMTIgTDEsMTIgTDEsMTEgTDE0LDExIEwxNCwxMiBMOCwxMiBaIE03LDQgTDcsMSBMOCwxIEw4LDQgTDE0LDQgTDE0LDUgTDEsNSBMMSw0IEw3LDQgWiBNMSwxIEwxLDE1IEwxNCwxNSBMMTQsMSBMMSwxIFogTTAsMCBMMTUsMCBMMTUsMTYgTDAsMTYgTDAsMCBaIiBpZD0iQ29tYmluZWQtU2hhcGUiIGZpbGw9IiMzNjdGQzkiIGZpbGwtcnVsZT0ibm9uemVybyI+PC9wYXRoPgogICAgICAgICAgICA8cGF0aCBkPSJNOCw3LjUgTDEwLjUsNy41IEwxMC41LDYgTDEzLDcuOTk3MjgxMTMgTDEwLjUsMTAgTDEwLjUsOC41IEw4LDguNSBMNC41LDguNSBMNC41LDEwIEwyLDguMDAyNzE4ODcgTDQuNSw2IEw0LjUsNy41IEw4LDcuNSBaIiBpZD0iQ29tYmluZWQtU2hhcGUiIGZpbGw9IiNGQTc1NDEiIGZpbGwtcnVsZT0ibm9uemVybyI+PC9wYXRoPgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+);
        background-repeat: no-repeat;
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
    const sparklineSlice = useSelector(({sparklineSlice})=>sparklineSlice);
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
            const sparklinesSel = hasCellTagPlugin(
                sheet,
                "cellImage"
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
                        {sparklineSlice.visible ? <SparkLine></SparkLine>:null}
                        {isShowNav && <Nav></Nav>}
                        <SplitPane
                            style={{
                                width: '100%',
                                display: 'flex',
                                height:'100%',
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
