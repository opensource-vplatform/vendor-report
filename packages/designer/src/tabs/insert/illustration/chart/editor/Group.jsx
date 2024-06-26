import {
  Fragment,
  useEffect,
  useState,
} from 'react';

import {
  useDispatch,
  useSelector,
} from 'react-redux';

import { setConfig } from '@store/chartSlice/index';
import {
  FormItem,
  Select,
} from '@toone/report-ui';

import { toSelectOptions } from './utils';

/**
 * 分组属性
 */
export default function () {
  const { config } = useSelector(({ chartSlice }) => chartSlice);
  const { dsList } = useSelector(({ datasourceSlice }) => datasourceSlice);
  const [datas, setDatas] = useState(()=>{
    return config.datasource ? toSelectOptions(dsList, config.datasource):[];
  });
  const dispatch = useDispatch();
  useEffect(() => {
    if (config.datasource) {
      setDatas(toSelectOptions(dsList, config.datasource));
    }
  }, [config.datasource]);
  return (
    <Fragment>
      <FormItem label='分组:'>
        <Select
          wrapStyle={{ width: '100%' }}
          value={
            config.groups && config.groups.length > 0 ? config.groups[0] : null
          }
          datas={datas}
          onChange={(val) => {
            const groups = config.groups ? config.groups : [];
            groups[0]= val;
            dispatch(setConfig({ ...config, groups }));
          }}
        ></Select>
        {/*<AddIcon></AddIcon>*/}
      </FormItem>
    </Fragment>
  );
}
