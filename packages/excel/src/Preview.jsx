import {
  useEffect,
  useRef,
  useState,
} from 'react';

import styled, { keyframes } from 'styled-components';

import { isFunction } from '@toone/report-util';

import HeaderToolbar from './HeaderToolbar';
import useInitFormatter from './hooks/useInitFormatter';
import useLoading from './hooks/useLoading';
import usePage from './hooks/usePage';
import useQuery from './hooks/useQuery';
import useZoom from './hooks/useZoom';
import PreviewContext from './PreviewContext';
import Print from './print';
import QueryPanel from './QueryPanel';
import ParseReportJson from './template/ParseReportJson';
import Toolbar from './Toolbar';
import { withDivStyled } from './utils/componentUtil';
import { getSpreadWrapRect } from './utils/spreadUtil';
import WorkBook from './Workbook';
import WorkSheet from './WorkSheet';

const Wrap = withDivStyled({
  position: 'relative',
  width: '100%',
  height: '100%',
  overflow: 'visible',
  userSelect: 'none',
  display: 'flex',
  flexDirection: 'column',
});

const PaperWrap = styled.div`
  width: 100%;
  height: 100%;
  overflow: auto;
  user-select: none;
  flex: 1;
  box-sizing: border-box;
  display: flex;
  background-color: #ddd;
  position: relative;
  padding: 8px;
  &:has(.exceededWidth) {
    display: block;
  }
`;

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const LoadingWrap = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  background-color: rgb(255, 255, 255);
  z-index: 1003;
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
  top: 0;
  padding-top: 200px;
  left: 0;
`;

const Loading = styled.div`
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-top: 4px solid #2d8cf0;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: ${spin} 1s linear infinite;
`;

const PaperDiv = styled.div`
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  background: #fff;
  flex: none;
  position: relative;
  box-shadow:
    rgba(0, 0, 0, 0.05) 0px 2rem 8rem 0px,
    rgba(0, 0, 0, 0.15) 0px 0.6rem 1.6rem,
    rgba(0, 0, 0, 0.1) 0px 0.2rem 0.2rem;
`;

const wecostPaperStyle = {
  border: `1px solid rgb(0, 0, 0)`,
  boxShadow: `rgb(0 0 0 / 40%) 5px 5px 0px 1px`,
  flexDirection: 'column',
  display: 'flex',
};

export default (props) => {
  const {
    persistingDataSlice,
    json,
    template,
    setting,
    dataSource,
    onPageCompleted,
    onActiveSheetChanged,
    isShowToolbar = true, //是否显示工具栏。
    headerVisible = true, //是否头部。查询面板，缩放按钮，打印按钮等
    queryPanelVisible = true, //是否显示查询面板
    headerToolbar = { style: {}, toolbars: [] }, //头部工具栏
    paperWrapStyle = {}, //纸张外层容器样式
    paperStyle = {}, //纸张样式
  } = props;
  const [ctxVal, setCtxVal] = useState({
    json: null,
    cacheJson: null,
    dataSource,
    pageIndex: 1, //当前页码
    total: 1, //总页数
    isPage: false, //当前sheet是否分页
    pages: [], //每一页的json
    parseReportJsonInst: null, //解析json的实列
    zoomValue: 'suitableToPageWidth', //缩放
    zoomType: 'zoom', //zoomOut | zoomIn | zoom
    printPages: [],
    isLoading: true,
    paperWrapWidth: 0, //纸张所在容器的宽度
    paperWrapHeight: 0, //纸张所在容器的高度
    paper: {
      //纸张默认信息
      width: 816,
      height: 1056,
      paddingBottom: 72,
      paddingTop: 72,
      paddingLeft: 72,
      paddingRight: 72,
    },
    paperStyle: {
      //纸张默认样式
      width: 816,
      height: 1056,
      paddingBottom: 72,
      paddingTop: 72,
      paddingLeft: 72,
      paddingRight: 72,
    },
    paperWrapStyle: {},
    setLoading() {},
    closeLoading() {},
    isRefresh: false,
    exportSettings: {
      type: 'allPage', // curPage | allPage
    },
  });
  const paperWrapEl = useRef(null);

  usePage(ctxVal, setCtxVal);
  useQuery({ ctxVal, setCtxVal, ...props });
  useLoading(ctxVal, setCtxVal);
  ctxVal.setCtxVal = setCtxVal;
  const initFormatter = useInitFormatter({
    ...props,
    ctxVal,
    setCtxVal,
  });

  useEffect(() => {
    if (!json || !ctxVal.dataSource) {
      ctxVal.closeLoading();
      return;
    }
    const _json = JSON.parse(JSON.stringify(json));
    let pageIndex = 1;
    let total = 1;
    let isPage = false;
    let pages = [];
    let parseReportJsonInst = null;
    let printPages = [];
    if (_json) {
      initFormatter(_json);

      //解析模板json生成的新的json
      const parseResult = new ParseReportJson({
        reportJson: _json,
        datas: ctxVal.dataSource,
        tempConfig: template,
        setting,
      });
      debugger;
      parseReportJsonInst = parseResult;
      const { activeSheetName, sheetPages, sheetPrintPages } = parseResult;
      //分页相关信息
      const sheetPage = sheetPages?.[activeSheetName];
      if (sheetPage) {
        isPage = sheetPage.isPage;
        total = sheetPage?.datas?.length || 1;
        pages = sheetPage?.datas || [];

        if (onPageCompleted) {
          onPageCompleted(() => {
            return new Promise((resolve) => {
              resolve({
                changePageIndex: ctxVal.changePageIndex,
                nextPage: ctxVal.nextPage,
                previousPage: ctxVal.previousPage,
                isPage: isPage,
                pageIndex,
                total,
              });
            });
          });
        }
      }
      //打印相关
      printPages = sheetPrintPages?.[activeSheetName] || [];
      const rect = getSpreadWrapRect(paperWrapEl);
      setCtxVal((ctxVal) => {
        return {
          ...ctxVal,
          dataSource: ctxVal.dataSource,
          json: _json,
          cacheJson: JSON.parse(JSON.stringify(_json)),
          pageIndex,
          isPage,
          total,
          pages,
          parseReportJsonInst,
          printPages,
          paperWrapWidth: rect.width,
          paperWrapHeight: rect.height,
          paper: parseResult.paper,
          paperWrapStylePadding: {
            top: +rect.paddingTop.slice(0, -2) || 8,
            right: +rect.paddingRight.slice(0, -2) || 8,
            bottom: +rect.paddingBottom.slice(0, -2) || 8,
            left: +rect.paddingLeft.slice(0, -2) || 8,
          },
          paperStyle: {
            ...parseResult.paper,
          },
        };
      });
    }
  }, [
    json,
    ctxVal.dataSource,
    JSON.stringify(template),
    JSON.stringify(setting),
    ctxVal.isRefresh,
  ]);

  //缩放
  json && useZoom(ctxVal, setCtxVal);

  return (
    <PreviewContext.Provider value={ctxVal}>
      <Wrap>
        <Print {...props} json={ctxVal.json}></Print>
        {headerVisible && (
          <>
            {queryPanelVisible && (
              <QueryPanel
                persistingDataSlice={persistingDataSlice}
                onQuery={ctxVal.query}
              ></QueryPanel>
            )}
            {isShowToolbar && <Toolbar {...props}></Toolbar>}
            {headerToolbar.toolbars.length > 0 && (
              <HeaderToolbar
                toolbarConfig={headerToolbar.toolbars}
                style={headerToolbar.style}
              />
            )}
          </>
        )}
        <PaperWrap
          ref={paperWrapEl}
          style={{
            ...ctxVal.paperWrapStyle,
            ...paperWrapStyle,
          }}
        >
          {ctxVal.isLoading && (
            <LoadingWrap>
              <Loading></Loading>
              Loading...
            </LoadingWrap>
          )}
          <PaperDiv
            style={
              json ? { ...ctxVal.paperStyle, ...paperStyle } : { ...paperStyle }
            }
          >
            <WorkBook
              {...props}
              dataSource={ctxVal.dataSource}
              onActiveSheetChanged={(type, args) => {
                if (isFunction(onActiveSheetChanged)) {
                  onActiveSheetChanged(type, args);
                }
              }}
            >
              <WorkSheet></WorkSheet>
            </WorkBook>
          </PaperDiv>
        </PaperWrap>
      </Wrap>
    </PreviewContext.Provider>
  );
};
