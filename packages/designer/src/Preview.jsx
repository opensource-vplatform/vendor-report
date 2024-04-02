import { useContext } from 'react';

import {
  useDispatch,
  useSelector,
} from 'react-redux';
import styled from 'styled-components';

import Button from '@components/button/Index';
import {
  Workbook,
  Worksheet,
} from '@toone/report-excel';

import DesignerContext from './DesignerContext';
import { setMode } from './store/appSlice/appSlice';
import { getBaseUrl } from './utils/environmentUtil';

const Wrap = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    padding: 0;
    margin: 0;
`;

const Toolbar = styled.div`
    border-bottom: solid 1px lightgray;
    background-color: white;
    margin: 0px;
    padding: 0px;
    display: flex;
    height: 35px;
    justify-content: flex-end;
    align-items: center;
`;

const ExcelWrap = styled.div`
    padding: 8px;
    box-sizing: border-box;
    width: 100%;
    height: 100%;
`;

function replacer(key, value) {
    //删除角标信息
    if (key === 'cornerFold' && value?.markType === 'table') {
        return undefined;
    }
    return value;
}

//如果表格允许行合并或者列合并(相邻单元格数据相同会自动合并成一个单元格)，则对数据进行处理
function handleDatas(params) {
    const { rowMerge, columnMerge, dataSource, originalDatasourceCodes } =
        params;
    if (rowMerge || columnMerge) {
        Object.keys(dataSource).forEach((key) => {
            if (
                !originalDatasourceCodes[key] &&
                Array.isArray(dataSource[key])
            ) {
                if (rowMerge && columnMerge) {
                    dataSource[key] = dataSource.mergeDatas.rowColumn[key];
                } else if (rowMerge) {
                    dataSource[key] = dataSource.mergeDatas.row[key];
                } else if (columnMerge) {
                    dataSource[key] = dataSource.mergeDatas.column[key];
                }
            }
        });
    }
}

function parseJsonData(jsonData, datas) {
    debugger;
    Object.values(jsonData.sheets).forEach(function (sheet) {
        const { spans = [], data, tables = [], rows = {} /* 行高 */ } = sheet;
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

                if (_tableCode === tableCode && _col + _colCount === col) {
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
                        delete newDataTable[endRow][col].bindingPath;
                        newDataTable[endRow][col].value = dsItem[field];
                    });
                    endRow++;
                });
            }

            other_dataTable.forEach(function (item) {
                if (item.row > startRow && item.row <= endRow) {
                    item.row = endRow + (item.row - startRow) - 1;
                }
            });

            tableInfos.forEach(function (item) {
                if (item.startRow > startRow && item.startRow <= endRow) {
                    item.startRow = endRow + (item.startRow - startRow) - 1;
                    item.endRow = item.startRow;
                }
            });

            tables.forEach(function (table) {
                if (table.row > startRow && table.row <= endRow) {
                    table.row = endRow + (table.row - startRow) - 1;
                }
            });
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
    });
}

export default function () {
    const context = useContext(DesignerContext);
    const dispatch = useDispatch();
    const {
        previewViewDatas,
        tableGroups,
        sumColumns,
        originalDatasourceCodes,
        rowMergeColumns,
        colMergeColumns,
        isFillData = false,
    } = useSelector(({ datasourceSlice }) => datasourceSlice);

    const { rowMerge, columnMerge } = useSelector(
        ({ tableDesignSlice }) => tableDesignSlice
    );

    handleDatas({
        rowMerge,
        columnMerge,
        dataSource: previewViewDatas,
        originalDatasourceCodes,
    });
    const { spread: sourceSpread } = useSelector(({ appSlice }) => appSlice);
    const sourceJson = JSON.stringify(
        sourceSpread ? sourceSpread?.toJSON?.() : '',
        replacer
    );
    const json = JSON.parse(sourceJson);
    //parseJsonData(json, previewViewDatas);
    //许可证
    const license = context?.conf?.license;
    const toolbar = Array.isArray(context?.conf?.toolbar)
        ? context?.conf?.toolbar
        : [];
    let printHandler = null;
    const handlePrint = () => {
        printHandler && printHandler();
    };
    return (
        <Wrap>
            <Toolbar>
                <Button
                    style={{ marginRight: 8 }}
                    type='primary'
                    onClick={handlePrint}
                >
                    打印
                </Button>
                <Button
                    style={{ marginRight: 8 }}
                    onClick={() => {
                        dispatch(setMode({ mode: 'edit' }));
                    }}
                >
                    编辑
                </Button>
                {toolbar.map(function ({ title, type, onClick, desc }, index) {
                    return (
                        <Button
                            style={{ marginRight: 8 }}
                            onClick={onClick}
                            type={type}
                            key={index}
                            title={desc}
                        >
                            {title}
                        </Button>
                    );
                })}
            </Toolbar>
            <ExcelWrap>
                <Workbook
                    license={license}
                    json={json}
                    enablePrint={true}
                    baseUrl={getBaseUrl()}
                    onPrintHandler={(handler) => {
                        printHandler = handler;
                    }}
                    rowMerge={rowMerge}
                    columnMerge={columnMerge}
                    dataSource={previewViewDatas}
                    sumColumns={sumColumns}
                    groupColumns={tableGroups}
                    rowMergeColumns={rowMergeColumns}
                    colMergeColumns={colMergeColumns}
                    isFillData={isFillData}
                    onInited={function (a) {
                        window.mapTest = a;
                    }}
                >
                    <Worksheet></Worksheet>
                </Workbook>
            </ExcelWrap>
        </Wrap>
    );
}
