import { createElement } from 'react';

import { createRoot } from 'react-dom/client';
import resourceManager from 'resource-manager-js';

import { uuid } from '@toone/report-util';

import { download } from './utils/fileUtil';
import {
  getNamespace,
  getPluginSrc,
  withBatchCalcUpdate,
} from './utils/spreadUtil';
import Preview from './Preview';

const invoker = function (handler, args) {
  if (typeof handler == 'function') {
    handler.apply(null, args);
  }
};

/**
 * 报表预览
 * @class Preview
 * @example
 * var report = new TOONE.Report.Preview();
 * report.mount(document.getElementById('app'));
 * report.exportExcel("test.xlsx")
 */
class Report {
  conf = {};

  spread = null;

  printHandler = null;

  exportExcelHandler = null;

  exportPDFHandler = null;

  datasourceFormatterHandler = null;

  /**
   * @constructor
   * @param {Object} conf 配置信息<br/>
   * ready: Function<{@link WorkBook}> 初始化完成回调<br/>
   * enablePrint: Boolean 是否启用打印功能<br/>
   * json: Object 报表配置数据<br/>
   * license：String 报表许可证<br/>
   */
  constructor(conf) {
    this.conf = conf;
  }

  /**
   * 报表挂载
   * @param {DOMElement} el 挂载dom对象
   */
  mount(el) {
    const GC = getNamespace();
    GC.Spread.Common.CultureManager.culture('zh-cn');
    const {
      onInited,
      ready,
      dataSource = {},
      dev,
      license,
      localLicenseUnCheck,
      onPageCompleted,
      ...others
    } = this.conf || {};
    const readyHandler = (spread) => {
      const hasReady = ready || dev?.getParams()?.ready;
      if (hasReady) {
        withBatchCalcUpdate(spread, () => {
          const args = [spread, { datas: dataSource || {} }];
          invoker(ready, args);
          invoker(dev?.getParams()?.ready, args);
        });
      }
    };
    const onInitHandler = (spread) => {
      this.spread = spread;
      if (onInited) {
        onInited(spread);
      }
      readyHandler(spread);
    };
    let json = this.conf?.json?.reportJson;
    if (json) {
      json = JSON.parse(JSON.stringify(json));
    }

    const { rowMerge, columnMerge } =
      this.conf?.json?.context?.tableDesignSlice || {};
    const { onFetchData } = this.conf?.event || {};
    const {
      sumColumns,
      tableGroups: groupColumns,
      rowMergeColumns = {},
      colMergeColumns = {},
    } = this.conf?.json?.context?.datasourceSlice || {};

    const template = this.conf?.json?.context?.wizardSlice?.template;

    const setting = this.conf?.json?.datasourceSetting;

    const persistingDataSlice = this.conf?.json?.context?.persistingDataSlice;

    createRoot(el).render(
      createElement(Preview, {
        onInited: onInitHandler,
        onPrintHandler: (handler) => {
          this.printHandler = handler;
        },
        onExportExcelHandler: (handler) => {
          this.exportExcelHandler = handler;
        },
        onPageCompleted: (handler) => {
          handler().then((datas) => {
            this.pageInfos = datas;
          });
          if (typeof onPageCompleted === 'function') {
            onPageCompleted(handler);
          }
        },
        onExportPDFHandler: (handler) => {
          this.exportPDFHandler = handler;
        },
        onDatasourceFormatterHandler: (handler) => {
          this.datasourceFormatterHandler = handler;
        },
        baseUrl: this.conf?.baseUrl,
        onFetchData,
        rowMerge,
        columnMerge,
        sumColumns,
        groupColumns,
        rowMergeColumns,
        colMergeColumns,
        dataSource,
        template,
        setting,
        localLicenseUnCheck,
        license: license || dev?.getParams()?.license,
        persistingDataSlice,
        ...others,
        json,
      })
    );
  }

  /**
   * 导出excel
   * @param {String} filename 导出excel名称
   * @param {Object=} options 导出配置<br/>ignoreFormula：忽略公式<br/>ignoreStyle：忽略样式<br/>
   * @returns Promise
   */
  exportExcel(
    filename,
    options = {
      ignoreFormula: false,
      ignoreStyle: false,
    }
  ) {
    return new Promise((resolve, reject) => {
      if (typeof filename == 'string' && filename.trim() !== '') {
        if (this.exportExcelHandler) {
          this.exportExcelHandler()
            .then(({ exportExcel }) => {
              exportExcel(filename, options).then(() => {
                resolve();
              });
            })
            .catch(reject);
        } else {
          reject(Error('导出excel失败，原因：报表未初始化'));
        }
      } else {
        reject(Error('导出excel失败，原因:没有传递导出文件名'));
      }
    });
  }
  /*  exportExcel(
        filename,
        options = { ignoreFormula: false, ignoreStyle: false }
    ) {
        return new Promise((resolve, reject) => {
            if (typeof filename == 'string' && filename.trim() !== '') {
                filename = filename.endsWith('.xlsx')
                    ? filename
                    : filename + '.xlsx';
                resourceManager.loadScript(getPluginSrc('excel')).then(() => {
                    const GC = getNamespace();
                    const excelIO = new GC.Spread.Excel.IO();
                    const json = JSON.stringify(this.spread.toJSON());
                    excelIO.save(
                        json,
                        (blob) => {
                            download(blob, filename);
                            resolve();
                        },
                        (err) => {
                            reject(err);
                        },
                        {
                            columnHeadersAsFrozenRows: false,
                            includeAutoMergedCells: false,
                            includeBindingSource: false,
                            includeCalcModelCache: false,
                            includeEmptyRegionCells: true,
                            includeFormulas: !options.ignoreFormula,
                            includeStyles: !options.ignoreStyle,
                            includeUnusedNames: true,
                            password: undefined,
                            rowHeadersAsFrozenColumns: false,
                            saveAsView: false,
                        }
                    );
                });
            } else {
                reject(Error('导出excel失败，原因:没有传递导出文件名'));
            }
        });
    } */

  /**
   * 导出pdf
   * @param {String} filename 导出pdf文件名称
   * @param {Object=} options 导出配置<br/>author：作者<br/>creator：创建者<br/>keywords：关键字<br/>subject：主题<br/>title：标题<br/>sheetIndex：导出工作表下标，如未设置，则导出全部
   * @returns Promise
   */
  exportPdf(
    filename,
    options = {
      //是否持久化(下载pdf)
      persistence: true,
      author: '',
      creator: '',
      keywords: '',
      subject: '',
      title: '',
      sheetIndex: null,
      exportPdfHandler: null,
    }
  ) {
    return new Promise((resolve, reject) => {
      this.printHandler()
        .then(() => {
          if (typeof filename == 'string' && filename.trim() !== '') {
            filename = filename.endsWith('.pdf') ? filename : filename + '.pdf';

            if (options?.exportPdfHandler) {
              if (this.exportPDFHandler) {
                this.exportPDFHandler()
                  .then(({ exportPDF }) => {
                    exportPDF(filename, options).then(() => {
                      resolve();
                    });
                  })
                  .catch(reject);
              } else {
                reject(Error('导出PDF失败，原因：报表未初始化'));
              }
              return;
            }

            const exportHandler = () => {
              const {
                persistence,
                author,
                creator,
                keywords,
                subject,
                title,
                sheetIndex,
              } = options;
              this.spread.savePDF(
                (data) => {
                  if (persistence) {
                    download(data, filename);
                  }
                  resolve(data);
                },
                (err) => {
                  reject(err);
                },
                {
                  author,
                  creator,
                  keywords,
                  subject,
                  title,
                },
                sheetIndex == null ? undefined : sheetIndex
              );
            };
            const GC = getNamespace();
            if (GC.Spread.Sheets.PDF) {
              //已经加载了pdf插件,直接执行导出逻辑
              exportHandler();
            } else {
              //先加载pdf插件，再进行导出
              resourceManager
                .loadScript(getPluginSrc('pdf'))
                .then(exportHandler);
            }
          } else {
            reject(Error('导出pdf失败，原因:没有传递导出文件名'));
          }
        })
        .catch(reject);
    });
  }
  /* exportPdf(
        filename,
        options = {
            //是否持久化(下载pdf)
            persistence: true,
            author: '',
            creator: '',
            keywords: '',
            subject: '',
            title: '',
            sheetIndex: null,
        }
    ) {
        return new Promise((resolve, reject) => {
            this.printHandler()
                .then(() => {
                    if (typeof filename == 'string' && filename.trim() !== '') {
                        filename = filename.endsWith('.pdf')
                            ? filename
                            : filename + '.pdf';
                        const exportHandler = () => {
                            const {
                                persistence,
                                author,
                                creator,
                                keywords,
                                subject,
                                title,
                                sheetIndex,
                            } = options;
                            this.spread.savePDF(
                                (data) => {
                                    if (persistence) {
                                        download(data, filename);
                                    }
                                    resolve(data);
                                },
                                (err) => {
                                    reject(err);
                                },
                                {
                                    author,
                                    creator,
                                    keywords,
                                    subject,
                                    title,
                                },
                                sheetIndex == null ? undefined : sheetIndex
                            );
                        };
                        const GC = getNamespace();
                        if (GC.Spread.Sheets.PDF) {
                            //已经加载了pdf插件,直接执行导出逻辑
                            exportHandler();
                        } else {
                            //先加载pdf插件，再进行导出
                            resourceManager
                                .loadScript(getPluginSrc('pdf'))
                                .then(exportHandler);
                        }
                    } else {
                        reject(Error('导出pdf失败，原因:没有传递导出文件名'));
                    }
                })
                .catch(reject);
        });
    } */
  /**
   * 打印
   * @description 报表打印，使用打印时，须在Preview初始化时将属性enablePrint设置为true
   * @param {Object} params 打印参数<br/>
   * showBorder：显示excel外边框
   * showColumnHeader：显示列头
   * showRowHeader：显示行头
   * showGridLine：显示网格线
   * 如未设置，则使用工作表内的配置值
   * @example
   * var report = new TOONE.Report.Preview({
   *  enablePrint: true
   * });
   * var promise = report.print();
   * promise.then(function(){
   *  //打印成功
   * }).catch(function(e){
   *  //错误处理
   * });
   * @returns Promise
   */
  print(params) {
    return new Promise((resolve, reject) => {
      if (this.printHandler) {
        this.printHandler(params)
          .then((spread) => {
            spread.print();
            //this.spread.print();
            resolve();
          })
          .catch(reject);
      } else {
        reject(Error('打印失败，原因：报表未初始化'));
      }
    });
  }
  getPrintTotalPages() {
    return this.pageInfos.total;
  }
  /**
   * 切换到一下
   * @returns Promise
   */
  nextPage() {
    return this.pageInfos.nextPage();
  }
  /**
   * 判断是否分页
   * @returns Boolean
   */
  isPaged() {
    return this.pageInfos.isPage;
  }

  /**
   * 切换到上一页
   * @returns Promise
   */ 
  previousPage() {
    if (typeof this.pageInfos.previousPage === 'function') {
      this.pageInfos.previousPage();
    }
  }

  /**
   * 跳转指定页数
   * @param {number} index 页码
   * @returns Promise
   */
  specifyPage(index) {
    if (typeof this.pageInfos.changePageIndex === 'function') {
      this.pageInfos.changePageIndex(index);
    }
  }

  /**
   * 设置数据源格式
   * @param {string} datasource 数据源
   * @param {string} format 格式 
   * @example
   * //设置sales的数据源字段'cost'为保留小数点后两位且设置千分位分隔符
   * window.tooneReport.setDataSourceFormatter('sales.cost','#,##0.00_);-#,##0.00')
   * //设置sales的数据源字段'cost'为不保留小数且设置千分位分隔符
   * window.tooneReport.setDataSourceFormatter('sales.cost','#,##0_);-#,##0')
   * // 设置sales的数据源字段'orderTime'为yyyy-MM-dd格式
   * window.tooneReport.setDataSourceFormatter('sales.orderTime','yyyy-M-d')
   */
  setDataSourceFormatter(datasource, format) {
    if (this.datasourceFormatterHandler) {
      this.datasourceFormatterHandler().then(({ setDataSourceFormatter }) => {
        setDataSourceFormatter(datasource, format);
      });
    }
  }

  /**
   * 删除数据源格式
   * @param {string} datasource 数据源
   * @example
   * //删除sales的数据源字段'cost'的格式
   * window.tooneReport.delDataSourceFormatter('sales.cost')
   */
  delDataSourceFormatter(datasource) {
    if (this.datasourceFormatterHandler) {
      this.datasourceFormatterHandler().then(({ delDataSourceFormatter }) => {
        delDataSourceFormatter(datasource);
      });
    }
  }
}

Report.Utils = {
  md5: uuid,
};

export default Report;
