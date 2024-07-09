import {
  useEffect,
  useState,
} from 'react';

import { useSelector } from 'react-redux';
import styled from 'styled-components';

import { Workbook } from '@toone/report-excel';
import { getNamespace } from '@utils/spreadUtil';

const Wrap = styled.div`
    width: 100%;
    height: 100%;
    box-sizing: border-box;
`;

const genTestDatas = function(define){
    const datas = [];
    let count = 1;
    const fields = define.children;
    while(count<11){
        const record = {};
        fields.forEach(({name,code,type})=>{
            if(type=='text'){
                const index = parseInt(Math.random()*10);
                record[code] = (name||code)+index;
            }else if(type=='integer'){
                record[code] = parseInt(Math.random()*200);
            }else if(type=='decimals'){
                record[code] = parseFloat(parseFloat(Math.random()*200).toFixed(2));
            }
        });
        datas.push(record);
        count++;
    }
    return datas;
}

export default function(){
    const {config} = useSelector(({chartSlice})=>chartSlice);
    const {dsList,previewViewDatas} = useSelector(({datasourceSlice})=>datasourceSlice);
    const datasource = config.datasource;
    const [spread,setSpread] = useState(null);
    useEffect(()=>{
        if(spread&&datasource){
            try{
                spread.suspendPaint();
                spread.clearSheets();
                spread.options.newTabVisible = false;
                const ds = dsList.find((ds)=>ds.code==datasource);
                if(ds){
                    const name = ds.name||ds.code;
                    const GC = getNamespace();
                    const sheet = new GC.Spread.Sheets.Worksheet(name)
                    sheet.name(name);
                    const fields = ds.children;
                    const ColHeader = GC.Spread.Sheets.SheetArea.colHeader;
                    let datas = previewViewDatas[datasource]||[];
                    if(datas.length<1){
                        datas = genTestDatas(ds);
                    }
                    fields.forEach(({name,code},index)=>{
                        const title = name||code;
                        sheet.getCell(0,index,ColHeader).text(title);
                        /*const selection = new GC.Spread.Sheets.Range(-1,-1,index,1)
                        sheet.rowFilter(
                            new GC.Spread.Sheets.Filter.HideRowFilter(selection)
                        );*/
                    });
                    sheet.setColumnCount(fields.length);
                    sheet.setRowCount(datas.length);
                    datas.forEach((data,row)=>{
                        fields.forEach((field,col)=>{
                            sheet.setValue(row,col,data[field.code]);
                        });
                    });

                    spread.addSheet(0,sheet);
                }
            }finally{
                spread.resumePaint();
            }
        }
    },[datasource,spread]);
    return <Wrap>
        <Workbook isShowToolbar={false} onInited={(spread)=>{
            setSpread(spread);
        }}></Workbook>
    </Wrap>
}