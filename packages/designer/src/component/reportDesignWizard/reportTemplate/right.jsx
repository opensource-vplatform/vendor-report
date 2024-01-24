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
        for (let i = 0; i < colCount; i++) {
            table.filterButtonVisible(i, false);
        }
        if (groups.length > 0) {
            try {
                const range = table.range();
                range.colCount = groups.length;
                sheet.autoMerge(range, 1, 1, 3, 1);
            } catch (error) {}
        }
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
                    const { datas } = sortData(dataSource[value], groups);
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
