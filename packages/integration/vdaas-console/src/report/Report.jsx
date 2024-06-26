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
import { license } from '../utils/license';
import {
  genResponseErrorCallback,
  getData,
  handleError as handleErrorUtil,
} from '../utils/responseUtil';
import {
  getParameter,
  getTitle,
} from '../utils/utils';
import Button from './components/button/Index';
import {
  ErrorDialog,
  ErrorPage,
} from './components/error/Index';
import WaitMsg from './components/loading/Index';
import Progress from './components/progress';

const Wrap = styled.div`
    display: flex;
    flex-direction: column;
    flex-grow: 0;
    flex-shrink: 0;
    width: 100%;
    height: 100%;
`;

const Toolbar = styled.div`
    height: 36px;
    min-height: 36px;
    width: 100%;
    display: flex;
    padding-left: 8px;
    padding-right: 8px;
    gap: 8px;
    box-sizing: border-box;
    align-items: center;
    &:empty {
        display: none;
    }
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
`;

const Fill = styled.div`
    width: 100%;
`;

export default function () {
    const ref = useRef(null);
    const page = useRef({
        pageCompletedHandler: null,
        setPageInfos: null,
    });

    const progressRef = useRef(null);

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
            pageError: null,
            errorMsg: typeof err == 'string' ? err : err.message,
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

    const toolbar = (
        <>
            <Button
                type='primary'
                style={{ height: 26, width: 110 }}
                onClick={() => {
                    const title = '导出中，请稍候...';
                    progressRef.current.setProgress(1, title);
                    progressRef.current.onShow();
                    data.report
                        .exportExcel(getTitle('未命名'), {
                            progress(current, total = 1) {
                                const percent = Math.floor(
                                    (current / total) * 100
                                );
                                progressRef.current.setProgress(percent, title);
                            },
                        })
                        .then(() => {
                            progressRef.current.setProgress(100, '导出完成');
                            progressRef.current.onClose();
                        })
                        .catch(handleDialogError);
                }}
            >
                导出到excel
            </Button>

            {isPrint ? (
                <Button
                    type='primary'
                    style={{ height: 26 }}
                    onClick={() => {
                        data.report && data.report.print();
                    }}
                >
                    打印
                </Button>
            ) : null}
        </>
    );

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
                                license,
                                localLicenseUnCheck:true,
                                baseUrl: '../',
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
                                toolbar,
                            });
                            //报表挂载到指定dom元素
                            report.mount(ref.current);
                            data.report = report;
                            setData({ ...data, loadMsg: null, errorMsg: null });
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
            {data.errorMsg != null ? (
                <ErrorDialog
                    message={data.errorMsg}
                    onClose={() =>
                        setData({ ...data, loadMsg: null, errorMsg: null })
                    }
                ></ErrorDialog>
            ) : null}
            <Progress ref={progressRef}></Progress>
            {/*  <Toolbar>
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
                    disabled={!data.report}
                    onClick={() => {
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

                {isPrint ? (
                    <Button
                        type='primary'
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
