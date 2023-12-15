import { useCallback } from 'react';

import {
  useDispatch,
  useSelector,
} from 'react-redux';
import styled from 'styled-components';

import Button from '@components/button/Index';
import GC from '@grapecity/spread-sheets';
import {
  SpreadSheets,
  Worksheet,
} from '@grapecity/spread-sheets-react';

import { setMode } from './store/appSlice/appSlice';

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

export default function () {
    const dispatch = useDispatch();
    const {
        datasourceSlice: { previewViewDatas },
        appSlice: { spread: sourceSpread },
    } = useSelector((state) => state);

    const workbookInitializedHandler = useCallback(function (spread) {
        const sourceJson = JSON.stringify(sourceSpread.toJSON());
        spread.fromJSON(JSON.parse(sourceJson));
        //设置数据源
        spread.sheets.forEach(function (sheet) {
            const source = new GC.Spread.Sheets.Bindings.CellBindingSource(
                previewViewDatas
            );

            /*  sheet.tables.all().forEach(function (table) {
                table.expandBoundRows(true);
            }); */

            /*  const ranges = [];
            const sheetRowCount = sheet.getRowCount();
            sheet.tables.all().forEach(function (table) {
                table.expandBoundRows(true);
                let { row, col, rowCount, colCount } = table.range();
                const path = table.bindingPath();
                //根据数据源计算表格区域
                if (path && Array.isArray(previewViewDatas[path])) {
                    rowCount += previewViewDatas[path].length;
                    //table.insertRows(0, previewViewDatas[path].length);
                }
                let endRow = row + rowCount;
                let endCol = col + colCount;

                ranges.push({
                    row,
                    col,
                    rowCount,
                    colCount,
                    endRow,
                    endCol,
                    table,
                });
            });

            //冒泡排序
            const len = ranges.length;
            for (let i = 0; i < len - 1; i++) {
                for (let j = 0; j < len - 1 - i; j++) {
                    if (ranges[j].row > ranges[j + 1].row) {
                        [ranges[j], ranges[j + 1]] = [ranges[j + 1], ranges[j]];
                    }
                }
            }

            let maxNeedInsertRowCount =
                ranges.length > 0
                    ? ranges[0].endRow > sheetRowCount
                        ? ranges[0].endRow - sheetRowCount
                        : 0
                    : 0;
            debugger;
            for (let i = 1; i < len; i++) {
                const pre = ranges[i - 1];
                const cur = ranges[i];
                let isOverlap = false;
                if (!(cur.row > pre.endRow || cur.endRow < pre.row)) {
                    if (!(cur.col > pre.endCol || cur.endCol < pre.col)) {
                        isOverlap = true;
                    }
                }
                if (isOverlap) {
                    cur.endRow = pre.endRow - cur.row + cur.endRow;
                    cur.row = pre.endRow;
                    const needInsertRowCount =
                        cur.endRow > sheetRowCount
                            ? cur.endRow - sheetRowCount
                            : 0;
                    //sheet.tables.move(cur.table, cur.row, cur.col);
                    cur.isNeedMove = true;
                    if (needInsertRowCount > maxNeedInsertRowCount) {
                        maxNeedInsertRowCount = needInsertRowCount;
                    }
                }
            }
            spread.suspendPaint();
            sheet.addRows(sheetRowCount, maxNeedInsertRowCount);
            ranges.forEach(function ({ isNeedMove, table, row, col }) {
                isNeedMove && sheet.tables.move(table, row, col);
            });
            spread.resumePaint(); */
            sheet.setDataSource(source);
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
                <SpreadSheets workbookInitialized={workbookInitializedHandler}>
                    <Worksheet></Worksheet>
                </SpreadSheets>
            </ExcelWrap>
        </Wrap>
    );
}
