import { useDispatch, useSelector } from 'react-redux';

import { setConfig } from '@store/chartSlice/index';
import { CheckBox, FormItem } from '@toone/report-ui';
import { isUndefined } from '@toone/report-util';
import { updateConfig } from '@utils/chartUtil';

/**
 * 可见属性
 * @returns
 */
export default function ({ type = 'label', title = '标题可见:' ,defaultValue = true }) {
  const { config } = useSelector(({ chartSlice }) => chartSlice);
  const dispatch = useDispatch();
  return (
    <FormItem label={title}>
      <CheckBox
        value={
          isUndefined(config?.styleConfig?.[type]?.visible)
            ? defaultValue
            : config?.styleConfig?.[type]?.visible
        }
        onChange={(val) => {
          updateConfig(dispatch, {
            config,
            type: 'styleConfig.' + type,
            attr: 'visible',
            value: val,
          });
        }}
      ></CheckBox>
    </FormItem>
  );
}
