import {
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';

import { useSelector } from 'react-redux';
import styled from 'styled-components';

import {
  Workbook,
  Worksheet,
} from '@toone/report-excel';
import { sortData } from '@utils/commonUtil';
import { getNamespace } from '@utils/spreadUtil';

import DesignerContext from '../../../DesignerContext';

const GC = getNamespace();
const spreadNS = GC.Spread.Sheets;

function indexToColumn(index) {
    let column = '';
    while (index >= 0) {
        column = String.fromCharCode((index % 26) + 65) + column;
        index = Math.floor(index / 26) - 1;
    }
    return column;
}

function preview(params) {
    const { value, field = [], exclude = [], spread, groups = [] } = params;

    //构造表格字段
    const groupsField = [];
    const tableColumns = field.reduce(function (result, { id, code, name }) {
        if (!exclude.includes(code)) {
            const tableColumn = new spreadNS.Tables.TableColumn(id, code, name);
            const inGroupsIndex = groups.findIndex((group) => group?.id === id);
            if (inGroupsIndex > -1) {
                groupsField[inGroupsIndex] = tableColumn;
            } else {
                result.push(tableColumn);
            }
        }
        return result;
    }, []);
    tableColumns.unshift(...groupsField);
    spread.suspendPaint();
    const sheet = spread.getActiveSheet();
    //创建表格前先移除所有的表格
    sheet.tables.all().forEach(function (table) {
        const range = table.range();
        sheet.autoMerge(range, 0);
        sheet.tables.remove(table);
    });
    spread.resumePaint();
    spread.suspendPaint();
    //表格字段数量大于0才创建表格
    const colCount = tableColumns.length;
    let _table = null;
    if (colCount > 0) {
        //如果sheet的行数小于当前表格所绑定的数据长度，需要增加sheet的行数
        const datasource = sheet.getDataSource().getSource();
        const datas = datasource[value];
        if (Array.isArray(datas)) {
            const rowCount = sheet.getRowCount();
            const datasLen = datas.length;
            if (rowCount < datasLen) {
                sheet.setRowCount(datasLen + 5);
            }
        }
        const tableStyle = new GC.Spread.Sheets.Tables.TableTheme();

        const tableName = '预览';
        const table = sheet.tables.add(
            tableName,
            0,
            0,
            3,
            colCount,
            tableStyle
        );

        table.autoGenerateColumns(false);
        table.bindColumns(tableColumns);
        table.bindingPath(value);
        _table = table;
        for (let i = 0; i < colCount; i++) {
            table.filterButtonVisible(i, false);
        }
        if (groups.length > 0) {
            try {
                const range = table.range();
                range.colCount = groups.length;
                //sheet.autoMerge(range, 1, 1, 3, 1);
            } catch (error) {}
        }
    }
    spread.resumePaint();

    //对表格区域的数据进行合并
    spread.suspendPaint();
    if (Array.isArray(window.spansInfo)) {
        const { row, col } = _table.range();
        let startRow = row + 1;
        const groupStartRows = groups.map(() => startRow);
        let preGroupIndex = -1;
        window.spansInfo.forEach(function ({
            datasLen = 0,
            virtualDatasLen,
            field,
            groupCode,
            isNull,
        }) {
            let endCol = field.length + col + groups.length;
            const groupIndex = groups.findIndex(
                ({ code }) => code === groupCode
            );
            for (let i = 0; i < datasLen; i++) {
                let startCol = col + groups.length;
                let spanRowCount = virtualDatasLen + 1;
                let hRowStartIndex = virtualDatasLen;
                while (startCol < endCol) {
                    //纵向合并
                    sheet.addSpan(startRow + i, startCol, spanRowCount, 1);
                    //横向合并
                    if (hRowStartIndex > 0) {
                        sheet.addSpan(
                            startRow + hRowStartIndex + i,
                            startCol + 1,
                            1,
                            endCol - startCol - 1
                        );
                    }
                    startCol++;
                    spanRowCount--;
                    hRowStartIndex--;
                }
                startRow += virtualDatasLen;
            }
            startRow += datasLen + 1;
            if (groupCode) {
                //对每一组的汇总行进行横向合并
                const _row = startRow - 1;
                const _col = col + groupIndex + 1;
                const rowCount = 1;
                const colCount = endCol - 1 - groupIndex;
                sheet.addSpan(_row, _col, rowCount, colCount);

                //对分组名进行合并
                const groupRowStart = groupStartRows[groupIndex];
                sheet.addSpan(
                    groupRowStart,
                    col + groupIndex,
                    startRow - groupRowStart,
                    1
                );
                groupStartRows[groupIndex] = startRow;
                let j = 1;
                for (let i = 0; i < groupStartRows.length; i++) {
                    if (i > groupIndex) {
                        groupStartRows[i] = groupStartRows[i] + j;
                        j++;
                    }
                }
                preGroupIndex = groupIndex;
            } else {
                //对最后的汇总结果行横向合并
                sheet.addSpan(startRow - 1, col, 1, endCol);
            }
        });
    }
    spread.resumePaint();
}

const Wrap = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
    overflow: hidden;
    flex: 1;
`;

const Header = styled.div`
    height: 36px;
    display: flex;
    align-items: center;
    box-sizing: border-box;
    padding: 0 12px;
    border-bottom: 1px solid #ddd;
`;

const Footer = styled.div`
    height: 100%;
    width: 100%;
    flex: 1;
`;

export default function Index(props) {
    const { previewViewDatas } = useSelector(
        ({ datasourceSlice }) => datasourceSlice
    );
    const _refState = useRef({});
    let { groups } = useSelector(({ wizardSlice }) => wizardSlice);

    _refState.current.groups = groups;

    const [spread, setSpread] = useState(null);
    const { value, field, exclude } = props;
    const context = useContext(DesignerContext);
    //许可证
    const license = context?.conf?.license;

    const onInitedHandler = function (spread) {
        setSpread(spread);
    };

    useEffect(
        function () {
            if (spread) {
                spread.removeSheet(0);
                spread.addSheet();
                const sheet = spread.getActiveSheet();
                const dataSource = JSON.parse(JSON.stringify(previewViewDatas));
                if (groups.length > 0) {
                    const { datas } = sortData(
                        dataSource[value],
                        groups,
                        field
                    );
                    dataSource[value] = datas;
                }
                const source = new spreadNS.Bindings.CellBindingSource(
                    dataSource
                );
                sheet.setDataSource(source);
            }
        },
        [previewViewDatas, spread, groups, value]
    );

    useEffect(
        function () {
            if (spread) {
                if (_refState.current.previewSetTimeoutId) {
                    clearTimeout(_refState.current.previewSetTimeoutId);
                }
                _refState.current.previewSetTimeoutId = setTimeout(() => {
                    preview({
                        value,
                        field,
                        exclude,
                        spread,
                        groups: _refState.current.groups,
                    });
                }, 0);
            }
        },
        [value, field, exclude, spread, groups]
    );
    return (
        <Wrap>
            <Header>预览</Header>
            <Footer>
                <Workbook
                    license={license}
                    onInited={onInitedHandler}
                    tabStripVisible={false}
                >
                    <Worksheet></Worksheet>
                </Workbook>
            </Footer>
        </Wrap>
    );
}
