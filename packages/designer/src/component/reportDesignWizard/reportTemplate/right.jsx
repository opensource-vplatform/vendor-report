import {
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import { useSelector } from 'react-redux';
import styled from 'styled-components';

import {
  genSpans,
  sortData,
  Workbook,
  Worksheet,
} from '@toone/report-excel';
import CrossDatas from '@utils/crossDatas';
import { getNamespace } from '@utils/spreadUtil';

import DesignerContext from '../../../DesignerContext';

const GC = getNamespace();
const spreadNS = GC.Spread.Sheets;

function preview(params) {
    const {
        value,
        field = [],
        exclude = [],
        spread,
        spansTree,
        source: datasource,
        wizardSlice: { groups = [], sumColumns = [] },
        reportType,
        crossColumns = [],
    } = params;

    //构造表格字段
    let _field = [...groups, ...field, ...sumColumns];
    if (reportType === 'crossStatement') {
        _field = crossColumns;
    }

    const { columns, filterButtonVisibleInfo } = _field.reduce(
        function (result, { id, code, name }, index) {
            if (!exclude.includes(code)) {
                result.columns.push({
                    id,
                    name,
                    dataField: code,
                });
                result.filterButtonVisibleInfo[index] = false;
            }
            return result;
        },
        { columns: [], filterButtonVisibleInfo: {} }
    );

    const sheet = spread.getActiveSheet();
    const colCount = columns.length;
    const tables = [];
    if (colCount > 0) {
        let rowCount = 0;
        //如果sheet的行数小于当前表格所绑定的数据长度，需要增加sheet的行数
        const datas = datasource.getValue(value);

        if (Array.isArray(datas)) {
            const sheetRowCount = sheet.getRowCount();
            rowCount = datas.length;
            sheetRowCount < rowCount && sheet.setRowCount(rowCount + 5);
        }

        tables.push({
            name: '预览',
            row: 0,
            col: 0,
            rowCount: rowCount + 1,
            colCount,
            style: {},
            autoGenerateColumns: false,
            bindingPath: value,
            rowFilter: {
                range: { row: 1, col: 0, rowCount, colCount },
                typeName: 'HideRowFilter',
                dialogVisibleInfo: {},
                filterButtonVisibleInfo,
                showFilterButton: false,
                filteredOutRows: [],
                tableName: '预览',
            },
            columns,
        });
    }

    let spans = [];
    let dataTableStyle = {};
    if (Array.isArray(spansTree)) {
        debugger;
        const res = genSpans(spansTree, 1, 0);
        spans = res.spans;
        dataTableStyle = res.dataTableStyle;
    }
    if (colCount > sheet.getColumnCount()) {
        sheet.addColumns(0, colCount - sheet.getColumnCount());
    }

    const json = sheet.toJSON();
    json.data.dataTable = { ...json.data.dataTable, ...dataTableStyle };
    json.tables = tables;
    json.spans = spans;

    spread.suspendPaint();
    sheet.fromJSON(json);
    sheet.setDataSource(datasource);
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
    const _refState = useRef({ spansTree: null }).current;
    const wizardSlice = useSelector(({ wizardSlice }) => wizardSlice);

    const [spread, setSpread] = useState(null);
    const { value, field, exclude, reportType } = props;
    const context = useContext(DesignerContext);
    //许可证
    const license = context?.conf?.license;

    const onInitedHandler = function (spread) {
        setSpread(spread);
    };

    //数据源
    const source = useMemo(() => {
        const dataSource = JSON.parse(JSON.stringify(previewViewDatas));
        const {
            groups = [],
            sumColumns = [],
            row = [],
            col = [],
        } = wizardSlice;

        _refState.spansTree = null;
        if (
            (groups.length > 0 || sumColumns.length > 0) &&
            reportType !== 'crossStatement' &&
            Array.isArray(dataSource[value])
        ) {
            const { datas, spansTree } = sortData(
                dataSource[value],
                groups,
                field,
                sumColumns
            );
            dataSource[value] = datas;
            _refState.spansTree = spansTree;
        }
        if (
            reportType === 'crossStatement' &&
            (!!sumColumns.length || !!row.length || !!col.length)
        ) {
            const crossDatas = new CrossDatas({
                datas: dataSource[value],
                rowFields: row,
                colFields: col,
                summationFields: sumColumns,
            });
            dataSource[value] = crossDatas.sumDatas;
            _refState.crossColumns = crossDatas.tableColumns;
            _refState.spansTree = crossDatas.spansArr;
            console.log(_refState.spansTree);
            debugger;
        }

        return new spreadNS.Bindings.CellBindingSource(dataSource);
    }, [wizardSlice, previewViewDatas, field]);

    useEffect(() => {
        if (spread) {
            window.zonaSpread = spread;
            preview({
                value,
                field,
                exclude,
                spread,
                wizardSlice,
                spansTree: _refState.spansTree,
                source,
                reportType,
                crossColumns: _refState.crossColumns,
            });
        }
    }, [value, exclude, spread, source]);

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
