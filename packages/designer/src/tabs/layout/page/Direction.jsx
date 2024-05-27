import styled from 'styled-components';

import { VIconTitleWithDropdown } from '@components/nav/Index';
import DirectionIcon from '@icons/layout/page/direction/Direction';
import LandscapeIcon from '@icons/layout/page/direction/Landscape';
import PortraitIcon from '@icons/layout/page/direction/Portrait';
import { setPrintInfo } from '@utils/printUtil';
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
        value: 'portrait',
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
        value: 'landscape',
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
    return (
        <VIconTitleWithDropdown
            title='纸张方向'
            icon={DirectionIcon}
            menus={Menus}
        ></VIconTitleWithDropdown>
    );
}
