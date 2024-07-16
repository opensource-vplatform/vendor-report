import { CollapsiblePanel, CheckBox } from '@toone/report-ui';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { updateConfig } from '@utils/chartUtil';

const Wrap = styled.div`
  width: 100%;
  height: 100%;
`;

const RadioWrap = styled.div`
  margin-bottom: 10px;
`;

const PanelRadioWrap = styled.div`
  display: flex;
`;

const PanelContainer = styled.div`
  width: 100%;
  height: 100%;
`;

export default function () {
  const { config } = useSelector(({ chartSlice }) => chartSlice);
  const dispatch = useDispatch();

  return (
    <Wrap>
      <CollapsiblePanel
        title='工具栏'
        type='notBorder'
        style={{ marginBottom: '8px' }}
        open
      >
        <CheckBox
          value={config?.toolbarConfig?.order ?? false}
          title='排序'
          onChange={(val) => {
            updateConfig(dispatch, {
              config,
              type: 'toolbarConfig',
              attr: 'order',
              value: val,
            });
          }}
        ></CheckBox>
        <CheckBox
          value={config?.toolbarConfig?.exportPic ?? false}
          title='导出图片'
          onChange={(val) => {
            updateConfig(dispatch, {
              config,
              type: 'toolbarConfig',
              attr: 'exportPic',
              value: val,
            });
          }}
        ></CheckBox>
        <CheckBox
          value={config?.toolbarConfig?.fullscreen ?? false}
          title='全屏展示'
          onChange={(val) => {
            updateConfig(dispatch, {
              config,
              type: 'toolbarConfig',
              attr: 'fullscreen',
              value: val,
            });
          }}
        ></CheckBox>
      </CollapsiblePanel>
      <CollapsiblePanel
        title='图表缩放'
        type='notBorder'
        style={{ marginBottom: '8px' }}
        open
      >
        <CheckBox
          value={config?.toolbarConfig?.fullscreen ?? false}
          title='开启缩放控件'
          onChange={(val) => {
            updateConfig(dispatch, {
              config,
              type: 'toolbarConfig',
              attr: 'fullscreen',
              value: val,
            });
          }}
        ></CheckBox>
      </CollapsiblePanel>
    </Wrap>
  );
}
