import { useState } from 'react';

import { useSelector } from 'react-redux';
import styled from 'styled-components';

import { VIconTitleWithDropdown } from '@components/nav/Index';
import DirectionIcon from '@icons/layout/page/direction/Direction';
import LandscapeIcon from '@icons/layout/page/direction/Landscape';
import PortraitIcon from '@icons/layout/page/direction/Portrait';
import { isFunction } from '@toone/report-util';
import {
  parsePrintInfo,
  setPrintInfo,
} from '@utils/printUtil';
import { getNamespace } from '@utils/spreadUtil';

const OrientationText = styled.div`
    height: 32px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    min-width: 50px;
`;

const Menus = [
    {
        value: 1,
        title: '纵向',
        text: <OrientationText>纵向</OrientationText>,
        icon: (
            <PortraitIcon iconStyle={{ width: 24, height: 24 }}></PortraitIcon>
        ),
        handler: (spread) => {
            const GC = getNamespace();
            const sheet = spread.getActiveSheet();
            setPrintInfo(sheet, {
                orientation:
                    GC.Spread.Sheets.Print.PrintPageOrientation.portrait,
            });
        },
    },
    {
        value: 2,
        title: '横向',
        text: <OrientationText>横向</OrientationText>,
        icon: (
            <LandscapeIcon
                iconStyle={{ width: 24, height: 24 }}
            ></LandscapeIcon>
        ),
        handler: (spread) => {
            const GC = getNamespace();
            const sheet = spread.getActiveSheet();
            setPrintInfo(sheet, {
                orientation:
                    GC.Spread.Sheets.Print.PrintPageOrientation.landscape,
            });
        },
    },
];

export default function () {
    const [direction,setDirection] = useState(1);
    const {spread} = useSelector(({appSlice})=>appSlice);
    return (
        <VIconTitleWithDropdown
            title='纸张方向'
            icon={DirectionIcon}
            menus={Menus}
            value={direction}
            onNodeClick={(val,node)=>{
                if(node&&isFunction(node.handler)){
                    node.handler(spread);
                }
            }}
            onVisibleChange={(visible)=>{
                if(visible&&spread){
                    const {orientation} = parsePrintInfo(spread);
                    setDirection(orientation);
                }
            }}
        ></VIconTitleWithDropdown>
    );
}
