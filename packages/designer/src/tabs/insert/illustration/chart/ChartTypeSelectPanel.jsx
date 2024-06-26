import {
  useEffect,
  useState,
} from 'react';

import {
  useDispatch,
  useSelector,
} from 'react-redux';
import styled from 'styled-components';

import {
  setConfig,
  setType,
} from '@store/chartSlice';
import {
  setIcon,
  setStep,
} from '@store/chartSlice/index';
import { List } from '@toone/report-ui';

import { GroupedChart } from './Components';
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

function getGroupedCharts(type) {
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
  const { style = {} } = props;
  const [group, setGroup] = useState(null);
  const [groupedCharts, setGroupedCharts] = useState([]);
  const { type, config } = useSelector(({ chartSlice }) => chartSlice);
  const dispatch = useDispatch();
  useEffect(() => {
    const classifyCharts = getGroupedCharts(group);
    setGroupedCharts(classifyCharts);
  }, [group]);
  return (
    <Wrap style={style}>
      <CatalogWrap>
        <List
          datas={CATALOGS}
          value={group}
          style={{ height: '100%' }}
          onChange={(val) => setGroup(val)}
        ></List>
      </CatalogWrap>
      <ChartListWrap>
        {groupedCharts.map(({ value, title, charts }) => {
          return (
            <GroupedChart
              key={value}
              title={title}
              charts={charts}
              selected={{ config, type }}
              onClick={({ icon, config: cfg }) => {
                const { type, ...others } = cfg;
                dispatch(setType(type));
                let config = null;
                if (cfg.type !== type) {
                  config = others;
                } else {
                  //选择的图表类型相同，则复用其原有配置
                  config = { ...config, ...others };
                }
                dispatch(setConfig(config));
                dispatch(setIcon(icon));
                dispatch(setStep('config'));
              }}
            ></GroupedChart>
          );
        })}
      </ChartListWrap>
    </Wrap>
  );
}
