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
  Workbook,
  Worksheet,
} from '@toone/report-excel';
import {
  genSpans,
  sortData,
} from '@utils/commonUtil';
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
    } = params;

    //构造表格字段
    const _field = [...groups, ...field, ...sumColumns];
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
        const res = genSpans(spansTree, 1, 0);
        spans = res.spans;
        dataTableStyle = res.dataTableStyle;
    }

    const json = sheet.toJSON();
    //json.data.dataTable = { ...json.data.dataTable, ...dataTableStyle };
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
    const { value, field, exclude } = props;
    const context = useContext(DesignerContext);
    //许可证
    const license = context?.conf?.license;

    const onInitedHandler = function (spread) {
        setSpread(spread);
    };

    //数据源
    const source = useMemo(() => {
        const dataSource = JSON.parse(JSON.stringify(previewViewDatas));
        const { groups = [], sumColumns = [] } = wizardSlice;

        _refState.spansTree = null;
        if (groups.length > 0 || sumColumns.length > 0) {
            const { datas, spansTree } = sortData(
                dataSource[value],
                groups,
                field,
                sumColumns
            );
            dataSource[value] = datas;
            _refState.spansTree = spansTree;
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
