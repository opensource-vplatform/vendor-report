import { useSelector } from 'react-redux';

import {
  HCard,
  VIconTitle,
} from '@components/nav/Index';
import ArrowDownIcon from '@icons/arrow/ArrowDown';
import FirstColumnIcon from '@icons/frozen/FirstColumn';
import FirstRowIcon from '@icons/frozen/FirstRow';
import LastColumnIcon from '@icons/frozen/LastColumn';
import LastRowIcon from '@icons/frozen/LastRow';
import FrozenWindowIcon from '@icons/frozen/Window';
import {
  Menu,
  VItem,
} from '@toone/report-ui';

import {
  frozen,
  frozenBySelection,
  unFrozen,
} from '../../utils/worksheetUtil';

export default function () {
    const { spread } = useSelector(({ appSlice }) => appSlice);
    const iconStyle = { width: 18, height: 18 };
    const menuDatas = [
        {
            value: 'frozenWindow',
            text: '冻结窗格',
            title: '根据当前选中的单元格位置，冻结行和列',
            icon: <FrozenWindowIcon iconStyle={iconStyle}></FrozenWindowIcon>,
        },
        {
            value: 'firstRow',
            text: '冻结首行',
            title: '冻结第一行',
            icon: <FirstRowIcon iconStyle={iconStyle}></FirstRowIcon>,
        },
        {
            value: 'firstColumn',
            text: '冻结首列',
            title: '冻结第一列',
            icon: <FirstColumnIcon iconStyle={iconStyle}></FirstColumnIcon>,
        },
        {
            value: 'lastRow',
            text: '冻结尾行',
            title: '冻结最后一行',
            icon: <LastRowIcon iconStyle={iconStyle}></LastRowIcon>,
        },
        {
            value: 'lastColumn',
            text: '冻结尾列',
            title: '冻结最后一列',
            icon: <LastColumnIcon iconStyle={iconStyle}></LastColumnIcon>,
        },
    ];
    const handleNodeClick = (val) => {
        if (val == 'frozenWindow') {
            frozenBySelection(spread);
        } else if (val == 'firstRow') {
            frozen(spread, { rowCount: 1 });
        } else if (val == 'firstColumn') {
            frozen(spread, { colCount: 1 });
        } else if (val == 'lastRow') {
            frozen(spread, { trailingRowCount: 1 });
        } else if (val == 'lastColumn') {
            frozen(spread, { trailingColCount: 1 });
        }
    };
    return (
        <HCard title='窗口'>
            <Menu datas={menuDatas} onNodeClick={handleNodeClick}>
                <VItem
                    title='冻结窗格'
                    style={{
                        marginLeft: 8,
                        paddingLeft: 4,
                        paddingRight: 4,
                        paddingBottom: 4,
                    }}
                    icon={
                        <FrozenWindowIcon
                            iconStyle={{
                                width: 28,
                                height: 28,
                            }}
                        ></FrozenWindowIcon>
                    }
                    onClick={() => {}}
                >
                    <ArrowDownIcon
                        style={{
                            width: 16,
                            height: 16,
                        }}
                    ></ArrowDownIcon>
                </VItem>
            </Menu>
            <VIconTitle
                title='取消冻结窗格'
                icon={FrozenWindowIcon}
                onClick={() => {
                    unFrozen(spread);
                }}
            ></VIconTitle>
        </HCard>
    );
}
