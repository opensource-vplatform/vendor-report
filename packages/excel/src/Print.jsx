import {
  useEffect,
  useRef,
  useState,
} from 'react';

import JSZip from 'JSZip';
import resourceManager from 'resource-manager-js';
import styled from 'styled-components';

import Dialog from './component/dialog';
import Button from './component/form/Button';
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
        end: 20,
        printTotal: 20,
        printed: {},
    });

    const exportExcel = (
        filename,
        options = { ignoreFormula: false, ignoreStyle: false }
    ) => {
        const zip = new JSZip();
        const blobs = [];
        const result = new Promise((resolve, reject) => {
            if (typeof filename == 'string' && filename.trim() !== '') {
                resourceManager.loadScript(getPluginSrc('excel')).then(() => {
                    const GC = getNamespace();
                    const { activeSheetName, sheetPrintPages } = inst;
                    const pageDatas = sheetPrintPages[activeSheetName];
                    const excelIO = new GC.Spread.Excel.IO();
                    const sheet = datas.spread.getActiveSheet();
                    const sheetJson = sheet.toJSON();
                    const datasLen = pageDatas.datas.length;
                    for (let i = 0; i < datasLen; i++) {
                        let newfilename = filename + (i + 1) + '.xlsx';

                        const newSheet = pageDatas.datas[i];
                        newSheet.sheet = sheetJson;
                        inst.resetSheet(newSheet);
                        sheet.fromJSON(sheetJson);
                        const json = JSON.stringify(datas.spread.toJSON());
                        excelIO.save(
                            json,
                            (blob) => {
                                blobs.unshift({
                                    filename: newfilename,
                                    blob,
                                });

                                if (blobs.length === pageDatas.datas.length) {
                                    resolve();
                                }
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
                    }
                });
            } else {
                reject(Error('导出excel失败，原因:没有传递导出文件名'));
            }
        });
        result.then(() => {
            blobs.forEach(({ filename, blob }) => {
                zip.file(filename, blob, { binary: true });
            });

            zip.generateAsync({ type: 'blob' }).then(function (content) {
                download(content, `${filename}.zip`);
            });
        });
        return result;
    };

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
            if (newPageIndex < sheetPage.datas.length) {
                sheetPage.pageIndex = newPageIndex;
                const newSheet = sheetPage.datas[newPageIndex];
                newSheet.sheet = sheetJson;
                inst.resetSheet(newSheet);
                sheet.fromJSON(sheetJson);
            }

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
