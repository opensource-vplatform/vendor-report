import { useDispatch, useSelector } from 'react-redux';

import { setConfig } from '@store/chartSlice';
import { FormItem, TextInput, RadioGroup, Radio } from '@toone/report-ui';
import styled from 'styled-components';
import { updateConfig } from '@utils/chartUtil';

const RadioWrap = styled.div``;

/**
 * 标题属性
 * @returns
 */
export default function ({
  title = '',
  type = 'label',
  attrValue = 'position',
  defaultValue = 'left',
  options = [],
}) {
  const { config } = useSelector(({ chartSlice }) => chartSlice);
  const dispatch = useDispatch();

  return (
    <FormItem label={title}>
      <RadioWrap>
        <RadioGroup
          value={config?.styleConfig?.[type]?.[attrValue] ?? defaultValue}
          onChange={(val) => {
            updateConfig(dispatch, {
              config,
              type: 'styleConfig.' + type,
              attr: attrValue,
              value: val,
            });
          }}
        >
          {options.map((item) => (
            <Radio.Button
              key={item.value}
              value={item.value}
              style={{ padding: '2px 5px', fontSize: '12px' }}
            >
              {item.label}
            </Radio.Button>
          ))}
        </RadioGroup>
      </RadioWrap>
    </FormItem>
  );
}
