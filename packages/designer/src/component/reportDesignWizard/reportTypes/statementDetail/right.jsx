import {
  useContext,
  useEffect,
  useState,
} from 'react';

import { useSelector } from 'react-redux';
import styled from 'styled-components';

import {
  Workbook,
  Worksheet,
} from '@toone/report-excel';
import { getNamespace } from '@utils/spreadUtil';

import DesignerContext from '../../../../DesignerContext';

const GC = getNamespace();
const spreadNS = GC.Spread.Sheets;

function preview(params) {
    const { value, field = [], exclude = [], spread } = params;

    //构造表格字段
    const tableColumns = field.reduce(function (result, { id, code, name }) {
        if (!exclude.includes(code)) {
            const tableColumn = new spreadNS.Tables.TableColumn(id, code, name);
            result.push(tableColumn);
        }
        return result;
    }, []);
    spread.suspendPaint();
    const sheet = spread.getActiveSheet();

    //创建表格前先移除所有的表格
    sheet.tables.all().forEach(function (table) {
        sheet.tables.remove(table);
    });

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
                sheet.setRowCount(datasLen + 2);
            }
        }

        const tableName = '预览';
        const table = sheet.tables.add(tableName, 0, 0, 3, colCount);
        table.autoGenerateColumns(false);
        table.bindColumns(tableColumns);
        table.bindingPath(value);
        for (let i = 0; i < colCount; i++) {
            table.filterButtonVisible(i, false);
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
                const sheet = spread.getActiveSheet();
                const dataSource = JSON.parse(JSON.stringify(previewViewDatas));
                const source = new spreadNS.Bindings.CellBindingSource(
                    dataSource
                );
                sheet.setDataSource(source);
            }
        },
        [previewViewDatas, spread]
    );

    useEffect(
        function () {
            if (spread) {
                preview({
                    value,
                    field,
                    exclude,
                    spread,
                });
            }
        },
        [value, field, exclude, spread]
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
