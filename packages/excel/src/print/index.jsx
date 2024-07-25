import { useContext, useEffect, useState } from 'react';

import JSZip from 'JSZip';
import resourceManager from 'resource-manager-js';

import { isFunction, isString } from '@toone/report-util';

import PreviewContext from '../PreviewContext';
import ExcelEnhancer from '../utils/ExcelEnhancer';
import { download } from '../utils/fileUtil';
import { getNamespace, getPluginSrc } from '../utils/spreadUtil';
import Excel from './Excel';
import Print from './Print';
import { defaultConfig } from '../config';
import { setPrintInfo } from '../utils/printUtil';

const GC = getNamespace();
const printTotal = 20;
//打印时自适应
const zoomPrint = (sheetJson, inst) => {
  let scaleType = null;
  const sheetTag = sheetJson?.data?.defaultDataNode?.tag;
  if (sheetTag) {
    const sheetTagJson = JSON.parse(sheetTag);
    scaleType = sheetTagJson?.scaleType;
  }

  if (scaleType != 2) {
    return;
  }

  const rowHeaderVisible = sheetJson.rowHeaderVisible !== false;
  const rowHeaderColInfos = sheetJson.rowHeaderColInfos || [];

  const columnCount = sheetJson.columnCount;
  let columns = sheetJson.columns || [];
  let totalSize = 0;

  if (rowHeaderVisible) {
    if (rowHeaderColInfos.length) {
      rowHeaderColInfos.forEach(function ({ size }) {
        totalSize += size || 40;
      });
    } else {
      totalSize += 40;
    }
  }

  for (let i = 0; i < columnCount; i++) {
    const size = columns?.[i]?.size || 60;
    totalSize += size;
  }
  const width =
    inst.paper.width - inst.paper.paddingLeft - inst.paper.paddingRight;
  if (totalSize > width) {
    const newColumns = [];
    for (let i = 0; i < columnCount; i++) {
      const datas = columns?.[i] || { size: 60 };
      const size = datas.size || 60;
      datas.size = Math.floor(width * (size / totalSize));
      newColumns.push(datas);
    }
    if (rowHeaderVisible) {
      let newRowHeaderColInfos = [];
      if (rowHeaderColInfos.length) {
        rowHeaderColInfos.forEach(function (item) {
          const size = item.size || 40;
          newRowHeaderColInfos.push({
            ...item,
            size: Math.floor((size / totalSize) * width),
          });
        });
      } else {
        newRowHeaderColInfos.push({
          size: Math.floor((40 / totalSize) * width),
        });
      }
      sheetJson.rowHeaderColInfos = newRowHeaderColInfos;
    }
    sheetJson.columns = newColumns;
  }
};

//导出excel处理器
const exportExcelHandler = ({ filename, options, exportResolve, ctxVal }) => {
  const zip = new JSZip();
  const blobs = [];
  const result = new Promise((_resolve, reject) => {
    if (!(isString(filename) && filename.trim() !== '')) {
      reject(Error('导出excel失败，原因:没有传递导出文件名'));
      return;
    }
    resourceManager.loadScript(getPluginSrc('excel')).then(() => {
      const {
        printPages: pageDatas,
        spread,
        parseReportJsonInst: inst,
      } = ctxVal;

      const excelIO = new GC.Spread.Excel.IO();
      const sheet = spread.getActiveSheet();
      const promiseFns = [];
      if (defaultConfig.exportSettings.type == 'allPage') {
        const datasLen = pageDatas.datas.length;
        for (let i = 0; i < datasLen; i++) {
          promiseFns.push(() => {
            return new Promise((resolve) => {
              let newfilename = filename + (i + 1) + '.xlsx';
              const sheetJson = sheet.toJSON();
              zoomPrint(sheetJson, inst);
              const newSheet = pageDatas.datas[i];
              newSheet.sheet = sheetJson;
              inst.resetSheet(newSheet);
              sheet.setRowCount(0);
              sheet.fromJSON(sheetJson);
              const enhancer = new ExcelEnhancer(spread).enhance();
              const enhancerHandler = (result) => {
                const json = JSON.stringify(result);
                //当前批次导出excel成功回调
                const success = (blob) => {
                  blobs.unshift({
                    filename: newfilename,
                    blob,
                  });
                  if (isFunction(options.progress)) {
                    let currentIndex = (i + 1) * 20;
                    const total = currentIndex;
                    if (currentIndex >= ctxVal.total) {
                      currentIndex = ctxVal.total;
                    }
                    for (let i = total - 20 + 1; i <= currentIndex; i++) {
                      options.progress(i, ctxVal.total);
                    }
                  }

                  if (blobs.length === pageDatas.datas.length) {
                    _resolve();
                  }
                  resolve();
                };

                excelIO.save(
                  json,
                  success,
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
              };
              enhancer.then(enhancerHandler).catch(reject);
            });
          });
        }
      } else {
        promiseFns.push(() => {
          return new Promise((resolve) => {
            let newfilename = filename + '.xlsx';
            const sheetJson = sheet.toJSON();
            zoomPrint(sheetJson, inst);
            const newSheet = ctxVal.pages[ctxVal.pageIndex - 1];
            newSheet.sheet = sheetJson;
            inst.resetSheet(newSheet);
            sheet.setRowCount(0);
            sheet.fromJSON(sheetJson);
            const enhancer = new ExcelEnhancer(spread).enhance();
            const enhancerHandler = (result) => {
              const json = JSON.stringify(result);
              //当前批次导出excel成功回调
              const success = (blob) => {
                blobs.unshift({
                  filename: newfilename,
                  blob,
                });

                if (isFunction(options.progress)) {
                  for (let i = 1; i <= 100; i++) {
                    options.progress(i);
                  }
                }
                resolve();
                _resolve();
              };

              excelIO.save(
                json,
                success,
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
            };
            enhancer.then(enhancerHandler).catch(reject);
          });
        });
      }
      promiseFns.reduce((prev, cur) => {
        return prev.then((a) => {
          return cur().then(() => {});
        });
      }, Promise.resolve());
    });
  });
  result.then(() => {
    if (blobs.length > 1) {
      blobs.forEach(({ filename, blob }) => {
        zip.file(filename, blob, { binary: true });
      });

      zip.generateAsync({ type: 'blob' }).then(function (content) {
        download(content, `${filename}.zip`);
      });
    } else {
      blobs.forEach(({ blob }) => {
        let newfilename = filename + '.xlsx';
        download(blob, newfilename);
      });
    }
    exportResolve();
  });
};

//导出PDF处理器
const exportPDFHandler = ({
  filename,
  options = {
    //是否持久化(下载pdf)
    persistence: true,
    author: '',
    creator: '',
    keywords: '',
    subject: '',
    title: '',
    exportPdfHandler: null,
  },
  exportResolve,
  ctxVal,
}) => {
  return new Promise((_resolve) => {
    const exportHandler = () => {
      const {
        persistence = true,
        author,
        creator,
        keywords,
        subject,
        title,
        sheetIndex,
        exportPdfHandler,
      } = options;

      const {
        printPages: pageDatas,
        spread,
        parseReportJsonInst: inst,
      } = ctxVal;

      const sheet = spread.getActiveSheet();
      if (!!spread) {
        const sheets = spread.sheets;
        sheets.forEach((sheet) => {
          setPrintInfo(sheet);
          const printInfo = sheet.printInfo();
          printInfo.rowStart(-1);
          printInfo.rowEnd(-1);
          printInfo.columnStart(-1);
          printInfo.columnEnd(-1);
          sheet.removeCustomName('Print_Area');
        });
      }
      const promiseFns = [];
      if (defaultConfig.exportSettings.type == 'allPage') {
        const datasLen = pageDatas.datas.length;
        const blobs = [];
        for (let i = 0; i < datasLen; i++) {
          promiseFns.push(() => {
            return new Promise((resolve, reject) => {
              const sheetJson = sheet.toJSON();
              zoomPrint(sheetJson, inst);
              const newSheet = pageDatas.datas[i];
              newSheet.sheet = sheetJson;
              inst.resetSheet(newSheet);
              sheet.setRowCount(0);
              sheet.fromJSON(sheetJson);
              const enhancer = new ExcelEnhancer(spread).enhance();
              const success = (data) => {
                blobs.push(data);
                if (persistence) {
                  download(data, filename);
                }
                if (isFunction(exportPdfHandler)) {
                  exportPdfHandler({
                    total: datasLen,
                    blob: data,
                    index: i + 1,
                  });
                }
                resolve();
              };
              const thenHandler = () => {
                spread.savePDF(
                  success,
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
              enhancer.then(thenHandler).catch(reject);
            });
          });
        }
      } else {
        promiseFns.push(() => {
          return new Promise((resolve, reject) => {
            const sheetJson = sheet.toJSON();
            zoomPrint(sheetJson, inst);
            const newSheet = ctxVal.pages[ctxVal.pageIndex - 1];
            newSheet.sheet = sheetJson;
            inst.resetSheet(newSheet);
            sheet.setRowCount(0);
            sheet.fromJSON(sheetJson);
            const enhancer = new ExcelEnhancer(spread).enhance();
            const success = (data) => {
              if (persistence) {
                download(data, filename);
              }
              if (isFunction(exportPdfHandler)) {
                exportPdfHandler({
                  total: 1,
                  blob: data,
                  index: 1,
                });
              }
              resolve();
            };
            const thenHandler = () => {
              spread.savePDF(
                success,
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
            enhancer.then(thenHandler).catch(reject);
          });
        });
      }
      promiseFns.push(() => {
        return new Promise(() => {
          exportResolve(true);
        });
      });
      promiseFns.reduce((prev, cur) => {
        return prev.then((a) => {
          return cur().then(() => {});
        });
      }, Promise.resolve());
    };
    if (GC.Spread.Sheets.PDF) {
      //已经加载了pdf插件,直接执行导出逻辑
      exportHandler();
    } else {
      //先加载pdf插件，再进行导出
      resourceManager.loadScript(getPluginSrc('pdf')).then(exportHandler);
    }
  });
};

const printHandler = ({ ctxVal }) => {
  const {
    printPages: pageDatas,
    spread,
    parseReportJsonInst: inst,
    printIndex,
  } = ctxVal;

  if (!!spread) {
    const sheets = spread.sheets;
    sheets.forEach((sheet) => {
      setPrintInfo(sheet);
      const printInfo = sheet.printInfo();
      printInfo.rowStart(-1);
      printInfo.rowEnd(-1);
      printInfo.columnStart(-1);
      printInfo.columnEnd(-1);
      sheet.removeCustomName('Print_Area');
    });
  }

  const sheet = spread.getActiveSheet();
  const sheetJson = sheet.toJSON();
  const newPageIndex = printIndex - 1;

  if (newPageIndex < pageDatas.datas.length) {
    pageDatas.pageIndex = newPageIndex;
    const newSheet = pageDatas.datas[newPageIndex];
    newSheet.sheet = sheetJson;
    inst.resetSheet(newSheet);
    zoomPrint(sheetJson, inst);
    sheet.setColumnCount(0);
    sheet.setRowCount(0);
    sheet.fromJSON(sheetJson);
  }
  spread.print();
};

export default (props) => {
  const context = useContext(PreviewContext);
  const {
    onPrintHandler,
    enablePrint = true,
    json,
    onExportExcelHandler,
    onExportPDFHandler,
  } = props;
  const [ctxVal, setCtxVal] = useState({
    showExcel: false,
    showPrint: false,
    printIndex: 1, //打印的批次
    start: 1,
    printed: {}, //已打印页码
    printTotal: printTotal, //没一批次打印总页数
    end: printTotal, //本次打印结束范围
    spread: null,
    handler: null,
    pages: [],
    exportSettings: {
      type: 'allPage', // curPage | allPage
    },
  });
  ctxVal.total = context.total; //总共有多少页
  ctxVal.printPages = context.printPages;
  ctxVal.parseReportJsonInst = context.parseReportJsonInst;
  ctxVal.pages = context.pages;
  ctxVal.exportSettings = context.exportSettings;
  ctxVal.pageIndex = context.pageIndex;

  ctxVal.close = () => {
    setCtxVal((ctxVal) => {
      return { ...ctxVal, showPrint: false };
    });
  };
  //切换到下一批打印内容
  ctxVal.next = () => {
    setCtxVal((ctxVal) => {
      if (ctxVal.end >= ctxVal.total) {
        return ctxVal;
      }
      const printIndex = ctxVal.printIndex + 1;
      const start = ctxVal.start + ctxVal.printTotal;
      let end = ctxVal.end + ctxVal.printTotal;
      if (end >= context.total) {
        end = context.total;
      }
      return { ...ctxVal, printIndex, start, end };
    });
  };

  //切换到上一批打印内容
  ctxVal.pre = () => {
    setCtxVal((ctxVal) => {
      if (ctxVal.start <= 1) {
        return ctxVal;
      }
      const printIndex = ctxVal.printIndex - 1;
      const remainder = context.total % ctxVal.printTotal;
      const start = ctxVal.start - ctxVal.printTotal;
      let end = ctxVal.end;
      if (end >= context.total && remainder > 0) {
        end -= remainder;
      } else {
        end -= ctxVal.printTotal;
      }
      return { ...ctxVal, printIndex, start, end };
    });
  };

  ctxVal.printHandler = () => {
    setCtxVal((ctxVal) => {
      //已经显示报表
      if (ctxVal.showExcel) {
        printHandler({
          ctxVal,
        });
        if (ctxVal.printed[ctxVal.printIndex]) {
          return ctxVal;
        } else {
          return {
            ctxVal,
            printed: {
              ...ctxVal.printed,
              [ctxVal.printIndex]: true,
            },
          };
        }
      }
      return {
        ...ctxVal,
        showExcel: true,
        printed: {
          [ctxVal.printIndex]: true,
        },
        handler(ctxVal) {
          if (enablePrint) {
            printHandler({
              ctxVal,
            });
          }
        },
      };
    });
  };

  //导出excel
  const exportExcel = (
    filename,
    options = { ignoreFormula: false, ignoreStyle: false }
  ) => {
    return new Promise((exportResolve) => {
      setCtxVal((ctxVal) => {
        //已经显示报表
        if (ctxVal.showExcel) {
          exportExcelHandler({
            filename,
            options,
            exportResolve,
            ctxVal,
          });
          return ctxVal;
        }
        return {
          ...ctxVal,
          showExcel: true,
          handler(ctxVal) {
            exportExcelHandler({
              filename,
              options,
              exportResolve,
              ctxVal,
            });
          },
        };
      });
    });
  };
  window.exportExcel = exportExcel;
  context.exportExcel = exportExcel;
  const exportPDF = (
    filename,
    options = {
      //是否持久化(下载pdf)
      persistence: true,
      author: '',
      creator: '',
      keywords: '',
      subject: '',
      title: '',
      exportPdfHandler: null,
    }
  ) => {
    return new Promise((exportResolve) => {
      setCtxVal((ctxVal) => {
        //已经显示报表
        if (ctxVal.showExcel) {
          exportPDFHandler({
            filename,
            options,
            exportResolve,
            ctxVal,
          });
          return ctxVal;
        }
        return {
          ...ctxVal,
          showExcel: true,
          handler(ctxVal) {
            exportPDFHandler({
              filename,
              options,
              exportResolve,
              ctxVal,
            });
          },
        };
      });
    });
  };
  window.exportPDF = exportPDF;
  context.exportPDF = exportPDF;
  useEffect(() => {
    if (isFunction(onPrintHandler)) {
      onPrintHandler(() => {
        return new Promise((resolve, reject) => {
          if (!enablePrint) {
            reject(Error('打印失败，原因：初始化报表时未开启打印功能'));
            return;
          }
          resolve({
            print() {
              setCtxVal((ctxVal) => {
                return { ...ctxVal, showPrint: true };
              });
            },
            exportExcel() {},
          });
        });
      });
    }

    //Excel
    if (isFunction(onExportExcelHandler)) {
      onExportExcelHandler(() => {
        return new Promise((resolve) => {
          resolve({
            exportExcel,
          });
        });
      });
    }
    //PDF
    if (isFunction(onExportPDFHandler)) {
      onExportPDFHandler(() => {
        return new Promise((resolve) => {
          resolve({
            exportPDF,
          });
        });
      });
    }
  });

  return (
    <PreviewContext.Provider value={ctxVal}>
      {ctxVal.showExcel && (
        <Excel
          json={json}
          onInited={(spread) => {
            setCtxVal((ctxVal) => {
              if (isFunction(ctxVal.handler)) {
                ctxVal.handler({ ...ctxVal, spread });
              }
              return { ...ctxVal, spread };
            });
          }}
        ></Excel>
      )}
      {ctxVal.showPrint && <Print></Print>}
    </PreviewContext.Provider>
  );
};
