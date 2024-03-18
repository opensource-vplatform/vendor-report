import { useContext } from 'react';

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

import DesignerContext from './DesignerContext';
import { setMode } from './store/appSlice/appSlice';
import { getBaseUrl } from './utils/environmentUtil';

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

//如果表格允许行合并或者列合并(相邻单元格数据相同会自动合并成一个单元格)，则对数据进行处理
function handleDatas(params) {
    const { rowMerge, columnMerge, dataSource, originalDatasourceCodes } =
        params;
    if (rowMerge || columnMerge) {
        Object.keys(dataSource).forEach((key) => {
            if (
                !originalDatasourceCodes[key] &&
                Array.isArray(dataSource[key])
            ) {
                if (rowMerge && columnMerge) {
                    dataSource[key] = dataSource.mergeDatas.rowColumn[key];
                } else if (rowMerge) {
                    dataSource[key] = dataSource.mergeDatas.row[key];
                } else if (columnMerge) {
                    dataSource[key] = dataSource.mergeDatas.column[key];
                }
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
        originalDatasourceCodes,
        rowMergeColumns,
        colMergeColumns,
    } = useSelector(({ datasourceSlice }) => datasourceSlice);

    const { rowMerge, columnMerge } = useSelector(
        ({ tableDesignSlice }) => tableDesignSlice
    );
    debugger;
    handleDatas({
        rowMerge,
        columnMerge,
        dataSource: previewViewDatas,
        originalDatasourceCodes,
    });
    const { spread: sourceSpread } = useSelector(({ appSlice }) => appSlice);
    const sourceJson = JSON.stringify(
        sourceSpread ? sourceSpread?.toJSON?.() : '',
        replacer
    );
    const json = JSON.parse(sourceJson);
    //许可证
    const license = context?.conf?.license;
    let printHandler = null;
    const handlePrint = () => {
        printHandler && printHandler();
    };
    return (
        <Wrap>
            <Toolbar>
                <Button
                    style={{ marginRight: 8 }}
                    type='primary'
                    onClick={handlePrint}
                >
                    打印
                </Button>
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
                    enablePrint={true}
                    baseUrl={getBaseUrl()}
                    onPrintHandler={(handler) => {
                        printHandler = handler;
                    }}
                    rowMerge={rowMerge}
                    columnMerge={columnMerge}
                    dataSource={previewViewDatas}
                    sumColumns={sumColumns}
                    groupColumns={tableGroups}
                    rowMergeColumns={rowMergeColumns}
                    colMergeColumns={colMergeColumns}
                    onInited={function (a) {
                        debugger;
                    }}
                >
                    <Worksheet></Worksheet>
                </Workbook>
            </ExcelWrap>
        </Wrap>
    );
}
