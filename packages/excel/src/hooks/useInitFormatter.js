import {
  useEffect,
  useRef,
} from 'react';

import { isFunction } from '@toone/report-util';

export default function useInitFormatter({
  setCtxVal,
  ctxVal,
  onDatasourceFormatterHandler,
  persistingDataSlice = {},
}) {
  const baseConfig = useRef({
    dataSourceFormatterMap: new Map(),
    typeFormatterMap: new Map(),
    addDataSourceFormatterMap: new Map(),
    isInitFormatter: false,
  });
  /**
   * 构造格式化Map
   */
  const structuralFormaMap = () => {
    baseConfig.current.dataSourceFormatterMap.clear();
    baseConfig.current.typeFormatterMap.clear();
    const { formatter, metadatasType } = persistingDataSlice || {};
    if (!!formatter) {
      for (let [dataSourceKey, dataSourceValue] of Object.entries(
        formatter.dataSource || {}
      )) {
        if (typeof dataSourceValue === 'string')
          baseConfig.current.dataSourceFormatterMap.set(
            dataSourceKey,
            dataSourceValue
          );
        else
          for (let [dataSourceItemKey, dataSourceItemValue] of Object.entries(
            dataSourceValue
          )) {
            baseConfig.current.dataSourceFormatterMap.set(
              `${dataSourceKey}.${dataSourceItemKey}`,
              dataSourceItemValue
            );
          }
      }

      const formatterType = formatter.type || {};
      for (let [dataSourceKey, dataSourceValue] of Object.entries(
        metadatasType
      )) {
        if (!!formatterType[dataSourceValue])
          baseConfig.current.typeFormatterMap.set(
            dataSourceKey,
            formatterType[dataSourceValue]
          );
      }
    }
    baseConfig.current.isInitFormatter = true;
  };

  /**
   * 格式化绑定字段的值
   * @param {*} json
   */
  const initFormatter = (json) => {
    if (!baseConfig.current.isInitFormatter) structuralFormaMap();
    const { formatter } = persistingDataSlice || {};
    if (!formatter && baseConfig.current.dataSourceFormatterMap.size == 0)
      return;
    for (let sheet of Object.values(json?.sheets ?? {})) {
      for (let row of Object.values(sheet?.data?.dataTable ?? {})) {
        for (let cell of Object.values(row)) {
          if (!cell.style || !cell?.style?.formatter) {
            if (
              baseConfig.current.dataSourceFormatterMap.has(cell?.bindingPath)
            )
              cell.style = {
                ...(cell?.style || {}),
                formatter: baseConfig.current.dataSourceFormatterMap.get(
                  cell.bindingPath
                ),
              };
            else if (baseConfig.current.typeFormatterMap.has(cell?.bindingPath))
              cell.style = {
                ...(cell?.style || {}),
                formatter: baseConfig.current.typeFormatterMap.get(
                  cell.bindingPath
                ),
              };
          } else if (
            baseConfig.current.addDataSourceFormatterMap.has(cell?.bindingPath)
          ) {
            cell.style = {
              ...(cell?.style || {}),
              formatter: baseConfig.current.addDataSourceFormatterMap.get(
                cell.bindingPath
              ),
            };
          }
        }
      }
    }
  };

  /**
   * 设置数据源格式化
   * @param {string} datasource 数据源
   * @param {string} format 格式化格式
   */
  const setDataSourceFormatter = (datasource, format) => {
    baseConfig.current.dataSourceFormatterMap.set(datasource, format);
    baseConfig.current.addDataSourceFormatterMap.set(datasource, format);
    setCtxVal((ctxVal) => {
      return { ...ctxVal, isLoading: true, isRefresh: !ctxVal.isRefresh };
    });
  };

  /**
   * 删除数据源格式化值
   * @param {string} datasource 数据源
   */
  const delDataSourceFormatter = (datasource) => {
    baseConfig.current.dataSourceFormatterMap.delete(datasource);
    baseConfig.current.addDataSourceFormatterMap.delete(datasource);
    setCtxVal((ctxVal) => {
      return { ...ctxVal, isLoading: true, isRefresh: !ctxVal.isRefresh };
    });
  };

  useEffect(() => {
    if (isFunction(onDatasourceFormatterHandler)) {
      onDatasourceFormatterHandler(() => {
        return new Promise((resolve) => {
          resolve({
            setDataSourceFormatter,
            delDataSourceFormatter,
          });
        });
      });
    }
  }, []);

  ctxVal.setDataSourceFormatter = setDataSourceFormatter;
  ctxVal.delDataSourceFormatter = delDataSourceFormatter;

  return initFormatter;
}
