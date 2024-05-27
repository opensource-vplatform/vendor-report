import { useSelector } from 'react-redux';

import {
  HCard,
  VIconTitle,
} from '@components/nav/Index';
import FindInPageIcon from '@icons/shape/FindInPage';
import RestorePageIcon from '@icons/shape/RestorePage';
import {
  zoom,
  zoomBySelection,
} from '@utils/worksheetUtil';

import ShowRatio from './componnets/ShowRatio';

export default function () {
    const { spread } = useSelector(({ appSlice }) => appSlice);
    const handleResetZoom = () => {
        zoom(spread, 1);
    };
    const handleZoomBySelection = () => zoomBySelection(spread);
    return (
        <HCard title='显示比例'>
            <ShowRatio></ShowRatio>
            <VIconTitle
                title='100%'
                icon={RestorePageIcon}
                onClick={handleResetZoom}
            ></VIconTitle>
            <VIconTitle
                title='缩放到选定区域'
                icon={FindInPageIcon}
                onClick={handleZoomBySelection}
            ></VIconTitle>
        </HCard>
    );
}
