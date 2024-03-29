import {
  useEffect,
  useRef,
  useState,
} from 'react';

import resourceManager from 'resource-manager-js';

import { register } from './custom/index';
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
} from './utils/spreadUtil';

const GC = getNamespace();
const GCsheets = GC.Spread.Sheets;
const Wrap = withDivStyled({
    position: 'relative',
    width: '100%',
    height: '100%',
    overflow: 'visible',
    userSelect: 'none',
});

const ExcelWrap = withDivStyled({
    width: '100%',
    height: '100%',
    overflow: 'visible',
    userSelect: 'none',
});

const bindEvent = function (spread, typeName, handler) {
    if (handler) {
        const GC = getNamespace();
        const type = GC.Spread.Sheets.Events[typeName];
        spread.bind(type, handler);
    }
};

const setValue = function (val, fn) {
    if (val !== null && typeof val !== undefined) {
        fn(val);
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
                    debugger;
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

export default function (props) {
    const {
        newTabVisible = true,
        tabEditable = true,
        tabStripVisible = true,
        onInited,
        onEnterCell,
        onActiveSheetChanged,
        onValueChanged,
        onSelectionChanged,
        onSelectionChanging,
        onEditorStatusChanged,
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
        };
    });

    const el = useRef(null);
    useEffect(() => {
        if (el.current && !data.showError) {
            let plugins = [];
            if (enablePrint) {
                plugins = plugins.concat(getPluginSrc('print'));
            }
            const handler = () => {
                let spread = null;
                const unInited = !data.spread;
                if (unInited) {
                    const GC = getNamespace();
                    spread = new GC.Spread.Sheets.Workbook(el.current, {
                        sheetCount: 0,
                        newTabVisible,
                        tabEditable,
                        tabStripVisible,
                    });
                    data.spread = spread;
                } else {
                    spread = data.spread;
                }
                spread.suspendPaint();
                spread.suspendEvent();
                try {
                    if (unInited) {
                        if (json) {
                            withBatchCalcUpdate(spread, () => {
                                spread.fromJSON(json);
                                register(spread);
                                const sheets = spread.sheets;
                                if (sheets && sheets.length > 0) {
                                    sheets.forEach((sheet) => {
                                        sheet.recalcAll(true);
                                    });
                                }
                            });
                        } else {
                            let sheetList;
                            if (children) {
                                sheetList = Array.isArray(children)
                                    ? children
                                    : [children];
                            } else {
                                sheetList = [
                                    /*{ props: { name: 'Sheet1' } }*/
                                ];
                            }
                            sheetList.forEach((sheet, index) => {
                                const {
                                    name = `Sheet${index + 1}`,
                                    rowCount = 20,
                                    colCount = 20,
                                } = sheet.props;
                                const workSheet =
                                    new GC.Spread.Sheets.Worksheet(name);
                                workSheet.setRowCount(rowCount);
                                workSheet.setColumnCount(colCount);
                                spread.addSheet(index, workSheet);
                            });
                            register(spread);
                        }
                        onInited && onInited(spread);
                        bindEvent(spread, 'EnterCell', onEnterCell);
                        bindEvent(
                            spread,
                            'ActiveSheetChanged',
                            onActiveSheetChanged
                        );
                        bindEvent(spread, 'ValueChanged', onValueChanged);
                        bindEvent(
                            spread,
                            'SelectionChanged',
                            onSelectionChanged
                        );
                        bindEvent(
                            spread,
                            'SelectionChanging',
                            onSelectionChanging
                        );
                        bindEvent(spread, 'SheetChanged', () => {});
                        bindEvent(
                            spread,
                            'EditorStatusChanged',
                            onEditorStatusChanged
                        );
                    }
                    dataSource &&
                        bindDataSource({
                            spread: data.spread,
                            dataSource,
                            sumColumns,
                            groupColumns,
                            rowMerge,
                            columnMerge,
                            rowMergeColumns,
                            colMergeColumns,
                        });
                    if (onPrintHandler) {
                        onPrintHandler((params) => {
                            return new Promise((resolve, reject) => {
                                if (spread) {
                                    if (enablePrint) {
                                        const sheets = spread.sheets;
                                        sheets.forEach((sheet) => {
                                            setPrintInfo(sheet, params || {});
                                        });
                                        spread.print();
                                        resolve();
                                    } else {
                                        reject(
                                            Error(
                                                '打印失败，原因：初始化报表时未开启打印功能'
                                            )
                                        );
                                    }
                                } else {
                                    reject(
                                        Error('打印失败，原因：报表未初始化')
                                    );
                                }
                            });
                        });
                    }
                } finally {
                    spread.resumePaint();
                    spread.resumeEvent();
                }
            };
            if (plugins.length > 0) {
                resourceManager.loadScript(plugins).then(() => {
                    handler();
                });
            } else {
                handler();
            }
        }
    }, [
        onInited,
        onEnterCell,
        onActiveSheetChanged,
        onValueChanged,
        onSelectionChanged,
        onSelectionChanging,
        dataSource,
        sumColumns,
        groupColumns,
        rowMerge,
        columnMerge,
        rowMergeColumns,
        colMergeColumns,
    ]);

    return (
        <Wrap>
            {data.showError ? (
                <LicenseError></LicenseError>
            ) : (
                <div
                    style={{
                        width: '100%',
                        height: '100%',
                        overflow: 'visible',
                        userSelect: 'none',
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
