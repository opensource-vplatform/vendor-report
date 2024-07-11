import { useContext } from 'react';

import styled from 'styled-components';

import {
  Page,
  Select,
} from '@toone/report-ui';

import PreviewContext from './PreviewContext';

//暂时只支持3个
const zoomOptions = [
  {
    value: 'actualSize',
    text: '实际大小',
  },
  { value: 'suitableToPage', text: '适合页面' },
  { value: 'suitableToPageWidth', text: '适合页宽' },
  /*   { value: '0.5', text: '50%' },
  { value: '0.75', text: '75%' },
  { value: '1', text: '100%' },
  { value: '1.25', text: '125%' },
  { value: '1.50', text: '150%' },
  { value: '2.00', text: '200%' },
  { value: '3.00', text: '300%' },
  { value: '4.00', text: '400%' }, */
];

const Toolbar = styled.div`
  border-bottom: solid 1px lightgray;
  background-color: white;
  margin: 0px;
  padding: 0px;
  display: flex;
  height: 35px;
  flex-shrink: 0;
  justify-content: flex-end;
  align-items: center;
`;

const ToolbarRight = styled.div`
  position: absolute;
  width: max-content;
  right: 0;
  display: flex;
  justify-content: end;
  height: 22px;
  gap: 8px;
  padding-right: 8px;
  align-items: center;
`;

const ZoomWrap = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  gap: 4px;
`;

const ZoomOut = styled.div`
  width: 24px;
  height: 24px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
    background-color: #dadada;
  }
`;
const ZoomOutIcon = styled.div`
  width: 10px;
  border: 1px solid #333;
  border-radius: 10px;
`;

function Zoom(props) {
  const context = useContext(PreviewContext);
  const { zoomOptions = [] } = props;
  const value = context.zoomValue;
  let zoomOptionsItem = zoomOptions.find((item) => item.value === value);
  let text = zoomOptionsItem?.text;
  if (!text) {
    text = `${value}%`;
  }
  const setZoomInfo = context.setZoomInfo;
  return (
    <ZoomWrap>
      {/* 暂时不支持放大与缩小 */}
      {/*  <ZoomOut
        onClick={() => {
          zoom(value, 'zoomOut');
        }}
      >
        <ZoomOutIcon></ZoomOutIcon>
      </ZoomOut>
      <div
        onClick={() => {
          zoom(value, 'zoomIn');
        }}
      >
        <AddIcon></AddIcon>
      </div> */}
      <Select
        datas={zoomOptions}
        onChange={setZoomInfo}
        style={{
          minWidth: 100,
          width: 102,
          height: 22,
        }}
        value={value}
        text={text}
      ></Select>
    </ZoomWrap>
  );
}

export default (props) => {
  const { isShowToolbar = true, isShowBtnToolbar = true, toolbar } = props;
  const context = useContext(PreviewContext) || {
    pageIndex: 1,
    total: 1,
    isPage: false,
  };
  const { pageIndex, total, isPage } = context;
  if (!isShowToolbar) {
    return null;
  }
  return (
    <Toolbar>
      <Zoom zoomOptions={zoomOptions}></Zoom>
      {isShowBtnToolbar && (
        <ToolbarRight>
          <Page
            total={total}
            isPage={isPage}
            pageIndex={pageIndex}
            onChange={context?.changePageIndex}
          ></Page>
          {toolbar}
        </ToolbarRight>
      )}
    </Toolbar>
  );
};
