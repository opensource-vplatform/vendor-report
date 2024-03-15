import {
  Fragment,
  useState,
} from 'react';

import {
  useDispatch,
  useSelector,
} from 'react-redux';

import {
  GroupItem,
  HLayout,
} from '@components/group/Index';
import EmptyIcon from '@icons/base/Empty';
import DirectionIcon from '@icons/layout/page/direction/Direction';
import LandscapeIcon from '@icons/layout/page/direction/Landscape';
import PortraitIcon from '@icons/layout/page/direction/Portrait';
import PaddingIcon from '@icons/layout/page/padding/Normal';
import AreaIcon from '@icons/layout/page/print/Area';
import SetIcon from '@icons/layout/page/print/Set';
import SizeIcon from '@icons/layout/page/size/Size';
import SplitIcon from '@icons/layout/page/Split';
import { WithIconMenu } from '@utils/componentUtils';

import { setActive } from '../../../store/layoutSlice/layoutSlice';
import {
  clearPrintArea,
  insertPageSplit,
  removePageSplit,
  resetAllPageSplit,
  setPrintArea,
} from '../../../utils/printUtil';
import EditDialog from './edit/Index';

const PageSnapshot = function (props) {
    const { title, top, bottom, left, right, header, footer } = props;
    return (
        <div
            style={{
                width: '200px',
                height: '60px',
                display: 'flex',
                flexDirection: 'column',
                padding: '8px',
            }}
        >
            <span style={{ fontWeight: 'bold', paddingBottom: '4px' }}>
                {title}
            </span>
            <div style={{ display: 'flex', fontSize: '10px' }}>
                <span style={{ width: '50px' }}>上：</span>
                <span style={{ width: '50px' }}>{top}"</span>
                <span style={{ width: '50px' }}>下：</span>
                <span style={{ width: '50px' }}>{bottom}"</span>
            </div>
            <div style={{ display: 'flex', fontSize: '10px' }}>
                <span style={{ width: '50px' }}>左：</span>
                <span style={{ width: '50px' }}>{left}"</span>
                <span style={{ width: '50px' }}>右：</span>
                <span style={{ width: '50px' }}>{right}"</span>
            </div>
            <div style={{ display: 'flex', fontSize: '10px' }}>
                <span style={{ width: '50px' }}>页眉：</span>
                <span style={{ width: '50px' }}>{header}"</span>
                <span style={{ width: '50px' }}>页脚：</span>
                <span style={{ width: '50px' }}>{footer}"</span>
            </div>
        </div>
    );
};

const PaddingItem = WithIconMenu('页边距', PaddingIcon, [
    {
        value: 'normal',
        title: '常规',
        text: (
            <PageSnapshot
                title='常规'
                top='0.75'
                bottom='0.75'
                left='0.7'
                right='0.7'
                header='0.3'
                footer='0.3'
            ></PageSnapshot>
        ),
        icon: (
            <PaddingIcon
                iconStyle={{ width: '34px', height: '34px' }}
            ></PaddingIcon>
        ),
    },
    {
        value: 'board',
        title: '宽',
        text: (
            <PageSnapshot
                title='宽'
                top='1'
                bottom='1'
                left='1'
                right='1'
                header='0.5'
                footer='0.5'
            ></PageSnapshot>
        ),
        icon: (
            <PaddingIcon
                iconStyle={{ width: '34px', height: '34px' }}
            ></PaddingIcon>
        ),
    },
    {
        value: 'narrow',
        title: '窄',
        text: (
            <PageSnapshot
                title='窄'
                top='0.75'
                bottom='0.75'
                left='0.25'
                right='0.25'
                header='0.3'
                footer='0.3'
            ></PageSnapshot>
        ),
        icon: <EmptyIcon></EmptyIcon>,
    },
    'divider',
    {
        value: 'custom',
        title: '自定义页边距...',
        text: '自定义页边距...',
    },
]);
const DirectionItem = WithIconMenu('纸张方向', DirectionIcon, [
    {
        value: 'portrait',
        title: '纵向',
        text: '纵向',
        icon: <PortraitIcon></PortraitIcon>,
    },
    {
        value: 'landscape',
        title: '横向',
        text: '横向',
        icon: <LandscapeIcon></LandscapeIcon>,
    },
]);
const SizeItem = WithIconMenu('纸张大小', SizeIcon, [
    {
        value: 'portrait',
        title: '纵向',
        text: '纵向',
        icon: <PortraitIcon></PortraitIcon>,
    },
    {
        value: 'landscape',
        title: '横向',
        text: '横向',
        icon: <LandscapeIcon></LandscapeIcon>,
    },
]);
const AreaItem = WithIconMenu('打印区域', AreaIcon, [
    {
        value: 'set',
        title: '设置打印区域',
        text: '设置打印区域',
        icon: <SetIcon></SetIcon>,
    },
    {
        value: 'cancel',
        title: '取消打印区域',
        text: '取消打印区域',
        icon: <EmptyIcon></EmptyIcon>,
    },
]);
const SplitItem = WithIconMenu('分隔符', SplitIcon, [
    {
        value: 'insert',
        title: '插入分隔符',
        text: '插入分隔符',
    },
    {
        value: 'delete',
        title: '删除分隔符',
        text: '删除分隔符',
    },
    'divider',
    {
        value: 'reset',
        title: '重设所有分隔符',
        text: '重设所有分隔符',
    },
]);

export default function () {
    const [data, setData] = useState({
        showDialog: false,
    });
    const { spread } = useSelector(({ appSlice }) => appSlice);
    const dispatch = useDispatch();
    const handlePaddingSet = (type) => {
        if (type == 'custom') {
            setData({ showDialog: true });
            dispatch(setActive('padding'));
        }
    };
    const handleDirectionSet = (direction) => {};
    const handleSizeSet = (size) => {};
    const handlePrintAreaSet = (type) => {
        if (type == 'set') {
            setPrintArea(spread);
        } else if (type == 'cancel') {
            clearPrintArea(spread);
        }
    };
    const handleSplitSet = function (type) {
        if (type == 'insert') {
            insertPageSplit(spread);
        } else if (type == 'delete') {
            removePageSplit(spread);
        } else if (type == 'reset') {
            resetAllPageSplit(spread);
        }
    };
    return (
        <Fragment>
            <GroupItem title='页面设置'>
                <HLayout>
                    <PaddingItem onNodeClick={handlePaddingSet}></PaddingItem>
                    <DirectionItem
                        onNodeClick={handleDirectionSet}
                    ></DirectionItem>
                    <SizeItem onNodeClick={handleSizeSet}></SizeItem>
                    <AreaItem onNodeClick={handlePrintAreaSet}></AreaItem>
                    <SplitItem onNodeClick={handleSplitSet}></SplitItem>
                </HLayout>
            </GroupItem>
            {data.showDialog ? (
                <EditDialog
                    onConfirm={() => {
                        setData({
                            ...data,
                            showDialog: false,
                        });
                    }}
                    onCancel={() => {
                        setData({
                            ...data,
                            showDialog: false,
                        });
                    }}
                ></EditDialog>
            ) : null}
        </Fragment>
    );
}
