import {
  useEffect,
  useRef,
  useState,
} from 'react';

import JSZip from 'JSZip';
import resourceManager from 'resource-manager-js';
import styled from 'styled-components';

import {
  Button,
  Dialog,
} from '@toone/report-ui';

import ExcelEnhancer from './utils/ExcelEnhancer';
import { download } from './utils/fileUtil';
import {
  getNamespace,
  getPluginSrc,
} from './utils/spreadUtil';
import WorkbookItem from './WorkbookItem';

const Wrap = styled.div`
    background-color: #ffffff;
    width: 100%;
    height: 100%;
    border-top: 1px solid #ddd;
    box-sizing: border-box;
    user-select: none;
    font-size: 14px;
    padding: 10px;
    display: flex;
    gap: 10px;
    flex-direction: column;
`;

const PageInfosWrap = styled.div`
    display: flex;
    height: 32px;
    align-items: center;
    & .info {
        border-bottom: 1px solid #ddd;
        padding: 0 10px;
        min-width: 30px;
    }
`;

const Label = styled.span`
    width: 90px;
`;

const Input = styled.input`
    border: 1px solid #ddd;
    border-radius: 4px;
    padding: 3px 4px;
    &:focus {
        outline: none;
    }
`;

const Printed = styled.span`
    margin-left: 10px;
    border: 1px solid #ddd;
    padding: 3px 6px;
    border-radius: 4px;
    background-color: green;
    color: #fff;
    font-size: 12px;
`;

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

export default function (props) {
    const { onInited, license, enablePrint, dataSource, json, inst } = props;
    const datas = useRef({
        pageIndex: 1,
        total: 11,
        oldValue: null,
        start: 1,
        printTotal: 20,
        surplusTotal: 88,
        spread: null,
        printIndex: 1,
        printHandler: null,
    }).current;

    if (inst) {
        const { activeSheetName, sheetPages } = inst;
        const pageDatas = sheetPages[activeSheetName];
        datas.pageIndex = pageDatas.pageIndex + 1;
        datas.total = pageDatas.datas.length;
    }

    const [show, setShow] = useState(false);

    const [printInfos, setPrintInfos] = useState({
        start: 1,
        end: datas.total >= 20 ? 20 : datas.total,
        printTotal: 20,
        printed: {},
    });

    const exportExcel = (
        filename,
        options = { ignoreFormula: false, ignoreStyle: false }
    ) => {
        const zip = new JSZip();
        const blobs = [];
        const result = new Promise((_resolve, reject) => {
            if (typeof filename == 'string' && filename.trim() !== '') {
                resourceManager.loadScript(getPluginSrc('excel')).then(() => {
                    const GC = getNamespace();
                    const { activeSheetName, sheetPrintPages } = inst;
                    const pageDatas = sheetPrintPages[activeSheetName];
                    const excelIO = new GC.Spread.Excel.IO();
                    const sheet = datas.spread.getActiveSheet();
                    const datasLen = pageDatas.datas.length;

                    const promiseFns = [];
                    for (let i = 0; i < datasLen; i++) {
                        promiseFns.push(() => {
                            return new Promise((resolve) => {
                                let newfilename = filename + (i + 1) + '.xlsx';
                                const sheetJson = sheet.toJSON();
                                zoomPrint(sheetJson, inst);
                                const newSheet = pageDatas.datas[i];
                                newSheet.sheet = sheetJson;
                                inst.resetSheet(newSheet);
                                sheet.fromJSON(sheetJson);

                                const enhancer = new ExcelEnhancer(
                                    datas.spread
                                );

                                enhancer
                                    .enhance()
                                    .then((result) => {
                                        const json = JSON.stringify(result);
                                        excelIO.save(
                                            json,
                                            (blob) => {
                                                blobs.unshift({
                                                    filename: newfilename,
                                                    blob,
                                                });

                                                if (
                                                    typeof options.progress ===
                                                    'function'
                                                ) {
                                                    let currentIndex =
                                                        (i + 1) * 20;
                                                    const total = currentIndex;
                                                    if (
                                                        currentIndex >=
                                                        datas.total
                                                    ) {
                                                        currentIndex =
                                                            datas.total;
                                                    }
                                                    for (
                                                        let i = total - 20 + 1;
                                                        i <= currentIndex;
                                                        i++
                                                    ) {
                                                        options.progress(
                                                            i,
                                                            datas.total
                                                        );
                                                    }
                                                }

                                                if (
                                                    blobs.length ===
                                                    pageDatas.datas.length
                                                ) {
                                                    _resolve();
                                                }
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
                                                includeFormulas:
                                                    !options.ignoreFormula,
                                                includeStyles:
                                                    !options.ignoreStyle,
                                                includeUnusedNames: true,
                                                password: undefined,
                                                rowHeadersAsFrozenColumns: false,
                                                saveAsView: false,
                                            }
                                        );
                                    })
                                    .catch(reject);
                            });
                        });
                    }
                    promiseFns.reduce((prev, cur) => {
                        return prev.then((a) => {
                            return cur().then(() => {});
                        });
                    }, Promise.resolve());
                });
            } else {
                reject(Error('导出excel失败，原因:没有传递导出文件名'));
            }
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
        });
        return result;
    };
    window.exportExcel = exportExcel;
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

                const { activeSheetName, sheetPrintPages } = inst;
                const pageDatas = sheetPrintPages[activeSheetName];
                const sheet = datas.spread.getActiveSheet();
                const datasLen = pageDatas.datas.length;

                const promiseFns = [];
                for (let i = 0; i < datasLen; i++) {
                    promiseFns.push(() => {
                        return new Promise((resolve, reject) => {
                            const sheetJson = sheet.toJSON();
                            zoomPrint(sheetJson, inst);
                            const newSheet = pageDatas.datas[i];
                            newSheet.sheet = sheetJson;
                            inst.resetSheet(newSheet);
                            sheet.fromJSON(sheetJson);
                            const enhancer = new ExcelEnhancer(datas.spread);
                            enhancer
                                .enhance()
                                .then((result) => {
                                    datas.spread.savePDF(
                                        (data) => {
                                            if (persistence) {
                                                download(data, filename);
                                            }
                                            if (
                                                typeof exportPdfHandler ===
                                                'function'
                                            ) {
                                                exportPdfHandler({
                                                    total: datasLen,
                                                    blob: data,
                                                    index: i + 1,
                                                });
                                            }
                                            resolve();
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
                                        sheetIndex == null
                                            ? undefined
                                            : sheetIndex
                                    );
                                })
                                .catch(reject);
                        });
                    });
                }
                promiseFns.push(() => {
                    return new Promise(() => {
                        _resolve(true);
                    });
                });
                promiseFns.reduce((prev, cur) => {
                    return prev.then((a) => {
                        return cur().then(() => {});
                    });
                }, Promise.resolve());
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
        });
    };
    window.exportPDF = exportPDF;
    useEffect(() => {
        if (typeof onInited === 'function') {
            onInited({
                show() {
                    setShow(true);
                },
                hide() {
                    setShow(false);
                },
                exportExcel,
                exportPDF,
            });
        }
    });

    const onChangeHandler = (e, type) => {
        if (printInfos[type]) {
            datas.oldValue = printInfos[type];
        }
        let newValue = Number(e.target.value);
        if (!Number.isInteger(newValue)) {
            newValue = datas.oldValue;
        }
        if (newValue > datas.total) {
            newValue = datas.oldValue;
        }
        if (newValue <= 0) {
            newValue = '';
        }
        setPrintInfos({ ...printInfos, [type]: newValue });
    };

    const onBlurHandler = (e, type) => {
        if (!e.target.value) {
            setPrintInfos({
                ...printInfos,
                [type]: datas.oldValue || datas[type],
            });
        }
    };

    const handlePrint = () => {
        if (datas.printHandler) {
            const sheet = datas.spread.getActiveSheet();
            const sheetJson = sheet.toJSON();
            const sheetPage = inst.sheetPrintPages[sheetJson.name];
            const newPageIndex = datas.printIndex - 1;
            zoomPrint(sheetJson, inst);
            if (newPageIndex < sheetPage.datas.length) {
                sheetPage.pageIndex = newPageIndex;
                const newSheet = sheetPage.datas[newPageIndex];
                newSheet.sheet = sheetJson;
                inst.resetSheet(newSheet);
                sheet.fromJSON(sheetJson);
            }
            console.log(sheet.toJSON());
            setPrintInfos({
                ...printInfos,
                printed: {
                    ...printInfos.printed,
                    [datas.printIndex]: true,
                },
            });
            datas.printHandler().then((spread) => {
                spread.print();
            });
        }
    };

    const Excel = (
        <div style={{ display: 'none' }}>
            <WorkbookItem
                json={json}
                dataSource={dataSource}
                license={license}
                onInited={(spread) => {
                    datas.spread = spread;
                }}
                onPrintHandler={(handler) => {
                    datas.printHandler = handler;
                }}
                enablePrint={enablePrint}
                inst={inst}
            ></WorkbookItem>
        </div>
    );

    if (!show) {
        return Excel;
    }

    return (
        <>
            <Dialog
                width='550px'
                height='250px'
                onClose={() => {
                    setShow(false);
                }}
            >
                <Wrap>
                    {Excel}
                    <PageInfosWrap>
                        <Label>总页数</Label>：
                        <span className='info'>{datas.total}</span>
                    </PageInfosWrap>
                    <PageInfosWrap>
                        <Label>打印范围</Label>：
                        <span className='info'>
                            第 {printInfos.start} 页 至 第 {printInfos.end} 页
                        </span>
                        {printInfos.printed[datas.printIndex] && (
                            <Printed>已打印</Printed>
                        )}
                        <Button
                            style={{
                                marginLeft: 'auto',
                                marginRight: '5px',
                                minWidth: '60px',
                            }}
                            onClick={() => {
                                if (printInfos.start <= 1) {
                                    return;
                                }
                                datas.printIndex -= 1;
                                let end = printInfos.end;
                                let remainder = datas.total % 20;

                                if (end >= datas.total && remainder > 0) {
                                    end -= remainder;
                                } else {
                                    end -= 20;
                                }
                                setPrintInfos({
                                    ...printInfos,
                                    start: printInfos.start - 20,
                                    end,
                                });
                            }}
                        >
                            上一批
                        </Button>
                        <Button
                            style={{ minWidth: '60px' }}
                            onClick={() => {
                                if (printInfos.end >= datas.total) {
                                    return;
                                }

                                datas.printIndex += 1;
                                let end = printInfos.end + 20;
                                if (end >= datas.total) {
                                    end = datas.total;
                                }
                                setPrintInfos({
                                    ...printInfos,
                                    start: printInfos.start + 20,
                                    end,
                                });
                            }}
                        >
                            下一批
                        </Button>
                    </PageInfosWrap>
                    <PageInfosWrap>
                        <Label>每次打印页数</Label>：
                        <span className='info'>{printInfos.printTotal}</span>
                    </PageInfosWrap>
                    <PageInfosWrap
                        style={{
                            justifyContent: 'end',
                        }}
                    >
                        <Button
                            style={{ minWidth: '60px' }}
                            onClick={() => {
                                handlePrint();
                            }}
                            type='primary'
                        >
                            打印
                        </Button>
                    </PageInfosWrap>
                </Wrap>
            </Dialog>
        </>
    );
}
