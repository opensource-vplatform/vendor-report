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

function getRowRules({ rules, row }) {
    let result = rules;
    if (Number.isFinite(row) && row >= 0) {
        result =
            rules.filter(function ({ ranges }) {
                return ranges.some(function ({ row: _row, rowCount }) {
                    return _row <= row && row < _row + rowCount;
                });
            }) || [];
    }
    return result;
}

function getColRules({ rules, col, colHandler }) {
    let result = rules;
    if (Number.isFinite(col) && col >= 0) {
        result = result.filter(function (item) {
            const { ranges } = item;
            const res = ranges.some(function ({ col: _col, colCount }) {
                return _col <= col && col < _col + colCount;
            });

            if (res && typeof colHandler === 'function') {
                colHandler(JSON.parse(JSON.stringify(item)));
            }
            return res;
        });
    }

    return result;
}

function getCellRules(params) {
    let result = getRowRules(params);
    result = getColRules({ ...params, rules: result });
    return result;
}

//处理每一页的头部区域
function handleReportHeaderArea(params) {
    let {
        row,
        rows,
        spans,
        pageRows,
        pageSpans,
        handler,
        startRow = 0,
        currentPageRowIndex = 0,
        headerDataTableObj,
        pageDataTable,
        headerRules = {},
        pageRules = [],
    } = params;

    for (let i = 0; i < row; i++) {
        currentPageRowIndex = i + startRow;
        if (headerDataTableObj[i]) {
            pageDataTable[currentPageRowIndex] = JSON.parse(
                JSON.stringify(headerDataTableObj[i])
            );
        }
        spans.forEach(function (item) {
            if (item.row === i) {
                pageSpans.push({
                    ...item,
                    row: currentPageRowIndex,
                });
            }
        });
        if (headerRules[i]) {
            headerRules[i].forEach(function (rule) {
                pageRules.push({
                    ...rule,
                    ranges: [
                        {
                            ...rule.ranges[0],
                            row: currentPageRowIndex,
                        },
                    ],
                });
            });
        }

        if (rows[i]) {
            pageRows[currentPageRowIndex] = rows[i];
        }
        handler();
    }

    return {
        currentPageRowIndex,
    };
}

//处理每一页的表格区域
function handleContentArea(params) {
    let {
        rows,
        spans,
        pageRows,
        pageSpans,
        handler,
        currentPageRowIndex = 0,
        page,
        pageDataTable,
        rules = [],
        pageRules = [],
    } = params;

    let preRow = -1;
    let tableEndRow = -1;
    let height = 0;
    Object.entries(page).forEach(function ([rowStr, value]) {
        const row = Number(rowStr);
        let addRowCount = 1;
        if (preRow !== -1) {
            addRowCount = row - preRow;
        }
        currentPageRowIndex += addRowCount;
        tableEndRow = currentPageRowIndex;
        spans.forEach(function (item) {
            if (item.row === row) {
                pageSpans.push({
                    ...item,
                    row: tableEndRow,
                });
            }
        });

        rules.forEach(function (rule) {
            const range = rule.ranges?.[0];
            if (range?.row === row) {
                pageRules.push({
                    ...rule,
                    ranges: [
                        {
                            ...range,
                            row: tableEndRow,
                        },
                    ],
                });
            }
        });
        if (rows[row]) {
            pageRows[tableEndRow] = rows[row];
            height += rows[row];
        } else {
            height += 20;
        }
        pageDataTable[tableEndRow] = value;
        tableEndRow += addRowCount;
        preRow = row;

        handler({
            addRowCount,
            tableEndRow,
        });
    });
    return {
        currentPageRowIndex,
        height,
    };
}

//处理每一页的尾部区域
function handleTailArea(params) {
    let {
        rows,
        spans,
        pageRows,
        pageSpans,
        handler,
        currentPageRowIndex = 0,
        pageDataTable,
        maxTableEndRow,
        oldSheetCount,
        footerDataTableObj,
        footerRules = {},
        pageRules = [],
    } = params;

    for (let i = maxTableEndRow + 1; i < oldSheetCount; i++) {
        let index = currentPageRowIndex++;
        spans.forEach(function (item) {
            if (item.row === i) {
                pageSpans.push({
                    ...item,
                    row: index,
                });
            }
        });
        if (rows[i]) {
            pageRows[index] = rows[i];
        }
        if (footerRules[i]) {
            footerRules[i].forEach(function (rule) {
                pageRules.push({
                    ...rule,
                    ranges: [
                        {
                            ...rule.ranges[0],
                            row: index,
                        },
                    ],
                });
            });
        }
        pageDataTable[index] = JSON.parse(
            JSON.stringify(footerDataTableObj[i])
        );
        handler();
    }

    return {
        currentPageRowIndex,
    };
}

function setSheetRows(sheet, rows) {
    if (sheet.rows) {
        Object.keys(sheet.rows).forEach(function (key) {
            delete sheet.rows[key];
        });
        Object.entries(rows).forEach(function ([key, value]) {
            sheet.rows[key] = value;
        });
    } else {
        sheet.rows = rows;
    }
}

function headerAndFooterInfo(params) {
    const {
        other_dataTable,
        minTableStartRow,
        maxTableEndRow,
        rules,
        rows,
        oldSheetCount,
    } = params;
    //头部与尾部
    const headerDataTableObj = {};
    const footerDataTableObj = {};
    const headerRules = {};
    const footerRules = {};

    other_dataTable.forEach(function (item) {
        const { row, col, cellInfo } = item;
        if (row >= minTableStartRow && row <= maxTableEndRow) {
            return;
        }
        let dataTable = headerDataTableObj;
        let newRules = headerRules;
        if (row > maxTableEndRow && maxTableEndRow !== -1) {
            dataTable = footerDataTableObj;
            newRules = footerRules;
        }
        dataTable[row] = dataTable[row] ? dataTable[row] : {};
        dataTable[row][col] = JSON.parse(JSON.stringify(cellInfo));

        const cellRules = getCellRules({
            rules,
            row,
            col,
        });
        if (cellRules) {
            newRules[row] = newRules[row] ? newRules[row] : [];
            cellRules.forEach(function (rule) {
                newRules[row].push({
                    ...rule,
                    ranges: [
                        {
                            row,
                            col,
                            rowCount: 1,
                            colCount: 1,
                        },
                    ],
                });
            });
        }
    });

    //头部总高度,行高默认是20
    let headerHeight = 0;

    for (let i = 0; i < minTableStartRow; i++) {
        const rowH = rows?.[i];
        if (rowH) {
            headerHeight += rowH?.size;
        } else {
            headerHeight += 20;
        }
    }

    //尾部总高度,行高默认是20
    let footerHeight = 0;
    for (let i = maxTableEndRow + 1; i < oldSheetCount; i++) {
        const rowH = rows?.[i];
        if (rowH) {
            footerHeight += rowH?.size;
        } else {
            footerHeight += 20;
        }
    }

    return {
        headerDataTableObj,
        footerDataTableObj,
        headerRules,
        footerRules,
        headerHeight,
        footerHeight,
    };
}

function parseJsonData(jsonData, datas, _template = {}) {
    const sheetsInfo = {};
    const newSheets = {};
    const groupsDatas = {};
    let sheetCount = jsonData.sheetCount;
    const template = { ..._template };
    const changedGroupNames = []; //用于判断sheet名称是否重复
    //如果有模板，则对数据进行分组，每个组一个sheet
    Object.entries(_template).forEach(function ([sheetName, templateValue]) {
        const groups = templateValue?.groups;
        if (!groups) {
            return;
        }
        if (templateValue?.isCurrentSheet) {
            return;
        }
        const templateInfo = template[sheetName];
        const currentSheetDatas = {};
        //对数据进行分组，分组的名称就是sheet的名称
        Object.entries(groups).some(function ([dsName, group]) {
            currentSheetDatas[dsName] = {};
            const toBeGroupedData = datas[dsName];
            if (
                Array.isArray(toBeGroupedData) &&
                Array.isArray(group) &&
                group.length
            ) {
                const groupFieldCode = group?.[0]?.code;
                toBeGroupedData.forEach(function (item) {
                    const groupName = item[groupFieldCode];
                    if (!Array.isArray(currentSheetDatas[dsName][groupName])) {
                        currentSheetDatas[dsName][groupName] = [];
                    }
                    currentSheetDatas[dsName][groupName].push(item);
                });
            }
        });
        const sheet = jsonData?.sheets?.[sheetName];
        if (sheet) {
            const cobySheet = JSON.stringify(sheet);
            //根据分组名称创建sheet，Object.values(groupsDatas)[0]，只支持一个实体进行分组
            const grouedData = Object.values(currentSheetDatas)[0];
            const groupNames = Object.keys(grouedData);
            groupNames.forEach(function (_newSheetName, index) {
                let newSheetName = _newSheetName;
                //处理同名的sheet
                let suffix = 1;
                while (jsonData.sheets[newSheetName]) {
                    newSheetName = `${_newSheetName}${suffix++}`;
                }
                while (
                    (groupNames.includes(newSheetName) &&
                        newSheetName !== _newSheetName) ||
                    changedGroupNames.includes(newSheetName)
                ) {
                    newSheetName = `${_newSheetName}${suffix++}`;
                }
                //更改修正后的名称
                if (newSheetName !== _newSheetName) {
                    const cache = currentSheetDatas[_newSheetName];
                    delete currentSheetDatas[_newSheetName];
                    currentSheetDatas[newSheetName] = cache;
                }
                changedGroupNames.push(newSheetName);

                groupsDatas[newSheetName] = currentSheetDatas;

                if (index <= 0) {
                    sheet.name = newSheetName;
                } else {
                    const sheet = JSON.parse(cobySheet);
                    sheet.name = newSheetName;
                    sheet.isSelected = false;
                    sheet.index = sheetCount++;
                    sheet.order = sheet.index;
                    jsonData.sheets[newSheetName] = sheet;
                    jsonData.sheetCount += 1;
                }
                template[newSheetName] = templateInfo;
            });
        }
        //只支持一个实体进行分组
        return true;
    });

    Object.values(jsonData.sheets).forEach(function (sheet) {
        const {
            name,
            spans = [],
            data,
            tables = [],
            rows = {} /* 行高 */,
            conditionalFormats = {},
        } = sheet;
        const cobyRows = JSON.parse(JSON.stringify(rows));
        const templateInfo = template[name];
        const isTemplate = templateInfo ? true : false;

        const { dataTable } = data;

        const table_dataTable = []; //绑定了实体字段的单元格
        const other_dataTable = []; //其它单元格(当复制实体字段单元格的时候，行号大于实体字段单元格行号时，这些单元格需要相对的移动)

        //oldSheetCount，minTableStartRow，maxTableEndRow用于计算模板的头部，尾部
        const oldSheetCount = sheet.rowCount;
        let minTableStartRow = -1;
        let maxTableEndRow = -1;
        const rules = conditionalFormats.rules || [];
        const newRules = [];
        //将单元格信息收集到table_dataTable和other_dataTable，包含行号，列号，样式，跨行与跨列等信息
        const markRowIsInTable = {};
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
                        oldRow: row,
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

                        if (minTableStartRow === -1 || minTableStartRow > row) {
                            minTableStartRow = row;
                        }
                        if (maxTableEndRow === -1 || maxTableEndRow < row) {
                            maxTableEndRow = row;
                            if (span.rowCount >= 1) {
                                maxTableEndRow += span.rowCount - 1;
                            }
                        }
                        for (let i = row; i < row + span.rowCount; i++) {
                            markRowIsInTable[i] = true;
                        }
                    } else if (values && Object.keys(values).length) {
                        other_dataTable.push(dataTableItem);
                    }
                });
            });
        }
        if (maxTableEndRow === -1) {
            minTableStartRow = oldSheetCount;
            maxTableEndRow = oldSheetCount;
        }
        //头部与尾部相关信息
        const {
            headerDataTableObj,
            footerDataTableObj,
            headerRules,
            footerRules,
            headerHeight,
            footerHeight,
        } = headerAndFooterInfo({
            other_dataTable,
            minTableStartRow,
            maxTableEndRow,
            rules,
            rows,
            oldSheetCount,
        });

        let sheetRowCount = sheet.rowCount || 200;
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

        const contentDataTable = {};
        const virtualRows = []; //如果是虚拟行则不生成合并信息
        while (tableInfos.length) {
            const tableInfo = tableInfos.shift();
            let {
                tableCode,
                startRow,
                endRow,
                data,
                oldStartRow,
                maxRowCount,
            } = tableInfo;
            let ds = datas?.[tableCode];
            const groupedDs = groupsDatas?.[name]?.[tableCode]?.[name];
            if (Array.isArray(groupedDs)) {
                ds = groupedDs;
            }
            if (Array.isArray(ds)) {
                //获取当前表格的条件样式
                const currentRowRules = getRowRules({
                    rules,
                    row: oldStartRow,
                });

                ds.forEach(function (dsItem, i) {
                    //复制样式
                    const curRowDataTable = dataTable[oldStartRow];
                    if (!newDataTable[endRow]) {
                        newDataTable[endRow] = JSON.parse(
                            JSON.stringify(curRowDataTable)
                        );
                    }

                    let index = 1;
                    for (
                        let i = oldStartRow + 1;
                        i < oldStartRow + maxRowCount;
                        i++
                    ) {
                        const curRowDataTable = dataTable[i];
                        if (!newDataTable[endRow + index]) {
                            newDataTable[endRow + index] = JSON.parse(
                                JSON.stringify(curRowDataTable)
                            );
                        }
                        contentDataTable[endRow + index] =
                            newDataTable[endRow + index];
                        virtualRows.push(endRow + index);
                        index++;
                    }

                    //复制行高
                    if (rows?.[oldStartRow]) {
                        newRows[endRow] = {
                            ...rows?.[oldStartRow],
                        };
                    }
                    data.forEach(function ({ field, col, colCount, rowCount }) {
                        if (newDataTable[endRow]?.[col]?.bindingPath) {
                            delete newDataTable[endRow][col].bindingPath;
                        }
                        newDataTable[endRow][col] = newDataTable[endRow][col]
                            ? newDataTable[endRow][col]
                            : {};
                        newDataTable[endRow][col].value = dsItem[field];

                        //新增spans
                        if (colCount > 1 || rowCount > 1) {
                            newSpans.push({
                                col,
                                row: endRow,
                                rowCount,
                                colCount,
                            });
                        }

                        //复制条件格式
                        getColRules({
                            rules: currentRowRules,
                            col,
                            colHandler(item) {
                                newRules.push({
                                    ...item,
                                    ranges: [
                                        {
                                            row: endRow,
                                            rowCount,
                                            col,
                                            colCount,
                                        },
                                    ],
                                });
                            },
                        });
                    });
                    contentDataTable[endRow] = newDataTable[endRow];
                    endRow += maxRowCount;
                    if (i > 0) {
                        sheetRowCount += maxRowCount;
                    }
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
            const { row, col, rowCount, colCount, cellInfo, rows, oldRow } =
                item;
            if (markRowIsInTable[row]) {
                return;
            }
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

            getCellRules({
                rules,
                row: oldRow,
                col,
                colHandler(item) {
                    newRules.push({
                        ...item,
                        ranges: [{ row, rowCount, col, colCount }],
                    });
                },
            });
        });
        setSheetRows(sheet, newRows);

        sheet.conditionalFormats = sheet.conditionalFormats
            ? sheet.conditionalFormats
            : {};
        sheet.conditionalFormats.rules = newRules;
        sheet.spans = newSpans;
        sheet.data = sheet.data ? sheet.data : {};
        sheet.data.dataTable = newDataTable;
        sheet.rowCount = sheetRowCount;

        page({
            sheet,
            templateInfo,
            minTableStartRow,
            maxTableEndRow,
            rows,
            spans,
            headerDataTableObj,
            footerDataTableObj,
            newRows,
            newSpans,
            cobyRows,
            oldSheetCount,
            sheetsInfo,
            isTemplate,
            sheetCount,
            newSheets,
            newRules,
            headerRules,
            footerRules,
            contentDataTable,
            headerHeight,
            footerHeight,
            virtualRows,
        });
    });

    Object.entries(newSheets).forEach(function ([name, info]) {
        jsonData.sheets[name] = info;
        jsonData.sheetCount += 1;
    });

    return sheetsInfo;
}

//分页
function page(params) {
    const {
        sheet,
        templateInfo,
        minTableStartRow,
        maxTableEndRow,
        headerDataTableObj,
        footerDataTableObj,
        newRows,
        newSpans,
        cobyRows,
        oldSheetCount,
        sheetsInfo,
        isTemplate,
        sheetCount,
        newSheets,
        newRules,
        headerRules,
        footerRules,
        contentDataTable,
        headerHeight,
        footerHeight,
        spans,
        rows,
        virtualRows,
    } = params;

    if (!isTemplate) {
        return;
    }

    const {
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
    } = sheet;

    const {
        bottom: marginBottom,
        footer: marginFooter,
        header: marginHeader,
        top: marginTop,
    } = margin;

    const contentHeight =
        height -
        marginBottom -
        marginFooter -
        marginHeader -
        marginTop -
        headerHeight -
        footerHeight;
    let pageHeight = 0;

    const pages = [];
    const contentDataTableArr = Object.entries(contentDataTable);
    let currentPageDataTable = {};
    debugger;
    while (pageHeight < contentHeight && contentDataTableArr.length > 0) {
        const [rowStr, rowDataTable] = contentDataTableArr.shift();
        const row = Number(rowStr);
        if (!virtualRows.includes(row)) {
            let rowHeight = newRows?.[row]?.size || 20;
            const span = newSpans.find(function (span) {
                return Number(span.row) === row;
            });
            if (span && span.rowCount > 1) {
                let index = 1;
                while (index < span.rowCount) {
                    rowHeight += newRows?.[row + index]?.size || 20;
                    index++;
                }
            }
            if (pageHeight + rowHeight < contentHeight) {
                pageHeight += rowHeight;
            } else {
                pages.push(currentPageDataTable);
                pageHeight = rowHeight;
                currentPageDataTable = {};
            }
        }

        currentPageDataTable[row] = rowDataTable;
    }
    if (
        (pages.length && pages[pages.length - 1] !== currentPageDataTable) ||
        !pages.length
    ) {
        pages.push(currentPageDataTable);
    }

    let sheetIndex = sheetCount + Object.keys(newSheets).length;
    let pageDataTable = {};
    let tableEndRow = -1;

    const { isCurrentSheet } = templateInfo;
    let currentPageRowIndex = 0;
    let pageTotalRow = 0;
    let prePageEndRow = 0;
    let pageIndex = 0;

    let pageSpans = [];
    let pageRows = {};
    let pageRules = [];
    const cobySheet = JSON.stringify(sheet);
    while (pages.length) {
        const page = pages.shift();
        if (!isCurrentSheet) {
            currentPageRowIndex = 0;
            pageTotalRow = 0;
            pageIndex++;
            pageSpans = [];
            pageRows = {};
            pageRules = [];
            pageDataTable = {};
        }
        //头部区
        let params = {
            row: minTableStartRow,
            rows,
            spans,
            pageRows,
            pageSpans,
            handler() {
                pageTotalRow++;
            },
            headerDataTableObj,
            pageDataTable,
            pageRules,
            headerRules,
        };
        if (isCurrentSheet) {
            params.startRow = prePageEndRow;
        }
        debugger;
        let res = handleReportHeaderArea(params);
        currentPageRowIndex = res.currentPageRowIndex;
        //内容区
        res = handleContentArea({
            rows: newRows,
            spans: newSpans,
            pageRows,
            pageSpans,
            handler({ addRowCount, tableEndRow: _tableEndRow }) {
                pageTotalRow += addRowCount;
                tableEndRow = _tableEndRow;
            },
            currentPageRowIndex,
            page,
            pageDataTable,
            pageRules,
            rules: newRules,
        });
        currentPageRowIndex = res.currentPageRowIndex + 1;
        let height = res.height;
        //尾部区
        if (maxTableEndRow > -1) {
            res = handleTailArea({
                rows: cobyRows,
                spans,
                pageRows,
                pageSpans,
                handler() {
                    pageTotalRow++;
                },
                currentPageRowIndex,
                pageDataTable,
                footerDataTableObj,
                maxTableEndRow,
                oldSheetCount,
                footerRules,
                pageRules,
            });
            currentPageRowIndex = res.currentPageRowIndex;
        }

        if (!isCurrentSheet) {
            let _sheet = sheet;

            //从第二页起，复制模板创建sheet
            if (pageIndex > 1) {
                _sheet = JSON.parse(cobySheet);
                _sheet.name += `_${pageIndex - 1}`;
                _sheet.index = sheetIndex++;
                _sheet.isSelected = false;
                newSheets[_sheet.name] = _sheet;
            }
            resetSheet({
                _sheet,
                pageDataTable,
                pageRules,
                tableEndRow,
                pageSpans,
                pageRows,
                sheetsInfo,
                pageTotalRow,
            });
        }

        if (isCurrentSheet) {
            const diff = contentHeight - height;
            if (diff > 0) {
                const rowHeight = rows[tableEndRow]?.size || 20;
                const rowCount = Math.ceil(diff / rowHeight);
                currentPageRowIndex += rowCount;
            }
            prePageEndRow = currentPageRowIndex;
        }
    }

    isCurrentSheet &&
        resetSheet({
            _sheet: sheet,
            pageDataTable,
            pageRules,
            tableEndRow,
            pageSpans,
            pageRows,
            sheetsInfo,
            pageTotalRow: pageTotalRow + 1,
        });
}

function resetSheet(params) {
    const {
        _sheet,
        pageDataTable,
        pageRules,
        tableEndRow,
        pageSpans,
        pageRows,
        sheetsInfo,
        pageTotalRow,
    } = params;

    const sheetCount = pageTotalRow > 0 ? pageTotalRow : _sheet.rowCount;

    const sheetName = _sheet.name;
    _sheet.data.dataTable = Object.keys(pageDataTable).length
        ? pageDataTable
        : _sheet.data.dataTable;

    _sheet.rowCount = sheetCount;

    //条件格式规则
    _sheet.conditionalFormats = _sheet.conditionalFormats
        ? _sheet.conditionalFormats
        : {};
    _sheet.conditionalFormats.rules = pageRules;

    //合并单元格
    _sheet.spans = pageSpans;

    //行高
    setSheetRows(_sheet, pageRows);

    sheetsInfo[sheetName] = sheetsInfo[sheetName] ? sheetsInfo[sheetName] : {};
    sheetsInfo[sheetName]['tableEndRow'] = tableEndRow;
}

function fillData(sheetJson, source, sheetsInfo = {}) {
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
            const copyRows = JSON.parse(JSON.stringify(rows));
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
                const newRow = row + rowCount;
                dataTable[newRow] = value;
                if (copyRows[row]) {
                    sheetJson.rows[newRow] = copyRows[row];
                }
            });
            //移动位于表格后面的单元格的合并信息
            if (sheetJson.spans) {
                sheetJson.spans.forEach(function (span) {
                    if (span.row > tableEndRow) {
                        span.row = span.row + rowCount;
                    }
                });
            }

            //移动条件格式
            const rules = sheetJson?.conditionalFormats?.rules;
            if (Array.isArray(rules)) {
                rules.forEach(function ({ ranges }) {
                    if (ranges?.[0]?.row > tableEndRow) {
                        ranges[0].row = ranges[0].row + rowCount;
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
        onSheetNameChanged,
        onSheetNameChanging,
        onActiveSheetChanging,
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
        template,
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
                sheetsInfo =
                    dataSource && parseJsonData(json, dataSource, template);
            }
            return {
                sheetsInfo,
                json,
            };
        },
        [_json, dataSource, JSON.stringify(template)]
    );

    /*  debugger;
        if (json) {
            Object.values(json.sheets).forEach(function (sheet) {
                sheet.data.dataTable[2] = {
                    1: {
                        hyperlink: {
                            url: 'sjs://Sheet2!A1',
                            tooltip: '',
                            target: 0,
                            drawUnderline: true,
                            command: '',
                        },
                    },
                };
                sheet.data.dataTable[3] = {
                    1: {
                        hyperlink: {
                            url: 'sjs://Sheet3!A1',
                            tooltip: '',
                            target: 0,
                            drawUnderline: true,
                            command: '',
                        },
                    },
                };
            });
        } */

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
                            'ActiveSheetChanging',
                            onActiveSheetChanging
                        );
                        bindEvent(
                            spread,
                            'SheetNameChanged',
                            onSheetNameChanged
                        );
                        bindEvent(
                            spread,
                            'SheetNameChanging',
                            onSheetNameChanging
                        );
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
        onSheetNameChanged,
        onSheetNameChanging,
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
