import React from 'react';

import {
  useDispatch,
  useSelector,
} from 'react-redux';
import styled from 'styled-components';

import {
  SpreadSheets,
  Worksheet,
} from '@grapecity/spread-sheets-react';

import CellStyleSetting from './component/cellStyles/cellStyleSetting';
import {
  DraggableDatasourceList,
} from './component/defineDatasource/defineDatasource';
import Nav from './Nav';
import { setSpread } from './store/appSlice/appSlice';
import { updateDslist } from './store/datasourceSlice/datasourceSlice';
import { parseCellFont } from './store/fontSlice/fontSlice';
import { resetView } from './store/viewSlice/viewSlice';
import { findTreeNodeById } from './utils/commonUtil';
import { getCellTag } from './utils/worksheetUtil';

const Wrap = styled.div`
    height: 100%;
    width: 100%;
    overflow: hidden;
    display: flex;
    flex-direction: column;
`;

const SpreadWrap = styled.div`
    display: flex;
    height: 100%;
    width: 100%;
`;

function Designer(props) {
    const dispatch = useDispatch();
    let {
        datasourceSlice: { dsList },
    } = useSelector((state) => state);
    const spreadBackColor = 'aliceblue';
    const sheetName = 'Person Address';
    const autoGenerateColumns = false;
    function valueChanged(event, info) {
        const { sheet, row, col, newValue } = info;
        const bindInfo = getCellTag(sheet, row, col, 'bindInfo');
        if (bindInfo && bindInfo.bindType === 'tableColumn') {
            const ds = findTreeNodeById(bindInfo.bindDsInstanceId, dsList);
            dispatch(
                updateDslist({
                    newData: {
                        ...ds,
                        name: newValue,
                    },
                    isSave: true,
                })
            );
        }
    }
    return (
        <Wrap>
            <Nav></Nav>
            <SpreadWrap>
                <DraggableDatasourceList></DraggableDatasourceList>
                <SpreadSheets
                    backColor={spreadBackColor}
                    workbookInitialized={function (spread) {
                        dispatch(setSpread({ spread }));
                    }}
                    enterCell={function (event, info) {
                        dispatch(parseCellFont());
                    }}
                    activeSheetChanged={(evt, info) => {
                        dispatch(parseCellFont());
                        dispatch(resetView());
                    }}
                    valueChanged={valueChanged}
                >
                    <Worksheet
                        name={sheetName}
                        autoGenerateColumns={autoGenerateColumns}
                        rowCount={20}
                        colCount={100}
                    ></Worksheet>
                </SpreadSheets>
            </SpreadWrap>
            <CellStyleSetting></CellStyleSetting>
        </Wrap>
    );
}

export default Designer;
