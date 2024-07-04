import { Fragment } from 'react';

import {
  useDispatch,
  useSelector,
} from 'react-redux';

import Add from '@icons/shape/Add';
import Close from '@icons/shape/Close';
import { setConfig } from '@store/chartSlice/index';
import {
  FormItem,
  Radio,
  RadioGroup,
  Select,
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
  TextInput,
} from '@toone/report-ui';

import { SUM_TYPES } from '../constant';
import { toSelectOptions } from './utils';

/**
 * 汇总方式
 */
function SumType(props) {
  const { value, onChange } = props;
  return (
    <Select
      wrapStyle={{ width: '100%' }}
      datas={SUM_TYPES}
      value={value}
      onChange={onChange}
    ></Select>
  );
}

function FieldValueConfig() {
  const { config } = useSelector(({ chartSlice }) => chartSlice);
  const { dsList } = useSelector(({ datasourceSlice }) => datasourceSlice);
  const datasource = config.datasource;
  const cfg = config.valueSeriesConfig || {};
  const dispatch = useDispatch();
  const set = (values) => {
    /*const valueSeriesConfig = { ...cfg, ...values };
    if(!valueSeriesConfig.sumType){
      valueSeriesConfig.sumType = 'sum';
    }*/
    dispatch(
      setConfig({
        ...config,
        valueSeriesConfig:{ ...cfg, ...values },
      })
    );
  };
  return (
    <Fragment>
      <FormItem label='系列名:'>
        <Select
          value={cfg.seriesName ? cfg.seriesName : null}
          wrapStyle={{ width: '100%' }}
          datas={[
            ...toSelectOptions(dsList, datasource),
            { value: null, text: '无' },
          ]}
          onChange={(val) => set({ seriesName: val })}
        ></Select>
      </FormItem>
      <FormItem label='值:'>
        <Select
          value={cfg.value}
          wrapStyle={{ width: '100%' }}
          datas={toSelectOptions(dsList, datasource)}
          onChange={(val) => set({ value: val })}
        ></Select>
      </FormItem>
      <FormItem label='汇总方式:'>
        <SumType
          value={cfg.sumType}
          onChange={(val) => set({ sumType: val })}
        ></SumType>
      </FormItem>
    </Fragment>
  );
}

function FieldNameConfig(props) {
  const { config } = useSelector(({ chartSlice }) => chartSlice);
  const { dsList } = useSelector(({ datasourceSlice }) => datasourceSlice);
  const datasource = config.datasource;
  const configs = config.nameSeriesConfigs || [];
  const dispatch = useDispatch();
  const fieldCellStyle = { width: 100, padding: '4px 4px' };
  const operationCellStyle = { width: 32, padding: '4px 4px' };
  return (
    <Fragment>
      <Table style={{ fontSize: '12px' }}>
        <TableHeader>
          <TableRow>
            <TableCell style={fieldCellStyle}>字段名</TableCell>
            <TableCell style={fieldCellStyle}>系列名</TableCell>
            <TableCell style={fieldCellStyle}>汇总方式</TableCell>
            <TableCell style={operationCellStyle}> </TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {configs.map(({ fieldCode, seriesName = '', sumType }, index) => {
            return (
              <Fragment key={`${fieldCode}_${seriesName}_${sumType}_${index}`}>
                <TableRow>
                  <TableCell style={fieldCellStyle}>
                    <Select
                      wrapStyle={{ width: 100 }}
                      value={fieldCode}
                      datas={toSelectOptions(dsList, datasource)}
                      onChange={(val,text) => {
                        const values = [...configs];
                        values[index] = {
                          fieldCode: val,
                          seriesName: seriesName ? seriesName : text,
                          sumType,
                        };

                        dispatch(
                          setConfig({
                            ...config,
                            nameSeriesConfigs: values,
                          })
                        );
                      }}
                    ></Select>
                  </TableCell>
                  <TableCell style={fieldCellStyle}>
                    <TextInput
                      value={seriesName}
                      style={{ height: 24 }}
                      onChange={(val) => {
                        const values = [...configs];
                        values[index] = { fieldCode, seriesName: val, sumType };
                        dispatch(
                          setConfig({
                            ...config,
                            nameSeriesConfigs: values,
                          })
                        );
                      }}
                    ></TextInput>
                  </TableCell>
                  <TableCell style={fieldCellStyle}>
                    <SumType
                      value={sumType}
                      onChange={(val) => {
                        const values = [...configs];
                        values[index] = { fieldCode, seriesName, sumType: val };
                        dispatch(
                          setConfig({
                            ...config,
                            nameSeriesConfigs: values,
                          })
                        );
                      }}
                    ></SumType>
                  </TableCell>
                  <TableCell style={operationCellStyle}>
                    <Close
                      hoverable={false}
                      onClick={() => {
                        const values = [...configs];
                        values.splice(index, 1);
                        dispatch(
                          setConfig({
                            ...config,
                            nameSeriesConfigs: values,
                          })
                        );
                      }}
                    ></Close>
                  </TableCell>
                </TableRow>
              </Fragment>
            );
          })}
        </TableBody>
      </Table>
      <Add
        onClick={() => {
          const values = [
            ...configs,
            { fieldCode: null, seriesName: '', sumType: 'sum' },
          ];
          dispatch(
            setConfig({
              ...config,
              nameSeriesConfigs: values,
            })
          );
        }}
      ></Add>
    </Fragment>
  );
}

/**
 * 系列配置
 */
export default function () {
  const { config } = useSelector(({ chartSlice }) => chartSlice);
  const dispatch = useDispatch();
  const seriesType = config.seriesType ? config.seriesType : 'fieldValue';
  return (
    <Fragment>
      <FormItem label='系列配置:'>
        <RadioGroup
          value={seriesType}
          onChange={(val) =>
            dispatch(setConfig({ ...config, seriesType: val }))
          }
        >
          <Radio value='fieldValue' label='字段值'></Radio>
          <Radio value='fieldName' label='字段名'></Radio>
        </RadioGroup>
      </FormItem>
      {seriesType == 'fieldValue' ? (
        <FieldValueConfig
          value={config.valueSeriesConfig ? config.valueSeriesConfig : null}
          onChange={(val) =>
            dispatch(setConfig({ ...config, valueSeriesConfig: {} }))
          }
        ></FieldValueConfig>
      ) : null}
      {seriesType == 'fieldName' ? <FieldNameConfig></FieldNameConfig> : null}
    </Fragment>
  );
}
