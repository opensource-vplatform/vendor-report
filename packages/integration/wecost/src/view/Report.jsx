import {
  useEffect,
  useRef,
  useState,
} from 'react';

import axios from 'axios';
import styled from 'styled-components';

import {
  getReportConfigUrl,
  getTableDataUrl,
} from '../utils/constant';
import {
  genResponseErrorCallback,
  getData,
  handleError as handleErrorUtil,
} from '../utils/responseUtil';
import {
  getParameter,
  getTitle,
} from '../utils/utils';
import {
  ErrorDialog,
  ErrorPage,
} from './components/error/Index';
import WaitMsg from './components/loading/Index';
import ProgressCircle from './components/progress';

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

export default function () {
    const ref = useRef(null);
    const progressRef = useRef(null);

    const page = useRef({
        pageCompletedHandler: null,
        setPageInfos: null,
    });

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
        if (ref.current) {
            axios
                .get(getReportConfigUrl())
                .then((config) => {
                    if (
                        !handleErrorUtil(
                            config,
                            handlePageError,
                            '获取报表配置失败！'
                        )
                    ) {
                        let excelJson = null;
                        try {
                            excelJson = JSON.parse(
                                getData(config.data, 'config')
                            );
                        } catch (e) {}
                        const initReport = (excelJson, datas) => {
                            const report = new TOONE.Report.Preview({
                                localLicenseUnCheck:true,
                                enablePrint: isPrint,
                                dataSource: datas,
                                json: excelJson,
                                ready:function(workbook){
                                    const sheet = workbook.getActiveSheet();
                                    if(sheet){
                                        sheet.clearSelection();
                                    }
                                },
                                onPageCompleted(handler) {
                                    page.pageCompletedHandler = handler;
                                    if (page.setPageInfos) {
                                        page.pageCompletedHandler().then(
                                            (datas) => {
                                                page.setPageInfos(datas);
                                            }
                                        );
                                    }
                                },
                            });
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
                                    .catch(
                                        genResponseErrorCallback(
                                            handleDialogError
                                        )
                                    );
                            };
                        };
                        if (excelJson) {
                            const previewOnly = getParameter('previewOnly');
                            const usedDatasources =
                                excelJson.usedDatasources || [];
                            if (
                                previewOnly !== 'true' &&
                                usedDatasources &&
                                usedDatasources.length > 0
                            ) {
                                axios
                                    .get(
                                        getTableDataUrl(
                                            usedDatasources.join(',')
                                        )
                                    )
                                    .then((data) => {
                                        if (
                                            !handleErrorUtil(
                                                data,
                                                handlePageError,
                                                '获取数据集数据失败！'
                                            )
                                        ) {
                                            initReport(
                                                excelJson,
                                                getData(data.data, 'data', true)
                                            );
                                        }
                                    })
                                    .catch(
                                        genResponseErrorCallback(
                                            handlePageError
                                        )
                                    );
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
            {data.loadMsg != null ? (
                <WaitMsg title={data.loadMsg}></WaitMsg>
            ) : null}
            {data.dialogError != null ? (
                <ErrorDialog
                    message={data.dialogError.title}
                    detail={data.dialogError.detail}
                    onClose={() =>
                        setData({ ...data, loadMsg: null, dialogError: null })
                    }
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
