import { useDispatch, useSelector } from 'react-redux';

import { setConfig } from '@store/chartSlice';
import { FormItem, TextInput } from '@toone/report-ui';

/**
 * 标题属性
 * @returns
 */
export default function () {
  const { config } = useSelector(({ chartSlice }) => chartSlice);
  const dispatch = useDispatch();
  return (
    <FormItem label='内容:'>
      <TextInput
        style={{ height: 24 }}
        value={config?.styleConfig?.label?.text ?? ''}
        onChange={(val) => {
          dispatch(
            setConfig({
              ...config,
              styleConfig: {
                ...config?.styleConfig,
                label: {
                  ...config?.styleConfig?.label,
                  text: val,
                },
              },
            })
          );
        }}
      ></TextInput>
    </FormItem>
  );
}
