import React, { useState } from 'react';

import { useDispatch } from 'react-redux';

import {
  SpreadSheets,
  Worksheet,
} from '@grapecity/spread-sheets-react';

import DataService from './assets/dataService';
import CellStyleSetting from './component/cellStyles/cellStyleSetting';
import {
  DraggableDatasourceList,
} from './component/defineDatasource/defineDatasource';
import {
  Tab,
  Tabs,
} from './component/tabs/Index';
import { setSpread } from './store/appSlice/appSlice';
import { parseCellFont } from './store/fontSlice/fontSlice';
import { resetView } from './store/viewSlice/viewSlice';
import FileTab from './tabs/file/Index';
import StartTab from './tabs/start/Index';
import TestTab from './tabs/test/Index';
import ViewTab from './tabs/view/Index';

function Designer(props) {
    const dispatch = useDispatch();
    const spreadBackColor = 'aliceblue';
    const sheetName = 'Person Address';
    const autoGenerateColumns = false;
    const data = DataService.getPersonAddressData();
    const [fileTabVisible, setFileTabVisible] = useState(false);
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
                <SpreadSheets
                    backColor={spreadBackColor}
                    workbookInitialized={function (spread) {
                        dispatch(setSpread({ spread }));
                    }}
                    enterCell={function (event, spread) {
                        dispatch(parseCellFont());
                    }}
                    activeSheetChanged={(evt,spread)=>{
                        dispatch(parseCellFont());
                        dispatch(resetView());
                    }}
                >
                    <Worksheet
                        name={sheetName}
                        /* dataSource={data} */
                        autoGenerateColumns={autoGenerateColumns}
                        rowCount={20}
                        colCount={100}
                    >
                        {/* <Column width={150} dataField='Name' />
                    <Column width={150} dataField='CountryRegionCode' />
                    <Column width={100} dataField='City' />
                    <Column width={200} dataField='AddressLine' />
                    <Column width={100} dataField='PostalCode' /> */}
                    </Worksheet>
                </SpreadSheets>
                <DraggableDatasourceList></DraggableDatasourceList>
            </div>
            <CellStyleSetting></CellStyleSetting>
        </div>
    );
}

export default Designer;
