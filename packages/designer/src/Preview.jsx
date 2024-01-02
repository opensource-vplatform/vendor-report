import { useCallback } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import Button from '@components/button/Index';
import { Workbook, Worksheet } from '@components/spread/Index';
import { getNamespace } from '@utils/spreadUtil';

import { setMode } from './store/appSlice/appSlice';

const GC = getNamespace();
const GCsheets = GC.Spread.Sheets;

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

//表格合并
function tableMerge(params) {
    const { sheet, rowMerge, columnMerge } = params;
    const tables = sheet.tables.all();
    if (tables.length > 0 && (rowMerge || columnMerge)) {
        let direction = GCsheets.AutoMerge.AutoMergeDirection.column; //1
        let mode = GCsheets.AutoMerge.AutoMergeMode.free; //0
        let sheetArea = GCsheets.SheetArea.viewport; //3
        let selectionMode = GCsheets.AutoMerge.SelectionMode.source; //0

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
}

function handleDatas(params) {
    const { sheet, rowMerge, columnMerge, dataSource } = params;
    const tables = sheet.tables.all();
    if (tables.length > 0 && (rowMerge || columnMerge)) {
        tables.forEach(function (table) {
            const path = table.bindingPath();
            if (rowMerge && columnMerge) {
                dataSource[path] = dataSource.mergeDatas.rowColumn[path];
            } else if (rowMerge) {
                dataSource[path] = dataSource.mergeDatas.row[path];
            } else if (columnMerge) {
                dataSource[path] = dataSource.mergeDatas.column[path];
            }
        });
    }
}

export default function () {
    const dispatch = useDispatch();
    const { previewViewDatas } = useSelector(
        ({ datasourceSlice }) => datasourceSlice
    );

    const { rowMerge, columnMerge } = useSelector(
        ({ tableDesignSlice }) => tableDesignSlice
    );

    const { spread: sourceSpread } = useSelector(({ appSlice }) => appSlice);

    const workbookInitializedHandler = useCallback(function (spread) {
        const sourceJson = JSON.stringify(sourceSpread.toJSON(), replacer);
        spread.fromJSON(JSON.parse(sourceJson));
        spread.sheets.forEach(function (sheet) {
            const dataSource = JSON.parse(JSON.stringify(previewViewDatas));
            handleDatas({
                sheet,
                rowMerge,
                columnMerge,
                dataSource,
            });
            const source = new GCsheets.Bindings.CellBindingSource(dataSource);
            sheet.setDataSource(source);
            tableMerge({
                sheet,
                rowMerge,
                columnMerge,
            });
        });
    });

    return (
        <Wrap>
            <Toolbar>
                <Button
                    style={{ marginRight: 8 }}
                    onClick={() => {
                        dispatch(setMode({ mode: 'edit' }));
                    }}
                >
                    编辑
                </Button>
            </Toolbar>
            <ExcelWrap>
                <Workbook inited={workbookInitializedHandler}>
                    <Worksheet></Worksheet>
                </Workbook>
            </ExcelWrap>
        </Wrap>
    );
}
