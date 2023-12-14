import React, {
  useEffect,
  useState,
} from 'react';

import { useSelector } from 'react-redux';

import GC from '@grapecity/spread-sheets';
import {
  SpreadSheets,
  Worksheet,
} from '@grapecity/spread-sheets-react';

function PreviewView() {
    const { previewViewDatas } = useSelector(
        ({ datasourceSlice }) => datasourceSlice
    );
    const [spread, setSpread] = useState(null);

    useEffect(function () {
        if (spread) {
            spread.sheets.forEach(function (sheet, index) {
                const sheetsInfo = previewViewDatas.sheets[index];

                Object.entries(sheetsInfo.row).forEach(function ([row, cols]) {
                    const _row = Number(row);
                    Object.entries(cols).forEach(function ([col, info]) {
                        const _col = Number(col);
                        //固定值
                        if (
                            Object.prototype.hasOwnProperty.call(info, 'value')
                        ) {
                            sheet.setValue(_row, _col, info.value);
                        }

                        //数据源路径
                        if (
                            Object.prototype.hasOwnProperty.call(info, 'path')
                        ) {
                            sheet.getCell(_row, _col).bindingPath(info.path);
                        }

                        //样式
                        const style = new GC.Spread.Sheets.Style(
                            info.cellStyle
                        );
                        sheet.setStyle(_row, _col, style);
                    });
                });

                sheet.tables.all().forEach(function (table) {
                    sheet.tables.remove(table);
                });
                //表格
                sheetsInfo.tables.forEach(function ({
                    tableName,
                    range: { row, col },
                    columns,
                    path,
                }) {
                    spread.suspendPaint();

                    const table = sheet.tables.add(
                        tableName,
                        row,
                        col,
                        1,
                        columns.length,
                        GC.Spread.Sheets.Tables.TableThemes.light6
                    );
                    table.autoGenerateColumns(false);
                    const tableColumns = [];
                    columns.forEach(function ({
                        columnId,
                        columnName,
                        dataField,
                    }) {
                        console.log(columnName, '啊手动阀');
                        const tableColumn =
                            new GC.Spread.Sheets.Tables.TableColumn(
                                columnId,
                                dataField,
                                columnName
                            );
                        tableColumns.push(tableColumn);
                    });

                    tableColumns.length > 0 && table.bindColumns(tableColumns);
                    table.bindingPath(path);
                    spread.resumePaint();
                });
            });
        }
    });

    return (
        <SpreadSheets
            workbookInitialized={function (spread) {
                setSpread(spread);
            }}
        >
            {previewViewDatas.sheets.map(function (sheet, index) {
                let source = new GC.Spread.Sheets.Bindings.CellBindingSource(
                    previewViewDatas.datas
                );
                return (
                    <Worksheet
                        name={sheet.sheetName}
                        key={index}
                        dataSource={source}
                    ></Worksheet>
                );
            })}
        </SpreadSheets>
    );
}

export default PreviewView;
