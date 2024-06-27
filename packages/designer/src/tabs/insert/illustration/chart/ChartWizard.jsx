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
import { setStep } from '@store/chartSlice/index';
import {
  Button,
  OperationDialog,
  Steps,
} from '@toone/report-ui';
import {
  clearAllCellTagPlugin,
  getActiveIndexBySpread,
  getCellTagPlugin,
  setCellTagPlugin,
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
  const { onClose } = props;
  const { step, icon,type,config } = useSelector(({ chartSlice }) => chartSlice);
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
        dispatch(setStep('config'));
      } else {
        dispatch(setType(null));
        dispatch(setConfig({}));
        dispatch(setStep('choose'));
      }
    }
  }, []);
  return (
    <OperationDialog
      width='90%'
      height='90%'
      title='图表配置向导'
      onCancel={() => {
        onClose && onClose();
      }}
      onConfirm={
        ()=>{
          const {sheet,row,col} = getActiveIndexBySpread(spread);
          clearAllCellTagPlugin(sheet,row,col);//先清空当前单元格中所有插件设置
          setCellTagPlugin(sheet,row,col,{
            type:'cellChart',
            retention:'runtime',
            config:{type,icon,config}
          });
          //重新绘制，显示图表图片
          sheet.repaint();
          onClose && onClose();
        }
      }
      beforeTools={
        <Fragment>
          {step == 'config' ? (
            <Button
              title='返回'
              style={{ marginRight: 8 }}
              onClick={() => {
                dispatch(setStep('choose'));
              }}
            >
              返回
            </Button>
          ) : null}
        </Fragment>
      }
      showConfirmButton={step == 'config' ? true : false}
    >
      <Wrap>
        <Steps
          datas={stepsDatas}
          activeIndex={step == 'config' ? 1 : 0}
          style={{
            padding: '10px 0px',
            borderBottom: '1px solid #ddd',
            borderTop: '1px solid #ddd',
            height: '102px',
            marginBottom: 'auto',
          }}
        ></Steps>
        {step == 'config' ? null : (
          <ChartTypeSelectPanel
            style={{ height: 'calc(100% - 82px)' }}
          ></ChartTypeSelectPanel>
        )}
        {step == 'config' ? <ChartConfigPanel></ChartConfigPanel> : null}
      </Wrap>
    </OperationDialog>
  );
}
