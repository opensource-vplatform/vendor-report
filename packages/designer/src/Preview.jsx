import { useCallback } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import Button from '@components/button/Index';
import { Workbook, Worksheet } from '@components/spread/Index';
import { getNamespace } from '@utils/spreadUtil';

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

function replacer(key, value) {
    //删除角标信息
    if (key === 'cornerFold' && value?.markType === 'table') {
        return undefined;
    }
    return value;
}

export default function () {
    const dispatch = useDispatch();
    const { previewViewDatas } = useSelector(
        ({ datasourceSlice }) => datasourceSlice
    );

    const { spread: sourceSpread } = useSelector(({ appSlice }) => appSlice);

    const workbookInitializedHandler = useCallback(function (spread) {
        const sourceJson = JSON.stringify(sourceSpread.toJSON(), replacer);
        spread.fromJSON(JSON.parse(sourceJson));
        spread.sheets.forEach(function (sheet) {
            const GC = getNamespace();
            const source = new GC.Spread.Sheets.Bindings.CellBindingSource(
                JSON.parse(JSON.stringify(previewViewDatas))
            );
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
                <Workbook inited={workbookInitializedHandler}>
                    <Worksheet></Worksheet>
                </Workbook>
            </ExcelWrap>
        </Wrap>
    );
}
