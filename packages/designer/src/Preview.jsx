import {
  useCallback,
  useContext,
} from 'react';

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
import {
  genSpans,
  sortData,
} from '@utils/commonUtil';
import { getNamespace } from '@utils/spreadUtil';

import DesignerContext from './DesignerContext';
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

//表格合并
function tableMerge(params) {
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
    const context = useContext(DesignerContext);
    const dispatch = useDispatch();
    const {
        previewViewDatas,
        tableGroups,
        sumColumns,
        previewViewDatasHasInit,
    } = useSelector(({ datasourceSlice }) => datasourceSlice);

    const { rowMerge, columnMerge } = useSelector(
        ({ tableDesignSlice }) => tableDesignSlice
    );

    const { spread: sourceSpread } = useSelector(({ appSlice }) => appSlice);
    const sourceJson = JSON.stringify(sourceSpread.toJSON(), replacer);
    const json = JSON.parse(sourceJson);
    const workbookInitializedHandler = useCallback(function (spread) {
        spread.suspendPaint();
        spread.sheets.forEach(function (sheet) {
            const dataSource = JSON.parse(JSON.stringify(previewViewDatas));
            const tables = sheet.tables.all();
            const tablesSpans = [];

            //对数据进行分组排序
            if (tables.length > 0) {
                tables.forEach(function (table) {
                    const tableName = table.name();
                    const groups = tableGroups[tableName];
                    const sums = sumColumns[tableName];
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
                        const { datas, spansTree } = sortData(
                            dataSource[path],
                            groups,
                            fields,
                            sums
                        );
                        dataSource[path] = datas;
                        const result = genSpans(spansTree, row + 1, col);
                        tablesSpans.push(...result.spans);
                    }
                });
            }

            !previewViewDatasHasInit &&
                handleDatas({
                    sheet,
                    rowMerge,
                    columnMerge,
                    dataSource,
                });

            const source = new GCsheets.Bindings.CellBindingSource(dataSource);
            sheet.setDataSource(source);
            const json = sheet.toJSON();
            json.spans = Array.isArray(json.spans) ? json.spans : [];
            json.spans.push(...tablesSpans);
            sheet.fromJSON(json);
            sheet.setDataSource(source);
            tableMerge({
                sheet,
                rowMerge,
                columnMerge,
            });
        });
        spread.resumePaint();
    });
    //许可证
    const license = context?.conf?.license;
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
                <Workbook
                    license={license}
                    json={json}
                    onInited={workbookInitializedHandler}
                >
                    <Worksheet></Worksheet>
                </Workbook>
            </ExcelWrap>
        </Wrap>
    );
}
