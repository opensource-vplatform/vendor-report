import {
  useDispatch,
  useSelector,
} from 'react-redux';

import { setConfig } from '@store/chartSlice/index';
import {
  CheckBox,
  FormItem,
} from '@toone/report-ui';
import { isUndefined } from '@toone/report-util';

/**
 * 标题可见属性
 * @returns
 */
export default function () {
  const { config } = useSelector(({ chartSlice }) => chartSlice);
  const dispath = useDispatch();
  return (
    <FormItem label='标题可见:'>
      <CheckBox
        value={isUndefined(config.titleVisible) ? true : config.titleVisible}
        onChange={(val) => dispath(setConfig({ ...config, titleVisible: val }))}
      ></CheckBox>
    </FormItem>
  );
}
