import {
  useEffect,
  useState,
} from 'react';

import styled from 'styled-components';

import { List } from '@toone/report-ui';

import { ClassifyChart } from './Components';
import {
  CATALOGS,
  CLASSIFY_CHARTS,
} from './constant';

const Wrap = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
`;

const CatalogWrap = styled.div`
  width: 300px;
  flex-shrink: 0;
  flex-grow: 0;
  padding-bottom: 8px;
`;

const ChartListWrap = styled.div`
  width: calc(100% - 300px);
  display: flex;
  flex-direction: column;
  gap: 8px;
  //height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 20px;
`;

function getClassifyCharts(type) {
  let result = [];
  if (type == null) {
    result = [...CLASSIFY_CHARTS];
  } else {
    const res = CLASSIFY_CHARTS.find((item) => item.value == type);
    if (res) {
      result.push(res);
    }
  }
  return result;
}

export default function (props) {
  const { style = {},onClick } = props;
  const [type, setType] = useState(null);
  const [classifyCharts, setClassifyCharts] = useState([]);
  useEffect(() => {
    const classifyCharts = getClassifyCharts(type);
    setClassifyCharts(classifyCharts);
  }, [type]);
  return (
    <Wrap style={style}>
      <CatalogWrap>
        <List
          datas={CATALOGS}
          value={type}
          style={{ height: '100%' }}
          onChange={(val) => setType(val)}
        ></List>
      </CatalogWrap>
      <ChartListWrap>
        {classifyCharts.map(({ value, title, charts }) => {
          return (
            <ClassifyChart
              key={value}
              title={title}
              charts={charts}
              onClick={onClick}
            ></ClassifyChart>
          );
        })}
      </ChartListWrap>
    </Wrap>
  );
}
