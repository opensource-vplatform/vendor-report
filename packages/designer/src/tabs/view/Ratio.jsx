import { useSelector } from 'react-redux';

import {
  GroupItem,
  HLayout,
  VItem,
} from '@components/group/Index';
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
        <GroupItem title='显示比例'>
            <HLayout>
                <ShowRatio></ShowRatio>
                <VItem
                    title='100%'
                    style={{
                        marginLeft: 8,
                        paddingLeft: 4,
                        paddingRight: 4,
                        paddingBottom: 4,
                    }}
                    icon={
                        <RestorePageIcon
                            iconStyle={{
                                width: 44,
                                height: 44,
                                color: '#367fc9',
                            }}
                        ></RestorePageIcon>
                    }
                    onClick={handleResetZoom}
                ></VItem>
                <VItem
                    title='缩放到选定区域'
                    style={{
                        marginLeft: 8,
                        paddingLeft: 4,
                        paddingRight: 4,
                        paddingBottom: 4,
                    }}
                    icon={
                        <FindInPageIcon
                            iconStyle={{
                                width: 44,
                                height: 44,
                                color: '#367fc9',
                            }}
                        ></FindInPageIcon>
                    }
                    onClick={handleZoomBySelection}
                ></VItem>
            </HLayout>
        </GroupItem>
    );
}
