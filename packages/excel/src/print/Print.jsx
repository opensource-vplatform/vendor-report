import { useContext } from 'react';

import styled from 'styled-components';

import {
  Button,
  Dialog,
} from '@toone/report-ui';

import PreviewContext from '../PreviewContext';

const Wrap = styled.div`
  background-color: #ffffff;
  width: 100%;
  height: 100%;
  border-top: 1px solid #ddd;
  box-sizing: border-box;
  user-select: none;
  font-size: 14px;
  padding: 10px;
  display: flex;
  gap: 10px;
  flex-direction: column;
`;

const PageInfosWrap = styled.div`
  display: flex;
  height: 32px;
  align-items: center;
  & .info {
    border-bottom: 1px solid #ddd;
    padding: 0 10px;
    min-width: 30px;
  }
`;

const Label = styled.span`
  width: 90px;
`;

const Printed = styled.span`
  margin-left: 10px;
  border: 1px solid #ddd;
  padding: 3px 6px;
  border-radius: 4px;
  background-color: green;
  color: #fff;
  font-size: 12px;
`;

const zoomPrint = (sheetJson, inst) => {
  let scaleType = null;
  const sheetTag = sheetJson?.data?.defaultDataNode?.tag;
  if (sheetTag) {
    const sheetTagJson = JSON.parse(sheetTag);
    scaleType = sheetTagJson?.scaleType;
  }

  if (scaleType != 2) {
    return;
  }

  const rowHeaderVisible = sheetJson.rowHeaderVisible !== false;
  const rowHeaderColInfos = sheetJson.rowHeaderColInfos || [];

  const columnCount = sheetJson.columnCount;
  let columns = sheetJson.columns || [];
  let totalSize = 0;

  if (rowHeaderVisible) {
    if (rowHeaderColInfos.length) {
      rowHeaderColInfos.forEach(function ({ size }) {
        totalSize += size || 40;
      });
    } else {
      totalSize += 40;
    }
  }

  for (let i = 0; i < columnCount; i++) {
    const size = columns?.[i]?.size || 60;
    totalSize += size;
  }
  const width =
    inst.paper.width - inst.paper.paddingLeft - inst.paper.paddingRight;
  if (totalSize > width) {
    const newColumns = [];
    for (let i = 0; i < columnCount; i++) {
      const datas = columns?.[i] || { size: 60 };
      const size = datas.size || 60;
      datas.size = Math.floor(width * (size / totalSize));
      newColumns.push(datas);
    }
    if (rowHeaderVisible) {
      let newRowHeaderColInfos = [];
      if (rowHeaderColInfos.length) {
        rowHeaderColInfos.forEach(function (item) {
          const size = item.size || 40;
          newRowHeaderColInfos.push({
            ...item,
            size: Math.floor((size / totalSize) * width),
          });
        });
      } else {
        newRowHeaderColInfos.push({
          size: Math.floor((40 / totalSize) * width),
        });
      }
      sheetJson.rowHeaderColInfos = newRowHeaderColInfos;
    }
    sheetJson.columns = newColumns;
  }
};

export default function (props) {
  const {} = props;
  const context = useContext(PreviewContext);
  debugger;
  return (
    <Dialog width='550px' height='250px' onClose={context.close}>
      <Wrap>
        <PageInfosWrap>
          <Label>总页数</Label>：<span className='info'>{context.total}</span>
        </PageInfosWrap>
        <PageInfosWrap>
          <Label>打印范围</Label>：
          <span className='info'>
            第 {context.start} 页 至 第 {context.end} 页
          </span>
          {context.printed[context.printIndex] && <Printed>已打印</Printed>}
          <Button
            style={{
              marginLeft: 'auto',
              marginRight: '5px',
              minWidth: '60px',
            }}
            onClick={context.pre}
          >
            上一批
          </Button>
          <Button style={{ minWidth: '60px' }} onClick={context.next}>
            下一批
          </Button>
        </PageInfosWrap>
        <PageInfosWrap>
          <Label>每次打印页数</Label>：
          <span className='info'>{context.printTotal}</span>
        </PageInfosWrap>
        <PageInfosWrap
          style={{
            justifyContent: 'end',
          }}
        >
          <Button
            style={{ minWidth: '60px' }}
            onClick={context.printHandler}
            type='primary'
          >
            打印
          </Button>
        </PageInfosWrap>
      </Wrap>
    </Dialog>
  );
}
