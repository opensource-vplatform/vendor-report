import {
  useEffect,
  useRef,
  useState,
} from 'react';

import resourceManager from 'resource-manager-js';
import styled from 'styled-components';

import Select from './component/form/Select';
import Page from './component/page/Index';
import {
  EVENTS,
  fire,
} from './event/EventManager';
import AddIcon from './icons/shape/Add';
import LicenseError from './LicenseError';
import LicenseWarn from './LicenseWarn';
import { withDivStyled } from './utils/componentUtil';
import { setBaseUrl } from './utils/environmentUtil';
import {
  checkLicense,
  getLicense,
  setLicense,
} from './utils/licenseUtil';
import {
  genAutoMergeRangeInfos,
  genSpans,
  sortData,
} from './utils/other';
import { setPrintInfo } from './utils/printUtil';
import {
  getNamespace,
  getPluginSrc,
  withBatchCalcUpdate,
  zoom,
  zoomIn,
  zoomOut,
} from './utils/spreadUtil';

const zoomOptions = [
    {
        value: 'actualSize',
        text: '实际大小',
    },
    { value: 'suitableToPage', text: '适合页面' },
    { value: 'suitableToPageWidth', text: '适合页宽' },
    { value: '0.5', text: '50%' },
    { value: '0.75', text: '75%' },
    { value: '1', text: '100%' },
    { value: '1.25', text: '125%' },
    { value: '1.50', text: '150%' },
    { value: '2.00', text: '200%' },
    { value: '3.00', text: '300%' },
    { value: '4.00', text: '400%' },
];

const GC = getNamespace();
const GCsheets = GC.Spread.Sheets;
const Wrap = withDivStyled({
    position: 'relative',
    width: '100%',
    height: '100%',
    overflow: 'visible',
    userSelect: 'none',
    display: 'flex',
    flexDirection: 'column',
});

const Toolbar = styled.div`
    border-bottom: solid 1px lightgray;
    background-color: white;
    margin: 0px;
    padding: 0px;
    display: flex;
    height: 35px;
    flex-shrink: 0;
    justify-content: flex-end;
    align-items: center;
`;

const ToolbarRight = styled.div`
    position: absolute;
    width: max-content;
    right: 0;
    display: flex;
    justify-content: end;
    height: 22px;
    gap: 8px;
    padding-right: 8px;
`;

const ZoomWrap = styled.div`
    display: flex;
    width: 100%;
    justify-content: center;
    align-items: center;
    gap: 4px;
`;

const ZoomOut = styled.div`
    width: 24px;
    height: 24px;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    &:hover {
        background-color: #dadada;
    }
`;
const ZoomOutIcon = styled.div`
    width: 10px;
    border: 1px solid #333;
    border-radius: 10px;
`;

const bindEvent = function (spread, typeName, handler) {
    if (handler) {
        const GC = getNamespace();
        const type = GC.Spread.Sheets.Events[typeName];
        spread.bind(type, handler);
    }
};

const bindEvents = function (spread, events) {
    if (spread && events) {
        for (let [event, handler] of Object.entries(events)) {
            bindEvent(spread, event, handler);
        }
    }
};

//表格合并
const tableMerge = function (params) {
    const { sheet, rowMerge, columnMerge } = params;
    const tables = sheet.tables.all();
    if (tables.length > 0 && (rowMerge || columnMerge)) {
        let direction = GCsheets.AutoMerge.AutoMergeDirection.column; //1
        let mode = GCsheets.AutoMerge.AutoMergeMode.free; //0
        let sheetArea = GCsheets.SheetArea.viewport; //3
        let selectionMode = GCsheets.AutoMerge.SelectionMode.merged; //0
        if (rowMerge && columnMerge) {
            direction = GCsheets.AutoMerge.AutoMergeDirection.rowColumn; //值等于4。在行方向上优先于列方向应用自动合并
        } else if (rowMerge) {
            direction = GCsheets.AutoMerge.AutoMergeDirection.row; //值等于2.在行方向上应用自动合并
        }

        sheet.suspendPaint();
        tables.forEach(function (table) {
            const range = table.range();
            sheet.autoMerge(range, direction, mode, sheetArea, selectionMode);
        });
        sheet.resumePaint();
    }
};

//绑定数据源
const bindDataSource = function (params) {
    const {
        spread,
        dataSource,
        sumColumns,
        groupColumns,
        rowMerge,
        columnMerge,
        rowMergeColumns = {},
        colMergeColumns = {},
    } = params;

    if (!spread) {
        return;
    }
    spread.sheets.forEach((sheet) => {
        const _dataSource = JSON.parse(JSON.stringify(dataSource));
        const tables = sheet.tables.all();
        const tablesSpans = [];
        let autoMergeRangeInfos = [];
        let source = null;
        if (_dataSource) {
            source = new GCsheets.Bindings.CellBindingSource(_dataSource);
            sheet.setDataSource(source);
        }
        //对数据进行分组排序
        if (tables.length > 0) {
            tables.forEach((table) => {
                const tableName = table.name();
                const groups = groupColumns[tableName];
                const sums = sumColumns[tableName];

                const rowMergeCol = rowMergeColumns[tableName] || [];
                const colMergeCol = colMergeColumns[tableName] || [];

                if (
                    (Array.isArray(groups) && groups.length > 0) ||
                    (Array.isArray(sums) && sums.length > 0)
                ) {
                    const path = table.bindingPath();
                    const { row, col } = table.range();
                    const fields = [];
                    table.BSt.forEach(function (item) {
                        fields.push({ code: item.dataField() });
                    });
                    if (_dataSource?.[path]) {
                        const { datas, spansTree } = sortData(
                            _dataSource[path],
                            groups,
                            fields,
                            sums
                        );
                        _dataSource[path] = datas;
                        const result = genSpans(spansTree, row + 1, col);
                        tablesSpans.push(...result.spans);
                    }
                }

                if (rowMergeCol.length > 0 || colMergeCol > 0) {
                    const _field = table.BSt.map(function (bst) {
                        return {
                            id: bst.id(),
                            code: bst.dataField(),
                            name: bst.name(),
                        };
                    });
                    const { row, rowCount } = table.range();

                    const res = genAutoMergeRangeInfos({
                        rowMergeColumns: rowMergeCol,
                        colMergeColumns: colMergeCol,
                        tableColumns: _field,
                        row: row + 1,
                        rowCount,
                    });
                    autoMergeRangeInfos.push(...res);
                }
            });
        }

        const json = sheet.toJSON();
        json.spans = Array.isArray(json.spans) ? json.spans : [];
        json.spans.push(...tablesSpans);
        json.autoMergeRangeInfos = autoMergeRangeInfos;
        sheet.fromJSON(json);
        //执行sheet.fromJSON(json);后数据源丢失，需要再次设置数据源
        source && sheet.setDataSource(source);
        tableMerge({
            sheet,
            rowMerge,
            columnMerge,
        });
    });
};

function Zoom(props) {
    const {
        zoomOptions,
        defaultZoom = 'suitableToPageWidth',
        el,
        data,
    } = props;
    const [value, setValue] = useState(defaultZoom);
    return (
        <ZoomWrap>
            <ZoomOut
                onClick={function () {
                    const res = zoomOut(data.spread);
                    setValue(res);
                }}
            >
                <ZoomOutIcon></ZoomOutIcon>
            </ZoomOut>

            <div
                onClick={function () {
                    const res = zoomIn(data.spread);
                    setValue(res);
                }}
            >
                <AddIcon></AddIcon>
            </div>
            <Select
                datas={zoomOptions}
                onChange={function (value) {
                    setValue(value);
                    zoom({
                        el,
                        value: value,
                        spread: data.spread,
                    });
                }}
                style={{
                    minWidth: 100,
                    width: 102,
                    height: 22,
                    /*  borderRadius: 4, */
                }}
                value={value}
                text={`${value}%`}
            ></Select>
        </ZoomWrap>
    );
}

export default function (props) {
    const {
        newTabVisible = true,
        tabEditable = true,
        tabStripVisible = true,
        onInited,
        onEnterCell,
        onActiveSheetChanged: _onActiveSheetChanged,
        onValueChanged,
        onSelectionChanged,
        onSelectionChanging,
        onEditorStatusChanged,
        onSheetNameChanged,
        onSheetNameChanging,
        onActiveSheetChanging,
        onPageCompleted,
        onSheetChanged,
        onFetchData,
        onRowChanged,
        onUndo,
        onRedo,
        license,
        enablePrint = false,
        json = null,
        onPrintHandler,
        children,
        baseUrl,
        dataSource = null,
        sumColumns = [],
        groupColumns = [],
        rowMerge = false,
        columnMerge = false,
        rowMergeColumns = {},
        colMergeColumns = {},
        onColumnWidthChanged,
        onRowHeightChanged,
        onLeftColumnChanged,
        onTopRowChanged,
        onViewZoomed,
        inst,
        isShowToolbar = true,
        toolbar,
    } = props;
    if (license) {
        setLicense(license);
    }
    if (baseUrl) {
        setBaseUrl(baseUrl);
    }
    const GC = getNamespace();

    const licenseKey = getLicense();
    if (licenseKey) {
        GC.Spread.Sheets.LicenseKey = licenseKey;
    }
    const [data] = useState(() => {
        const result = checkLicense();
        let showError = false,
            showWarn = false;
        if (!result.success) {
            showError = result.showError;
            showWarn = result.showWarn;
        }
        return {
            spread: null,
            showError: showError,
            showWarn: showWarn,
            pageInfo: inst,
            setPageInfos: null,
        };
    });

    const el = useRef(null);

    const onActiveSheetChanged = (type, args) => {
        _onActiveSheetChanged && _onActiveSheetChanged(type, args);
        handlePage();
    };

    const initSpread = async () => {
        if (enablePrint) {
            const plugins = getPluginSrc('print');
            await resourceManager.loadScript(plugins);
        }
        if (!data.spread && el.current && !el.showError) {
            const GC = getNamespace();
            const spread = new GC.Spread.Sheets.Workbook(el.current, {
                sheetCount: 0,
                newTabVisible,
                tabEditable,
                tabStripVisible,
            });
            data.spread = spread;
            fire({
                event: EVENTS.OnSpreadInited,
                args: [spread],
            });
            return true;
        }
        return false;
    };
    //处理事件绑定
    const handleEvents = () => {
        if (!data.spread) return;
        const spread = data.spread;
        spread.unbindAll();
        bindEvents(spread, {
            EnterCell: onEnterCell,
            ActiveSheetChanged: onActiveSheetChanged,
            ValueChanged: onValueChanged,
            ActiveSheetChanging: onActiveSheetChanging,
            SheetNameChanged: onSheetNameChanged,
            SheetNameChanging: onSheetNameChanging,
            SelectionChanged: onSelectionChanged,
            SelectionChanging: onSelectionChanging,
            EditorStatusChanged: onEditorStatusChanged,
            WorkbookUndo: onUndo,
            WorkbookRedo: onRedo,
            RowChanged: onRowChanged,
            SheetChanged: onSheetChanged,
            ColumnWidthChanged: onColumnWidthChanged,
            RowHeightChanged: onRowHeightChanged,
            LeftColumnChanged: onLeftColumnChanged,
            TopRowChanged: onTopRowChanged,
            ViewZoomed: onViewZoomed,
        });
    };
    //处理工作表生成，优先使用json
    const handleSheets = (json) => {
        if (!data.spread) return;
        const spread = data.spread;
        if (json) {
            withBatchCalcUpdate(spread, () => {
                spread.fromJSON(json);
                fire({
                    event: EVENTS.OnSpreadJsonParsed,
                    args: [spread],
                });
                const sheets = spread.sheets;
                if (sheets && sheets.length > 0) {
                    sheets.forEach((sheet) => {
                        fire({
                            event: EVENTS.OnSheetInited,
                            args: [sheet],
                        });
                        onSheetChanged &&
                            onSheetChanged('SheetChanged', { sheet });
                    });
                }
            });
        } else {
            //不存在json数据时才根据子组件创建工作表
            withBatchCalcUpdate(spread, () => {
                let sheetList;
                if (children) {
                    sheetList = Array.isArray(children) ? children : [children];
                } else {
                    sheetList = [];
                }
                spread.clearSheets();
                const GC = getNamespace();
                sheetList.forEach((sheet, index) => {
                    const {
                        name = `Sheet${index + 1}`,
                        rowCount = 20,
                        colCount = 20,
                    } = sheet.props;
                    const workSheet = new GC.Spread.Sheets.Worksheet(name);
                    workSheet.setRowCount(rowCount);
                    workSheet.setColumnCount(colCount);
                    spread.addSheet(index, workSheet);
                    fire({
                        event: EVENTS.OnSheetInited,
                        args: [workSheet],
                    });
                    onSheetChanged &&
                        onSheetChanged('SheetChanged', { sheet: workSheet });
                });
            });
        }
    };
    //处理数据
    const handleDatas = () => {
        if (!data.spread) return;
        const spread = data.spread;
        if (dataSource) {
            bindDataSource({
                spread: spread,
                dataSource,
                sumColumns,
                groupColumns,
                rowMerge,
                columnMerge,
                rowMergeColumns,
                colMergeColumns,
            });
        }
    };

    const handlePrint = () => {
        if (!data.spread) return;
        const spread = data.spread;
        if (onPrintHandler) {
            onPrintHandler((params) => {
                return new Promise((resolve, reject) => {
                    if (spread) {
                        if (enablePrint) {
                            const sheets = spread.sheets;
                            sheets.forEach((sheet) => {
                                setPrintInfo(sheet, params || {});
                            });
                            resolve(spread);
                        } else {
                            reject(
                                Error(
                                    '打印失败，原因：初始化报表时未开启打印功能'
                                )
                            );
                        }
                    } else {
                        reject(Error('打印失败，原因：报表未初始化'));
                    }
                });
            });
        }
    };

    const handlePage = () => {
        const inst = data.pageInfo;
        const changePageIndex = (pageIndex = 1) => {
            let newIndex = Number.parseInt(Number(pageIndex));
            const sheet = data.spread.getActiveSheet();
            const sheetJson = sheet.toJSON();
            sheet.setRowCount(0);
            const sheetPage = inst.sheetPages[sheetJson.name];

            if (newIndex <= 1) {
                newIndex = 1;
            }

            if (newIndex >= sheetPage.datas.length) {
                newIndex = sheetPage.datas.length;
            }

            sheetPage.pageIndex = newIndex - 1;

            const newSheet = sheetPage.datas[sheetPage.pageIndex];
            newSheet.sheet = sheetJson;
            inst.resetSheet(newSheet);
            sheet.fromJSON(sheetJson);
        };
        const nextPage = () => {
            return new Promise((resolve) => {
                const sheet = data.spread.getActiveSheet();
                const sheetJson = sheet.toJSON();
                const sheetPage = inst.sheetPages[sheetJson.name];
                const newPageIndex = sheetPage.pageIndex + 1;
                if (newPageIndex < sheetPage.datas.length) {
                    sheetPage.pageIndex = newPageIndex;
                    const newSheet = sheetPage.datas[newPageIndex];
                    newSheet.sheet = sheetJson;
                    inst.resetSheet(newSheet);
                    sheet.setRowCount(0);
                    sheet.fromJSON(sheetJson);
                }
                resolve({
                    value: newPageIndex + 1,
                    done:
                        newPageIndex + 1 >= sheetPage.datas.length
                            ? true
                            : false,
                });
            });
        };

        if (onPageCompleted) {
            onPageCompleted((params) => {
                return new Promise((resolve, reject) => {
                    const sheet = data.spread.getActiveSheet();
                    if (sheet) {
                        const sheetJson = sheet.toJSON();
                        const sheetPage = inst.sheetPages[sheetJson.name];

                        resolve({
                            changePageIndex,
                            nextPage,
                            isPage: sheetPage?.isPage,
                            pageIndex: (sheetPage?.pageIndex || 0) + 1,
                            total: sheetPage?.datas?.length || 1,
                        });
                    }
                });
            });
        }

        const sheet = data.spread.getActiveSheet();
        if (sheet && inst) {
            const sheetJson = sheet.toJSON();
            const sheetPage = inst.sheetPages[sheetJson.name];

            data.pageOpt = {
                changePageIndex,
                nextPage,
                isPage: sheetPage?.isPage,
                pageIndex: (sheetPage?.pageIndex || 0) + 1,
                total: sheetPage?.datas?.length || 1,
            };
            if (data.setPageInfos) {
                data.setPageInfos(data.pageOpt);
            }
        }
    };

    useEffect(() => {
        (async () => {
            const inited = await initSpread();
            if (inited) {
                /**
                 * 处理事件绑定必须在第一次spread初始才做，
                 * 否则导致设计器编辑栏在初始化时注册的事件被清空
                 */
                handleEvents();
                handleSheets(json);
                handleDatas();
                handlePrint();
                handlePage();
                if (onInited) {
                    const promise = onInited(data.spread, {
                        zoom(value) {
                            zoom({ el, value, spread: data.spread });
                        },
                        zoomOptions: {
                            suitableToPage: 'suitableToPage',
                            suitableToPageWidth: 'suitableToPageWidth',
                            actualSize: 'actualSize',
                        },
                    });
                    dataSource &&
                        zoom({
                            el,
                            value: 'suitableToPageWidth',
                            spread: data.spread,
                        });
                    if (promise && promise.then) {
                        promise.then((json) => {
                            handleSheets(json);
                        });
                    }
                }
            }
        })();
    }, [
        json,
        dataSource,
        onEnterCell,
        onActiveSheetChanged,
        onValueChanged,
        onActiveSheetChanging,
        onSheetNameChanged,
        onSheetNameChanging,
        onSelectionChanged,
        onSelectionChanging,
        onEditorStatusChanged,
        onUndo,
        onRedo,
    ]);

    return (
        <Wrap>
            {isShowToolbar && (
                <Toolbar>
                    <Zoom zoomOptions={zoomOptions} el={el} data={data}></Zoom>
                    <ToolbarRight>
                        <Page
                            onInited={(datas) => {
                                data.setPageInfos = datas.setPageInfos;
                                if (data.spread && data.pageOpt) {
                                    data.setPageInfos(data.pageOpt);
                                }
                            }}
                        ></Page>
                        {toolbar}
                    </ToolbarRight>
                </Toolbar>
            )}
            {data.showError ? (
                <LicenseError></LicenseError>
            ) : (
                <div
                    style={{
                        width: '100%',
                        height: '100%',
                        overflow: 'visible',
                        userSelect: 'none',
                        flex: 1,
                        padding: '8px',
                        boxSizing: 'border-box',
                    }}
                    ref={el}
                ></div>
            )}
            {!data.showError && data.showWarn ? (
                <LicenseWarn></LicenseWarn>
            ) : null}
        </Wrap>
    );
}
