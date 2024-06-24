import {
  Fragment,
  useEffect,
  useState,
} from 'react';

import {
  useDispatch,
  useSelector,
} from 'react-redux';

import { setConfig } from '@store/chartSlice';
import {
  FormItem,
  Select,
  TextInput,
} from '@toone/report-ui';

/**
 * 标题属性
 * @returns
 */
export const Title = function () {
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
};

/**
 * 数据集属性
 * @returns
 */
export const Datasource = function () {
  const { config } = useSelector(({ chartSlice }) => chartSlice);
  const { dsList } = useSelector(({ datasourceSlice }) => datasourceSlice);
  const dispath = useDispatch();

  return (
    <FormItem label='数据集:'>
      <Select
        wrapStyle={{ width: '100%' }}
        value={config.datasource}
        datas={dsList.map((ds) => {
          return { value: ds.code, text: ds.name };
        })}
        onChange={(val) => dispath(setConfig({ ...config, datasource: val }))}
      ></Select>
    </FormItem>
  );
};

/**
 * 分组属性
 */
export const Group = function () {
  const { config } = useSelector(({ chartSlice }) => chartSlice);
  const { dsList } = useSelector(({ datasourceSlice }) => datasourceSlice);
  const [datas, setDatas] = useState([]);
  useEffect(() => {
    if (config.datasource) {
      const define = dsList.find((item) => item.code == config.datasource);
      const fields = define.children || [];
      setDatas(
        fields.map((item) => {
          return { value: item.code, text: item.name };
        })
      );
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
        ></Select>
      </FormItem>
    </Fragment>
  );
};
