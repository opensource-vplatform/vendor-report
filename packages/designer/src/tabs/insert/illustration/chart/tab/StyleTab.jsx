import Title from '../editor/Title';
import TitleVisible from '../editor/TitleVisible';
import {
  Form,
  FormItem,
  CollapsiblePanel,
  RadioGroup,
  Radio,
  CheckBox,
  TextArea,
} from '@toone/report-ui';
import { useEffect, useState } from 'react';
import TypeRadioButton from '../editor/TypeRadioButton';
import styled from 'styled-components';
import TypeVisible from './../editor/TypeVisible';
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
  const [type, setType] = useState('label');

  return (
    <Wrap>
      <RadioWrap>
        <RadioGroup value={type} onChange={(val) => setType(val)}>
          <Radio.Button value='label'>标题</Radio.Button>
          <Radio.Button value='legend'>图例</Radio.Button>
          <Radio.Button value='tag'>标签</Radio.Button>
          {/* <Radio.Button value='series'>系列</Radio.Button>
          <Radio.Button value='axis'>坐标轴</Radio.Button>
          <Radio.Button value='background'>背景</Radio.Button>
          <Radio.Button value='tips'>提示</Radio.Button> */}
        </RadioGroup>
      </RadioWrap>
      {type == 'label' && <TitlePanel />}
      {type == 'legend' && <LegendPanel />}
      {type == 'tag' && <TagPanel />}
    </Wrap>
  );
}

const TitlePanel = () => {
  const { config } = useSelector(({ chartSlice }) => chartSlice);
  return (
    <PanelContainer>
      <TitleVisible></TitleVisible>
      <Form labelWidth={64}>
        <Title></Title>
        <TypeRadioButton
          title='位置:'
          attrValue='position'
          type='label'
          defaultValue={config?.styleConfig?.label?.position ?? 'left'}
          options={[
            { label: '左对齐', value: 'left' },
            { label: '居中', value: 'center' },
            { label: '右对齐', value: 'right' },
          ]}
        ></TypeRadioButton>
      </Form>
    </PanelContainer>
  );
};

const LegendPanel = () => {
  const { config } = useSelector(({ chartSlice }) => chartSlice);

  return (
    <PanelContainer>
      <TypeVisible type={'legend'} title='图例可见:' />
      <Form labelWidth={64}>
        <TypeRadioButton
          title='位置:'
          attrValue='position'
          type='legend'
          defaultValue={config?.styleConfig?.legend?.position ?? 'top'}
          options={[
            { label: '靠上', value: 'top' },
            { label: '靠下', value: 'bottom' },
            { label: '靠左', value: 'left' },
            { label: '靠右', value: 'right' },
            { label: '右上', value: 'rightTop' },
          ]}
        ></TypeRadioButton>
      </Form>
    </PanelContainer>
  );
};

const TagPanel = () => {
  const { type, config } = useSelector(({ chartSlice }) => chartSlice);
  const dispatch = useDispatch();

  return (
    <PanelContainer>
      <TypeVisible type={'tag'} title='标签可见:' defaultValue={false} />
      <Form labelWidth={64}>
        <CollapsiblePanel
          title='布局'
          type='notBorder'
          style={{ marginBottom: '8px' }}
          open
        >
          {type == 'bar' && (
            <TypeRadioButton
              title='位置:'
              attrValue='position'
              type='tag'
              defaultValue={config?.styleConfig?.tag?.position ?? 'outside'}
              options={[
                { label: '外侧', value: 'outside' },
                { label: '内侧', value: 'inside' },
                { label: '居中', value: 'center' },
              ]}
            ></TypeRadioButton>
          )}
          {type == 'pie' && (
            <TypeRadioButton
              title='位置:'
              attrValue='position'
              type='tag'
              defaultValue={config?.styleConfig?.tag?.position ?? 'outside'}
              options={[
                { label: '饼外', value: 'outside' },
                { label: '饼内', value: 'inside' },
              ]}
            ></TypeRadioButton>
          )}
          {type == 'line' && (
            <TypeRadioButton
              title='位置:'
              attrValue='position'
              type='tag'
              defaultValue={config?.styleConfig?.tag?.position ?? 'outside'}
              options={[
                { label: '上方', value: 'outside' },
                { label: '下方', value: 'inside' },
              ]}
            ></TypeRadioButton>
          )}
          <TypeRadioButton
            title='文字方向:'
            attrValue='orientation'
            type='tag'
            defaultValue={config?.styleConfig?.tag?.orientation ?? 'horizontal'}
            options={[
              { label: '横向', value: 'horizontal' },
              { label: '纵向', value: 'vertical' },
            ]}
          ></TypeRadioButton>
        </CollapsiblePanel>
        <CollapsiblePanel
          title='内容'
          type='notBorder'
          style={{ marginBottom: '8px' }}
          open
        >
          <Form labelWidth={64}>
            <PanelRadioWrap>
              <RadioGroup
                value={config?.styleConfig?.tag?.content?.type ?? 'common'}
                onChange={(val) => {
                  updateConfig(dispatch, {
                    config,
                    type: 'styleConfig.tag.content',
                    attr: 'type',
                    value: val,
                  });
                }}
              >
                <Radio.Button
                  value='common'
                  style={{ flex: 1, fontSize: '12px' }}
                >
                  通用
                </Radio.Button>
                <Radio.Button
                  value='custom'
                  style={{ flex: 1, fontSize: '12px' }}
                >
                  自定义
                </Radio.Button>
              </RadioGroup>
            </PanelRadioWrap>
            {(config?.styleConfig?.tag?.content?.type ?? 'common') ===
              'common' && (
              <>
                <CheckBox
                  value={
                    config?.styleConfig?.tag?.content?.commonContent?.category
                      ?.visible ?? false
                  }
                  title='分类名'
                  onChange={(val) => {
                    updateConfig(dispatch, {
                      config,
                      type: 'styleConfig.tag.content.commonContent.category',
                      attr: 'visible',
                      value: val,
                    });
                  }}
                ></CheckBox>
                <CheckBox
                  value={
                    config?.styleConfig?.tag?.content?.commonContent?.series
                      ?.visible ?? false
                  }
                  title='系列名'
                  onChange={(val) => {
                    updateConfig(dispatch, {
                      config,
                      type: 'styleConfig.tag.content.commonContent.series',
                      attr: 'visible',
                      value: val,
                    });
                  }}
                ></CheckBox>
                <CheckBox
                  value={
                    config?.styleConfig?.tag?.content?.commonContent?.value
                      ?.visible ?? true
                  }
                  title='值'
                  onChange={(val) => {
                    updateConfig(dispatch, {
                      config,
                      type: 'styleConfig.tag.content.commonContent.value',
                      attr: 'visible',
                      value: val,
                    });
                  }}
                ></CheckBox>
                <CheckBox
                  value={
                    config?.styleConfig?.tag?.content?.commonContent?.percent
                      ?.visible ?? false
                  }
                  title='百分比'
                  onChange={(val) => {
                    updateConfig(dispatch, {
                      config,
                      type: 'styleConfig.tag.content.commonContent.percent',
                      attr: 'visible',
                      value: val,
                    });
                  }}
                ></CheckBox>
              </>
            )}
            {(config?.styleConfig?.tag?.content?.type ?? 'common') ===
              'custom' && (
              <>
                <TextArea
                  value={`function(){ return this.value;}`}
                  style={{ minWidth: 'auto', marginTop: '10px' }}
                />
              </>
            )}
          </Form>
        </CollapsiblePanel>
      </Form>
    </PanelContainer>
  );
};
