import {
  useDispatch,
  useSelector,
} from 'react-redux';

import { setConfig } from '@store/chartSlice';
import {
  FormItem,
  TextInput,
} from '@toone/report-ui';

/**
 * 标题属性
 * @returns
 */
export default function () {
  const { config } = useSelector(({ chartSlice }) => chartSlice);
  const dispath = useDispatch();
  return (
    <FormItem label='标题:'>
      <TextInput
        style={{ height: 24 }}
        value={config.title ? config.title : ''}
        onChange={(val) => dispath(setConfig({ ...config, title: val }))}
      ></TextInput>
    </FormItem>
  );
}
