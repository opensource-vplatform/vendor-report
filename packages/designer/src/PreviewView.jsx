import React, { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import GC from '@grapecity/spread-sheets';
import { SpreadSheets, Worksheet } from '@grapecity/spread-sheets-react';

import { setPreviewViewDatas } from './store/datasourceSlice/datasourceSlice';

const PreviewViewBox = styled.div`
    height: 100%;
    width: 100%;
    position: fixed;
    top: 0px;
    left: 0px;
    z-index: 1;
    display: flex;
    flex-direction: column;
    background-color: rgb(255, 255, 255);
`;

const PreviewViewBoxTop = styled.div`
    height: 40px;
    border: 1px solid rgb(221, 221, 221);
    display: flex;
    justify-content: end;
    align-items: center;
    padding-right: 10px;
`;

const CloseBtn = styled.button`
    border: 1px solid #ddd;
    border-radius: 4px;
    height: 26px;
    padding: 0 12px;
    cursor: pointer;
`;

function PreviewView() {
    const dispatch = useDispatch();
    const { previewViewDatas } = useSelector(
        ({ datasourceSlice }) => datasourceSlice
    );
    const [spread, setSpread] = useState(null);

    useEffect(function () {
        if (spread) {
            spread.sheets.forEach(function (sheet, index) {
                const sheetsInfo = previewViewDatas.sheets[index];
                sheet.tables.all().forEach(function (table) {
                    sheet.tables.remove(table);
                });
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
        <PreviewViewBox>
            <PreviewViewBoxTop>
                <CloseBtn
                    onClick={function () {
                        dispatch(setPreviewViewDatas());
                    }}
                >
                    关闭
                </CloseBtn>
            </PreviewViewBoxTop>
            <SpreadSheets
                workbookInitialized={function (spread) {
                    setSpread(spread);
                }}
            >
                {previewViewDatas.sheets.map(function (sheet, index) {
                    let source =
                        new GC.Spread.Sheets.Bindings.CellBindingSource(
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
        </PreviewViewBox>
    );
}

export default PreviewView;
