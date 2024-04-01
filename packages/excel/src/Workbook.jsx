import {
  useEffect,
  useMemo,
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

function parseJsonData(jsonData, datas) {
    const sheetsInfo = {};
    debugger;
    Object.values(jsonData.sheets).forEach(function (sheet) {
        const {
            name,
            spans = [],
            data,
            tables = [],
            rows = {} /* 行高 */,
        } = sheet;
        const { dataTable } = data;

        const table_dataTable = []; //绑定了实体字段的单元格
        const other_dataTable = []; //其它单元格(当复制实体字段单元格的时候，行号大于实体字段单元格行号时，这些单元格需要相对的移动)

        //将单元格信息收集到table_dataTable和other_dataTable，包含行号，列号，样式，跨行与跨列等信息
        if (dataTable) {
            Object.entries(dataTable).forEach(function ([
                rowStr,
                colDataTable,
            ]) {
                const row = Number(rowStr);
                Object.entries(colDataTable).forEach(function ([
                    colStr,
                    values,
                ]) {
                    const { style, bindingPath } = values;
                    const col = Number(colStr);
                    //跨行与跨列信息
                    const span = spans.find(function (spanItem) {
                        return spanItem.row === row && spanItem.col === col;
                    }) || {
                        rowCount: 1,
                        colCount: 1,
                    };

                    const dataTableItem = {
                        row,
                        col,
                        rowCount: span.rowCount,
                        colCount: span.colCount,
                        cellInfo: values,
                        rows: rows[row],
                    };

                    if (bindingPath?.includes?.('.')) {
                        const [tableCode, field] = bindingPath.split('.');
                        table_dataTable.push({
                            ...dataTableItem,
                            tableCode,
                            field,
                        });
                    } else if (values && Object.keys(values).length) {
                        other_dataTable.push(dataTableItem);
                    }
                });
            });
        }
        let sheetRowCount = sheet.rowCount;
        const tableInfos = [
            {
                maxRowCount: 0,
                tableCode: '',
                startRow: -1,
                oldStartRow: -1,
                endRow: -1,
                startCol: -1,
                endCol: -1,
                data: [],
            },
        ];

        //对实体字段单元格进行分组处理，连续且是同一个实体，则作为一组(一个表格)
        table_dataTable.forEach(function (item) {
            const { tableCode, row, col, rowCount, colCount } = item;
            const tableInfo = tableInfos[tableInfos.length - 1];
            if (tableInfo.data.length <= 0) {
                tableInfo.startRow = row;
                tableInfo.oldStartRow = row;
                tableInfo.endRow = row;
                tableInfo.maxRowCount = rowCount;
                tableInfo.tableCode = tableCode;
                tableInfo.startCol = col;
                tableInfo.endCol = col + colCount;
                tableInfo.data.push(item);
            } else {
                const {
                    row: _row,
                    col: _col,
                    colCount: _colCount,
                    tableCode: _tableCode,
                } = tableInfo.data[tableInfo.data.length - 1];

                if (
                    _tableCode === tableCode &&
                    _col + _colCount === col &&
                    row === _row
                ) {
                    if (tableInfo.maxRowCount < rowCount) {
                        tableInfo.maxRowCount = rowCount;
                    }
                    tableInfo.endCol = col + colCount;
                    tableInfo.data.push(item);
                } else {
                    tableInfos.push({
                        maxRowCount: rowCount,
                        tableCode,
                        startRow: row,
                        oldStartRow: row,
                        endRow: row,
                        startCol: col,
                        endCol: col + colCount,
                        data: [item],
                    });
                }
            }
        });

        const newDataTable = {};
        const newSpans = [];
        const newRows = {};
        let tableEndRow = 0;
        //记录上一次复制的表格开始行位置与结束行位置
        let lastStartRow = -1;
        let lastEndRow = -1;
        while (tableInfos.length) {
            const tableInfo = tableInfos.shift();
            let { tableCode, startRow, endRow, data, oldStartRow } = tableInfo;
            const ds = datas?.[tableCode];
            if (Array.isArray(ds)) {
                ds.forEach(function (dsItem, i) {
                    if (i > 0) {
                        sheetRowCount++;
                    }
                    //复制样式
                    const curRowDataTable = dataTable[oldStartRow];
                    if (!newDataTable[endRow]) {
                        newDataTable[endRow] = JSON.parse(
                            JSON.stringify(curRowDataTable)
                        );
                    }

                    //复制spans
                    spans.forEach(function (span) {
                        if (span.row === oldStartRow) {
                            newSpans.push({
                                ...span,
                                row: endRow,
                            });
                        }
                    });

                    //复制行高
                    if (rows?.[oldStartRow]) {
                        newRows[endRow] = {
                            ...rows?.[oldStartRow],
                        };
                    }
                    data.forEach(function ({ field, col }) {
                        if (newDataTable[endRow]?.[col]?.bindingPath) {
                            delete newDataTable[endRow][col].bindingPath;
                        }
                        newDataTable[endRow][col] = newDataTable[endRow][col]
                            ? newDataTable[endRow][col]
                            : {};
                        newDataTable[endRow][col].value = dsItem[field];
                    });
                    endRow++;
                });
            }

            if (startRow === lastStartRow && lastEndRow >= endRow) {
                continue;
            }
            let removeRowCount = endRow - startRow - 1;
            if (startRow === lastStartRow && lastEndRow < endRow) {
                removeRowCount = endRow - lastEndRow;
            }

            lastStartRow = startRow;
            lastEndRow = endRow;

            other_dataTable.forEach(function (item) {
                if (item.row > startRow && item.row <= endRow) {
                    item.row += removeRowCount;
                }
            });

            tableInfos.forEach(function (item) {
                if (item.startRow > startRow && item.startRow <= endRow) {
                    item.startRow += removeRowCount;
                    item.endRow = item.startRow;
                }
            });

            tables.forEach(function (table) {
                if (table.row > startRow && table.row <= endRow) {
                    table.row += removeRowCount;
                }
            });
            if (endRow > tableEndRow) {
                tableEndRow = endRow;
            }
        }

        other_dataTable.forEach(function (item) {
            const { row, col, rowCount, colCount, cellInfo, rows } = item;

            newDataTable[row] = newDataTable[row] ? newDataTable[row] : {};
            newDataTable[row][col] = {
                style: cellInfo.style,
                bindingPath: cellInfo.bindingPath,
            };

            if (cellInfo.value) {
                newDataTable[row][col].value = cellInfo.value;
            }

            if (rowCount > 1 || colCount > 1) {
                newSpans.push({
                    row,
                    col,
                    rowCount,
                    colCount,
                });
            }

            //行高
            if (rows) {
                newRows[row] = rows;
            }
        });
        if (sheet.rows) {
            Object.keys(sheet.rows).forEach(function (key) {
                delete sheet.rows[key];
            });
            Object.entries(newRows).forEach(function ([key, value]) {
                sheet.rows[key] = value;
            });
        } else {
            sheet.rows = newRows;
        }
        sheet.spans = newSpans;
        sheet.data = sheet.data ? sheet.data : {};
        sheet.data.dataTable = newDataTable;
        sheet.rowCount = sheetRowCount;
        sheetsInfo[name] = sheetsInfo[name] ? sheetsInfo[name] : {};
        sheetsInfo[name]['tableEndRow'] = tableEndRow;
    });
    return sheetsInfo;
}

function fillData(sheetJson, source, sheetsInfo = {}) {
    debugger;
    const {
        rows = {}, //行高
        rowCount: sheetRowCount,
        printInfo: {
            paperSize: { height = 1100 },
            margin = {
                bottom: 75,
                footer: 30,
                header: 30,
                left: 70,
                right: 70,
                top: 75,
            },
        },
        tables = [],
        data: { dataTable = {} },
        name,
    } = sheetJson;

    const {
        bottom: marginBottom,
        footer: marginFooter,
        header: marginHeader,
        top: marginTop,
    } = margin;

    const printHeight =
        height - marginBottom - marginFooter - marginHeader - marginTop;
    let index = 0;
    let pageHeight = 0;
    let tableEndRow = 0;
    let bindingPath = '';
    while (index < sheetRowCount) {
        const rowHeight = rows[index]?.size || 20;
        pageHeight += rowHeight;

        //收集结束行最大的表格信息，如果需要填充数据，则填充这个表格的数据
        tables.forEach(function ({ row, rowCount, bindingPath: _bindingPath }) {
            if (row + rowCount - 1 === index) {
                tableEndRow = index;
                bindingPath = _bindingPath;
            }
        });

        if (pageHeight > printHeight) {
            pageHeight = 0;
        } else {
            index++;
        }
    }

    const diff = printHeight - pageHeight;

    //如果有表格并且表格绑定了数据源，则填充表格绑定的数据源
    if (diff > 0 && bindingPath) {
        const rowHeight = rows[tableEndRow]?.size || 20;
        const rowCount = Math.floor(diff / rowHeight);
        if (rowCount > 0) {
            const data = source.getSource();
            const tableData = data?.[bindingPath];
            let index = rowCount;
            while (index > 0) {
                tableData.push({});
                index--;
            }
        }
    } else if (
        diff > 0 &&
        !bindingPath &&
        sheetsInfo?.[name]?.tableEndRow >= 0
    ) {
        //否则，如果是通过拖拽表字段生成的表格，则复制相对的表格结束行
        const tableEndRow = sheetsInfo?.[name]?.tableEndRow - 1;
        const rowHeight = rows[tableEndRow]?.size || 20;
        const rowCount = Math.floor(diff / rowHeight);
        if (rowCount > 0) {
            const otherDataTable = []; //用于收集表格后面的单元格
            let endDataTalbe = null; //表格的最后一行单元格信息
            Object.entries(dataTable).forEach(function ([rowStr, value]) {
                const row = Number(rowStr);
                if (row > tableEndRow) {
                    otherDataTable.push({
                        row,
                        value,
                    });
                }
                if (row === tableEndRow) {
                    endDataTalbe = JSON.parse(JSON.stringify(value));
                }
            });
            //复制表格的最后一行单元格信息到新增的行中
            if (endDataTalbe) {
                let index = 1;
                Object.keys(endDataTalbe).forEach(function (key) {
                    endDataTalbe[key] = {
                        ...endDataTalbe[key],
                        value: '',
                    };
                });
                while (index <= rowCount) {
                    dataTable[tableEndRow + index] = {
                        ...JSON.parse(JSON.stringify(endDataTalbe)),
                    };
                    if (rows) {
                        rows[tableEndRow + index] = {
                            size: rowHeight,
                        };
                    }
                    index++;
                }
            }
            //移动表格后面的单元格
            otherDataTable.forEach(function ({ row, value }) {
                dataTable[row + rowCount] = value;
            });
            //移动位于表格后面的单元格的合并信息
            if (sheetJson.spans) {
                sheetJson.spans.forEach(function (span) {
                    if (span.row > tableEndRow) {
                        span.row = span.row + rowCount;
                    }
                });
            }
            //sheet行数增加
            sheetJson.rowCount = sheetJson.rowCount + rowCount;
        }
    }
}

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
        isFillData = false,
        sheetsInfo,
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
        isFillData && fillData(json, source, sheetsInfo);
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
        json: _json = null,
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
        isFillData = false,
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

    const { json, sheetsInfo } = useMemo(
        function () {
            let sheetsInfo = null;
            let json = JSON.parse(JSON.stringify(_json));
            if (json) {
                sheetsInfo = dataSource && parseJsonData(json, dataSource);
            }
            return {
                sheetsInfo,
                json,
            };
        },
        [_json, dataSource]
    );

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
                            isFillData,
                            sheetsInfo,
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
