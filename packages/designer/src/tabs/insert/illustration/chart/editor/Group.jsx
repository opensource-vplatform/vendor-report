import { Fragment, useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { setConfig } from '@store/chartSlice/index';
import { FormItem, Select } from '@toone/report-ui';

import { toSelectOptions } from './utils';

/**
 * 分组属性
 */
export default function () {
  const { config } = useSelector(({ chartSlice }) => chartSlice);
  const { dsList } = useSelector(({ datasourceSlice }) => datasourceSlice);
  const [datas, setDatas] = useState(() => {
    return config.datasource ? toSelectOptions(dsList, config.datasource) : [];
  });
  const dispatch = useDispatch();
  useEffect(() => {
    if (config.datasource) {
      setDatas(
        toSelectOptions(dsList, config.datasource).concat([
          { value: null, text: '无' },
        ])
      );
    }
  }, [config.datasource]);
  return (
    <Fragment>
      <FormItem label='分类:'>
        <Select
          wrapStyle={{ width: '100%' }}
          value={
            config.groups && config.groups.length > 0 ? config.groups[0] : null
          }
          datas={datas}
          onChange={(val) => {
            dispatch(setConfig({ ...config, groups: [val] }));
          }}
        ></Select>
        {/*<AddIcon></AddIcon>*/}
      </FormItem>
    </Fragment>
  );
}
