import { useSelector } from 'react-redux';
import { Chart } from '@toone/report-excel';
import { useEffect, useRef } from 'react';
import styled from 'styled-components';

const Wrap = styled.div`
  width: 100%;
  height: 100%;
`;

export default function (props) {
  const { type, config } = useSelector(({ chartSlice }) => chartSlice);
  const ref = useRef(null);
  const datasourceSlice = useSelector(({ datasourceSlice }) => datasourceSlice);
  const baseRef = useRef({
    chartInstance: null,
  });
  console.log(type, config);
  useEffect(() => {
    if (ref.current) {
      const chart = new Chart();
      baseRef.current.chartInstance = chart;
      chart.mount(ref.current);
    }
  }, [ref]);

  useEffect(() => {
    if (!baseRef.current.chartInstance) return;
    baseRef.current.chartInstance.updateConfig({
      type,
      config: {
        ...config,
        datasource: datasourceSlice.previewViewDatas[config.datasource] || [],
      },
    });
  }, [config]);

  return <Wrap ref={ref}></Wrap>;
}
