import {
  Fragment,
  useEffect,
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
  Button,
  OperationDialog,
  Steps,
} from '@toone/report-ui';
import {
  getActiveIndexBySpread,
  getCellTagPlugin,
} from '@utils/worksheetUtil';

import ChartConfigPanel from './ChartConfigPanel';
import ChartTypeSelectPanel from './ChartTypeSelectPanel';
import { stepsDatas } from './constant';

const Wrap = styled.div`
  background-color: #fff;
  height: calc(100% - 40px);
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
`;

export const FooterWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  border: none;
  margin: 0px;
  background: #f0f0f0;
  padding: 8px;
`;

export const ButtonText = styled.span`
  padding: 0.4em 1em;
  display: block;
  line-height: normal;
`;

/**
 * 图表向导
 * @param {*} props
 * @returns
 */
export default function Index(props) {
  const { onCancel } = props;
  const { type, config } = useSelector(({ chartSlice }) => chartSlice);
  const { spread } = useSelector(({ appSlice }) => appSlice);
  const dispatch = useDispatch();
  useEffect(() => {
    if (spread) {
      const { sheet, row, col } = getActiveIndexBySpread(spread);
      const plugin = getCellTagPlugin(sheet, row, col, 'cellChart');
      if (plugin) {
        const { type, config } = plugin.config;
        dispatch(setType(type));
        dispatch(setConfig(config));
      } else {
        dispatch(setType(null));
        dispatch(setConfig({}));
      }
    }
  }, []);
  return (
    <OperationDialog
      width='90%'
      height='90%'
      title='图表配置向导'
      onCancel={() => {
        onCancel && onCancel();
      }}
      tools = {
        <Fragment>{type ? <Button title="返回">返回</Button>:null}</Fragment>
      }
      showConfirmButton={type ? true : false}

    >
      <Wrap>
        <Steps
          datas={stepsDatas}
          activeIndex={type ? 1:0}
          style={{
            borderBottom: '1px solid #ddd',
            borderTop: '1px solid #ddd',
            height: '102px',
            marginBottom: 'auto',
          }}
        ></Steps>
        {type ? null : (
          <ChartTypeSelectPanel
            style={{ height: 'calc(100% - 102px)' }}
            onClick={({ type, dimension, style, orientation }) => {
              dispatch(setType(type));
              dispatch(setConfig({ ...config, style, orientation, dimension }));
            }}
          ></ChartTypeSelectPanel>
        )}
        {type ? <ChartConfigPanel></ChartConfigPanel> : null}
      </Wrap>
    </OperationDialog>
  );
}
