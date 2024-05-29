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
  download,
  exportPdf,
  getParameter,
  getTitle,
} from '../utils/utils';
import Button from './components/button/Index';
import Error from './components/error/Index';
import WaitMsg from './components/loading/Index';

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
    flex-shrink: 0;
    &:empty {
        display: none;
    }
`;

const ExcelWrap = styled.div`
    display: flex;
    height: calc(100% - 36px);
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

const Fill = styled.div`
    width: 100%;
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

    const page = useRef({
        pageCompletedHandler: null,
        setPageInfos: null,
    });

    const [data, setData] = useState({
        loadMsg: '初始化中，请稍候...',
        errorMsg: null,
        report: null,
    });
    const handleError = (err) => {
        setData({
            ...data,
            loadMsg: null,
            errorMsg: typeof err == 'string' ? err : err.message,
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
                            handleError,
                            '获取报表配置失败！'
                        )
                    ) {
                        let excelJson = null;
                        try {
                            excelJson = JSON.parse(getData(config.data, 'config'));
                        } catch (e) {}
                        const initReport = (excelJson, datas) => {
                            const report = new TOONE.Report.Preview({
                                license,
                                enablePrint: isPrint,
                                dataSource: datas,
                                json: excelJson,
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
                                    .catch(handleError);
                            };
                        };
                        if (excelJson) {
                            const usedDatasources =
                                excelJson.usedDatasources || [];
                            if (usedDatasources && usedDatasources.length > 0) {
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
                                                handleError,
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
                                        genResponseErrorCallback(handleError)
                                    );
                            } else {
                                initReport(excelJson, {});
                            }
                        } else {
                            initReport();
                        }
                    }
                })
                .catch(genResponseErrorCallback(handleError));
        }
    }, []);
    return (
        <Wrap>
            {data.loadMsg != null ? (
                <WaitMsg title={data.loadMsg}></WaitMsg>
            ) : null}
            {data.errorMsg != null ? (
                <Error
                    message={data.errorMsg}
                    onClose={() =>
                        setData({ ...data, loadMsg: null, errorMsg: null })
                    }
                ></Error>
            ) : null}
            <Toolbar>
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
                        setLoadMsg('导出到excel中，请稍候...');
                        data.report
                            .exportExcel(getTitle('未命名'))
                            .then(() => {
                                setLoadMsg(null);
                            })
                            .catch(handleError);
                    }}
                >
                    导出到excel
                </Button>
                <Button
                    type='info'
                    style={{ height: 26 }}
                    // disabled={!data.report}
                    onClick={() => {
                        if (!data.report) return;
                        setLoadMsg('导出到pdf中，请稍候...');
                        exportPdf()
                            .then((data) => {
                                setLoadMsg(null);
                                if (
                                    Object.prototype.toString.call(data) ===
                                    '[object Blob]'
                                )
                                    download(data, getTitle('未命名') + '.pdf');
                                else handleError(data.message);
                            })
                            .catch(handleError);
                    }}
                >
                    导出到pdf
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
            </Toolbar>
            <ExcelWrap>
                <ExcelHost ref={ref}></ExcelHost>
            </ExcelWrap>
        </Wrap>
    );
}
