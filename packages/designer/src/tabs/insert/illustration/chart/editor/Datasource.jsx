import {
  useDispatch,
  useSelector,
} from 'react-redux';

import { setConfig } from '@store/chartSlice';
import {
  FormItem,
  Select,
} from '@toone/report-ui';

/**
   * 数据集属性
   * @returns
   */
  export default function () {
    const { config } = useSelector(({ chartSlice }) => chartSlice);
    const { dsList } = useSelector(({ datasourceSlice }) => datasourceSlice);
    const dispath = useDispatch();
  
    return (
      <FormItem label='数据集:'>
        <Select
          wrapStyle={{ width: '100%' }}
          value={config.datasource}
          datas={dsList.filter(ds=> ds.type == 'table').map((ds) => {
            return { value: ds.code, text: ds.name };
          })}
          onChange={(val) => dispath(setConfig({ ...config, datasource: val }))}
        ></Select>
      </FormItem>
    );
  };