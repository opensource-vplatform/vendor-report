import React, { useState } from 'react';

import { useDispatch } from 'react-redux';

import {
  Column,
  SpreadSheets,
  Worksheet,
} from '@grapecity/spread-sheets-react';

import DataService from './assets/dataService';
import CellStyleSetting from './component/cellStyles/cellStyleSetting';
import {
  Tab,
  Tabs,
} from './component/tabs/Index';
import { setSpread } from './store/appSlice/appSlice';
import { resetCellFont } from './store/fontSlice/fontSlice';
import FileTab from './tabs/file/Index';
import StartTab from './tabs/start/Index';
import TestTab from './tabs/test/Index';

function Designer(props) {
    const dispatch = useDispatch();
    const spreadBackColor = 'aliceblue';
    const sheetName = 'Person Address';
    const autoGenerateColumns = false;
    const data = DataService.getPersonAddressData();
    const [fileTabVisible, setFileTabVisible] = useState(false);
    return (
        <div style={{ height: '100%', width: '100%', overflow: 'hidden' }}>
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
                <Tab code='test' title='组件测试'>
                    <TestTab/>
                </Tab>
            </Tabs>
            <SpreadSheets
                backColor={spreadBackColor}
                workbookInitialized={function (spread) {
                    dispatch(setSpread({ spread }));
                }}
                enterCell={function (event, spread) {
                    dispatch(resetCellFont());
                }}
            >
                <Worksheet
                    name={sheetName}
                    dataSource={data}
                    autoGenerateColumns={autoGenerateColumns}
                >
                    <Column width={150} dataField='Name' />
                    <Column width={150} dataField='CountryRegionCode' />
                    <Column width={100} dataField='City' />
                    <Column width={200} dataField='AddressLine' />
                    <Column width={100} dataField='PostalCode' />
                </Worksheet>
            </SpreadSheets>
            <CellStyleSetting></CellStyleSetting>
        </div>
    );
}

export default Designer;
