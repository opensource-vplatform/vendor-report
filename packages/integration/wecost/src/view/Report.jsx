import { useEffect, useRef, useState } from 'react';

import axios from 'axios';
import styled, { __PRIVATE__ } from 'styled-components';

import {
  genResponseErrorCallback,
  getData,
  handleError as handleErrorUtil,
} from '../utils/responseUtil';
import {
  getParameter,
  getTitle,
  request,
  download,
  registerFont,
  getFontFamily,
} from '../utils/utils';
import { ErrorDialog, ErrorPage } from './components/error/Index';
import WaitMsg from './components/loading/Index';
import ProgressCircle from './components/progress';
import { PDFDocument } from 'pdf-lib';

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 0;
  flex-shrink: 0;
  width: 100%;
  height: 100%;
`;

const ExcelWrap = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  padding: 16px 10px;
  background-color: #494949;
  box-sizing: border-box;
`;

const ExcelHost = styled.div`
  width: 100%;
  height: 100%;
  background-color: white;
  padding: 2px;
`;

let _report = null;

const getError = function (result) {
  if (result && result.data) {
    const data = result.data;
    if (data.success === false) {
      return data.msg || data.message || '存在未知异常！';
    } else {
      return getError(data);
    }
  }
  return null;
};

if (typeof JWebTop !== 'undefined')
  window.invokeByDLL = function (exeScript) {
    exeScript;
  };

export default function () {
  const ref = useRef(null);

  const progressRef = useRef(null);
  window.progressRef = progressRef;
  const [data, setData] = useState({
    loadMsg: '初始化中，请稍候...',
    report: null,
    pageError: null,
    dialogError: null,
  });

  const handleDialogError = (err) => {
    setData({
      ...data,
      loadMsg: null,
      dialogError: {
        title: typeof err == 'string' ? err : err.message,
        detail: typeof err == 'string' ? '' : err.detail,
      },
    });
  };
  const handlePageError = (err) => {
    setData({
      ...data,
      loadMsg: null,
      dialogError: null,
      pageError: {
        title: err.message,
        detail: err.detail || '',
      },
    });
  };
  const setLoadMsg = (msg) => {
    setData({
      ...data,
      loadMsg: msg,
    });
  };
  const isPrint = getParameter('isPrint') == '1';
  useEffect(() => {
    addEventListener('JWebTopReady', function () {
      JWebTop.inited = true;
    });
    if (ref.current) {
      request('queryReportConfig')
        .then((config) => {
          if (!handleErrorUtil(config, handlePageError, '获取报表配置失败！')) {
            let excelJson = null;
            try {
              excelJson = JSON.parse(getData(config.data, 'config'));
            } catch (e) {}
            const initReport = (excelJson, datas) => {
              const report = new TOONE.Report.Preview({
                localLicenseUnCheck: true,
                enablePrint: isPrint,
                dataSource: datas,
                json: excelJson,
                ready: function (workbook) {
                  const sheet = workbook.getActiveSheet();
                  if (sheet) {
                    sheet.clearSelection();
                  }
                },
                onPageCompleted(handler) {
                  handler().then((datas) => {
                    //总页数
                    if (typeof window?.java === 'function') {
                      const requestData = {
                        id: TOONE.Report.Utils.md5(),
                        action: 'updatePagecount',
                        pagecount: datas.total,
                      };
                      window?.java({
                        request: JSON.stringify(requestData),
                        onSuccess() {},
                        onFailure() {},
                      });
                    }
                  });
                },
                isShowBtnToolbar: false,
              });
              _report = report;
              getFontFamily();
              //报表挂载到指定dom元素
              report.mount(ref.current);
              data.report = report;
              setData({ ...data, loadMsg: null, errorMsg: null });
              window.exportPdf = () => {
                setLoadMsg('导出到pdf中，请稍候...');
                data.report
                  .exportPdf(getTitle('未命名'))
                  .then(() => {
                    setLoadMsg(null);
                  })
                  .catch(genResponseErrorCallback(handleDialogError));
              };
            };
            if (excelJson) {
              const previewOnly = getParameter('previewOnly');
              const usedDatasources = excelJson.usedDatasources || [];
              if (
                previewOnly !== 'true' &&
                usedDatasources &&
                usedDatasources.length > 0
              ) {
                request('getTableData', {
                  requestTables: usedDatasources.join(','),
                })
                  .then((data) => {
                    if (
                      !handleErrorUtil(
                        data,
                        handlePageError,
                        '获取数据集数据失败！'
                      )
                    ) {
                      initReport(excelJson, getData(data.data, 'data', true));
                    }
                  })
                  .catch(genResponseErrorCallback(handlePageError));
              } else {
                initReport(excelJson, {});
              }
            } else {
              initReport();
            }
          }
        })
        .catch(genResponseErrorCallback(handlePageError));
    }
  }, []);
  return (
    <Wrap>
      {data.loadMsg != null ? <WaitMsg title={data.loadMsg}></WaitMsg> : null}
      {data.dialogError != null ? (
        <ErrorDialog
          message={data.dialogError.title}
          detail={data.dialogError.detail}
          onClose={() => setData({ ...data, loadMsg: null, dialogError: null })}
        ></ErrorDialog>
      ) : null}
      <ProgressCircle ref={progressRef} />
      {/*             <Toolbar>
                <Fill></Fill>
                <Page
                    onInited={(datas) => {
                        page.setPageInfos = datas.setPageInfos;
                        if (page.pageCompletedHandler) {
                            page.pageCompletedHandler().then((datas) => {
                                page.setPageInfos(datas);
                            });
                        }
                    }}
                ></Page>
                <Button
                    type='primary'
                    style={{ height: 26, width: 110 }}
                    // disabled={!data.report}
                    onClick={() => {
                        if (!data.report) return;
                        const title = '导出中，请稍候...';
                        //setLoadMsg('导出到excel中，请稍候...');
                        progressRef.current.setProgress(1, title);
                        progressRef.current.onShow();
                        data.report
                            .exportExcel(getTitle('未命名'), {
                                progress(current, total = 1) {
                                    const percent = Math.floor(
                                        (current / total) * 100
                                    );
                                    progressRef.current.setProgress(
                                        percent,
                                        title
                                    );
                                },
                            })
                            .then(() => {
                                //setLoadMsg(null);
                                progressRef.current.setProgress(
                                    100,
                                    '导出完成'
                                );
                                progressRef.current.onClose();
                            })
                            .catch(handleDialogError);
                    }}
                >
                    导出到excel
                </Button>
                <Button
                    type='success'
                    style={{ height: 26 }}
                    // disabled={!data.report}
                    onClick={() => {
                        if (!data.report) return;
                        // setLoadMsg('导出到pdf中，请稍候...');
                        const fileId = genUUID();
                        progressRef.current.setProgress(0, '导出中，请稍候...');
                        progressRef.current.onShow();

                        exportPdf(fileId)
                            .then((data) => {
                                // setLoadMsg(null);
                                if (
                                    Object.prototype.toString.call(data) ===
                                    '[object Blob]'
                                )
                                    download(data, getTitle('未命名') + '.pdf');
                                else {
                                  progressRef.current.onClose();
                                  handleDialogError(data?.message);
                                }
                            })
                            .catch((data) => {
                                progressRef.current.onClose();
                                handleDialogError(data?.message);
                            });
                        setTimeout(() => {
                            getExportPdfProgressStream(fileId);
                        }, 200);
                    }}
                >
                    导出到pdf
                </Button>
                {isPrint ? (
                    <Button
                        type='info'
                        style={{ height: 26 }}
                        onClick={() => {
                            data.report && data.report.print();
                        }}
                    >
                        打印
                    </Button>
                ) : null}
            </Toolbar> */}
      <ExcelWrap>
        {data.pageError ? (
          <ErrorPage
            message={data.pageError.title}
            detail={data.pageError.detail}
          ></ErrorPage>
        ) : (
          <ExcelHost ref={ref}></ExcelHost>
        )}
      </ExcelWrap>
    </Wrap>
  );
}

window.tooneReport = {
  //导出Excel
  exportExcel: function (filename) {
    if (typeof _report?.exportExcel === 'function') {
      _report.exportExcel(filename);
    }
  },
  //导出PDF
  exportPdf: function (filename) {
    if (typeof _report?.exportPdf === 'function') {
      progressRef.current.setProgress(0, '导出中，请稍候...');
      progressRef.current.onShow();
      const sheets = _report.spread.toJSON().sheets;
      const fontFamaly = new Set();
      // 获取单元格样式字体
      for (let sheet of Object.values(sheets)) {
        const dataTable = sheet?.data?.dataTable ?? {};
        for (let cell of Object.values(dataTable)) {
          for (let cellStyle of Object.values(cell)) {
            const style = cellStyle?.style ?? {};
            fontFamaly.add(style.fontFamily ?? 'Calibri');
          }
        }
        // 获取内置样式字体
        const namedStyles = sheet.namedStyles ?? [];
        for (let namedStyle of namedStyles) {
          fontFamaly.add(namedStyle.fontFamily ?? 'Calibri');
        }
      }

      // const res = await request('queryAvailableFonts')
      // const fonts = res?.data?.fonts || [];

      // 注册字体...
      const requestFontFamily = [...fontFamaly].map((item) =>
        registerFont(item, 'normal')
      );
      Promise.all(requestFontFamily).then(() => {
        const exportReportPromise = [];
        _report
          .exportPdf(filename, {
            persistence: false,
            author: '',
            creator: '',
            keywords: '',
            subject: '',
            title: '',
            sheetIndex: null,
            exportPdfHandler: ({ blob, total, index }) => {
              exportReportPromise.push(
                new Promise(async (resolve) => {
                  const percent = Math.floor((index / total) * 100);
                  progressRef.current.setProgress(percent, '导出中，请稍候...');
                  resolve(blob);
                })
              );
            },
          })
          .then(() => {
            // finished
            Promise.all(exportReportPromise).then(async (blobs) => {
              setTimeout(() => {
                progressRef.current.onClose();
              }, 500);
              const mergedPdf = await PDFDocument.create();
              for (const blob of blobs) {
                const pdfBytes = await blob.arrayBuffer();
                const pdfDoc = await PDFDocument.load(pdfBytes);
                const copiedPages = await mergedPdf.copyPages(
                  pdfDoc,
                  pdfDoc.getPageIndices()
                );
                copiedPages.forEach((page) => mergedPdf.addPage(page));
              }

              // 将合并的PDF文档序列化为字节
              const mergedPdfBytes = await mergedPdf.save();
              const mergedPdfBlob = new Blob([mergedPdfBytes], {
                type: 'application/pdf',
              });
              download(mergedPdfBlob, filename);
            });
          });
      });
    }
  },
  //打印
  print: function () {
    if (typeof _report?.print === 'function') {
      _report.print();
    }
  },
  //下一页
  nextPage: function () {
    if (typeof _report?.nextPage === 'function') {
      _report.nextPage();
    }
  },
  //上一页
  previousPage: function () {
    if (typeof _report?.previousPage === 'function') {
      _report.previousPage();
    }
  },
  //跳转指定页码
  specifyPage: function (index) {
    if (typeof _report?.specifyPage === 'function') {
      _report.specifyPage(index);
    }
  },
  getReport: function () {
    return _report;
  },
};
