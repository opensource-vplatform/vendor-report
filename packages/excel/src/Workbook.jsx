import { useMemo, useState, useRef, useEffect } from 'react';

import Print from './Print';
import ParseReportJson from './template/ParseReportJson';
import { getLicense, setLicense } from './utils/licenseUtil';
import { getNamespace } from './utils/spreadUtil';
import WorkbookItem from './WorkbookItem';

export default function (props) {
  const {
    enablePrint = false,
    onPrintHandler,
    onExportExcelHandler,
    onExportPDFHandler,
    onDatasourceFormatterHandler,
    license,
    dataSource: _dataSource,
    json: _json,
    template,
    setting,
    onQuery,
  } = props;
  if (license) {
    setLicense(license);
  }
  const GC = getNamespace();
  const [workbookDatas, setWorkbookDatas] = useState({
    dataSource: _dataSource,
  });

  const dataSource = workbookDatas.dataSource;
  const licenseKey = getLicense();
  const baseConfig = useRef({
    dataSourceFormatterMap: new Map(),
    typeFormatterMap: new Map(),
    addDataSourceFormatterMap: new Map(),
    isInitFormatter: false,
    setLoading: () => {},
  });
  const [isRefresh, setIsRefresh] = useState(false);
  if (licenseKey) {
    GC.Spread.Sheets.LicenseKey = licenseKey;
  }

  /**
   * 构造格式化Map
   */
  const structuralFormaMap = () => {
    baseConfig.current.dataSourceFormatterMap.clear();
    baseConfig.current.typeFormatterMap.clear();
    const { formatter, metadatasType } = props.persistingDataSlice || {};
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
    const { formatter } = props.persistingDataSlice || {};
    if (!formatter && baseConfig.current.dataSourceFormatterMap.size == 0)
      return;
    for (let sheet of Object.values(json.sheets)) {
      for (let row of Object.values(sheet.data.dataTable)) {
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

  const { json, inst } = useMemo(() => {
    let json = null;
    let inst = null;

    if (_json) {
      json = JSON.parse(JSON.stringify(_json));
      if (json && dataSource) {
        initFormatter(json);
        inst = new ParseReportJson({
          reportJson: json,
          datas: dataSource,
          tempConfig: template,
          setting,
        });
        const item = localStorage.getItem('storeSpreadJson');
        if (item) {
          localStorage.setItem('spreadJson', JSON.stringify(json));
        }
      }
    }

    return {
      json,
      inst,
    };
  }, [
    _json,
    dataSource,
    JSON.stringify(template),
    JSON.stringify(setting),
    isRefresh,
  ]);

  /**
   * 设置数据源格式化
   * @param {string} datasource 数据源
   * @param {string} format 格式化格式
   */
  const setDataSourceFormatter = (datasource, format) => {
    baseConfig.current.dataSourceFormatterMap.set(datasource, format);
    baseConfig.current.addDataSourceFormatterMap.set(datasource, format);
    baseConfig.current.setLoading();
    setIsRefresh(!isRefresh);
  };

  /**
   * 删除数据源格式化值
   * @param {string} datasource 数据源
   */
  const delDataSourceFormatter = (datasource) => {
    baseConfig.current.dataSourceFormatterMap.delete(datasource);
    baseConfig.current.addDataSourceFormatterMap.delete(datasource);
    baseConfig.current.setLoading();
    setIsRefresh(!isRefresh);
  };

  const handlePrint = (printInfos) => {
    if (onPrintHandler) {
      onPrintHandler((params) => {
        return new Promise((resolve, reject) => {
          if (!enablePrint) {
            reject(Error('打印失败，原因：初始化报表时未开启打印功能'));
            return;
          }
          resolve({
            print: printInfos.show,
            exportExcel: printInfos.exportExcel,
          });
        });
      });
    }
    if (onExportExcelHandler) {
      onExportExcelHandler((params) => {
        return new Promise((resolve, reject) => {
          resolve({
            exportExcel: printInfos.exportExcel,
          });
        });
      });
    }
    if (typeof onExportPDFHandler === 'function') {
      onExportPDFHandler(() => {
        return new Promise((resolve, reject) => {
          resolve({
            exportPDF: printInfos.exportPDF,
          });
        });
      });
    }
    if (typeof onDatasourceFormatterHandler === 'function') {
      onDatasourceFormatterHandler(() => {
        return new Promise((resolve, reject) => {
          resolve({
            setDataSourceFormatter,
            delDataSourceFormatter,
          });
        });
      });
    }
  };

  const handleOnQuery = (queryParams) => {
    if (typeof onQuery === 'function') {
      const queryResult = onQuery(queryParams);
      queryResult.then((datas) => {
        setWorkbookDatas((workbookDatas) => {
          return {
            ...workbookDatas,
            dataSource: {
              ..._dataSource,
              ...(datas || {}),
            },
          };
        });
      });
    }
  };

  return (
    <>
      <Print
        onInited={(printInfos) => {
          handlePrint(printInfos);
        }}
        license={license}
        enablePrint={enablePrint}
        dataSource={dataSource}
        json={json}
        inst={inst}
      ></Print>
      <WorkbookItem
        {...props}
        onPrintHandler={null}
        inst={inst}
        json={json}
        onQuery={handleOnQuery}
        onInited={(...args) => {
          baseConfig.current.setLoading = args[1].setLoading;
          props.onInited(...args);
        }}
      ></WorkbookItem>
    </>
  );
}
