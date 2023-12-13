import React, { useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { SpreadSheets, Worksheet } from '@grapecity/spread-sheets-react';

import DataService from './assets/dataService';
import CellStyleSetting from './component/cellStyles/cellStyleSetting';
import { DraggableDatasourceList } from './component/defineDatasource/defineDatasource';
import { Tab, Tabs } from './component/tabs/Index';
import { setSpread } from './store/appSlice/appSlice';
import { updateDslist } from './store/datasourceSlice/datasourceSlice';
import { parseCellFont } from './store/fontSlice/fontSlice';
import { resetView } from './store/viewSlice/viewSlice';
import FileTab from './tabs/file/Index';
import StartTab from './tabs/start/Index';
import TestTab from './tabs/test/Index';
import ViewTab from './tabs/view/Index';
import { findTreeNodeById } from './utils/commonUtil';
import { getCellTag } from './utils/worksheetUtil';

function Designer(props) {
    const dispatch = useDispatch();
    let {
        datasourceSlice: { dsList },
    } = useSelector((state) => state);
    const spreadBackColor = 'aliceblue';
    const sheetName = 'Person Address';
    const autoGenerateColumns = false;
    const data = DataService.getPersonAddressData();
    const [fileTabVisible, setFileTabVisible] = useState(false);
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
        <div
            style={{
                height: '100%',
                width: '100%',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            {fileTabVisible ? (
                <FileTab
                    closeHandler={() => setFileTabVisible(false)}
                ></FileTab>
            ) : null}
            <Tabs value='start'>
                <Tab
                    code='file'
                    title={
                        <a
                            style={{
                                padding: '6px 12px 6px 12px',
                                display: 'block',
                                color: 'white',
                                cursor: 'pointer',
                                background: '#217346',
                                fontSize: '12px',
                                fontWeight: 700,
                                margin: '0px 3px',
                            }}
                        >
                            文件
                        </a>
                    }
                    onClick={() => setFileTabVisible(true)}
                >
                    文件
                </Tab>
                <Tab code='start' title='开始'>
                    <StartTab />
                </Tab>
                <Tab code='view' title='视图'>
                    <ViewTab></ViewTab>
                </Tab>
                <Tab code='test' title='组件测试'>
                    <TestTab />
                </Tab>
            </Tabs>
            <div style={{ display: 'flex', height: '100%', width: '100%' }}>
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
            </div>
            <CellStyleSetting></CellStyleSetting>
        </div>
    );
}

export default Designer;
