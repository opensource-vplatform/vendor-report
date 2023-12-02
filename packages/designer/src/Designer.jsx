import React from 'react';

import { useDispatch } from 'react-redux';

import {
  Column,
  SpreadSheets,
  Worksheet,
} from '@grapecity/spread-sheets-react';

import DataService from './assets/dataService';
import {
  Tab,
  Tabs,
} from './component/tabs/Index';
import { setSpread } from './store/appSlice/appSlice';
import { resetCellFont } from './store/fontSlice/fontSlice';
import StartTab from './tabs/start/Index';

function Designer(props) {
    const dispatch = useDispatch();
    const spreadBackColor = 'aliceblue';
    const sheetName = 'Person Address';
    const autoGenerateColumns = false;
    const data = DataService.getPersonAddressData();
    return (
        <div style={{ height: '100%', width: '100%', overflow: 'hidden' }}>
            <Tabs value="start">
                <Tab
                    code='file'
                    title={
                        <a
                            style={{
                                padding: '6px 12px 6px 12px',
                                display:'block',
                                color: 'white',
                                cursor: 'pointer',
                                background: '#217346',
                                fontSize:'12px',
                                fontWeight:700,
                                margin: '0px 3px'
                            }}
                        >
                            文件
                        </a>
                    }
                    onClick={()=>alert(1)}
                >
                    文件
                </Tab>
                <Tab code='start' title='开始'>
                    <StartTab />
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
        </div>
    );
}

export default Designer;
