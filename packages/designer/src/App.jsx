import React from 'react';

import { useDispatch } from 'react-redux';

import {
  Column,
  SpreadSheets,
  Worksheet,
} from '@grapecity/spread-sheets-react';

import DataService from './assets/dataService';
import SpreadHeader from './component/spreadHeader/spreadHeader';
import { setSpread } from './store/appSlice/appSlice';
import { resetCellFont } from './store/fontSlice/fontSlice';

function QuickStart(props) {
    const dispatch = useDispatch();
    const spreadBackColor = 'aliceblue';
    const sheetName = 'Person Address';
    const autoGenerateColumns = false;
    const data = DataService.getPersonAddressData();
    return (
        <div style={{ height: '100%', width: '100%', overflow: 'hidden' }}>
            <SpreadHeader />
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

export default QuickStart;
