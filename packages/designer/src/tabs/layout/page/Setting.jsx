import { Fragment } from 'react';

import {
  useDispatch,
  useSelector,
} from 'react-redux';
import styled from 'styled-components';

import {
  GroupItem,
  HLayout,
} from '@components/group/Index';
import EmptyIcon from '@icons/base/Empty';
import DirectionIcon from '@icons/layout/page/direction/Direction';
import LandscapeIcon from '@icons/layout/page/direction/Landscape';
import PortraitIcon from '@icons/layout/page/direction/Portrait';
import CustomIcon from '@icons/layout/page/padding/Custom';
import NarrowIcon from '@icons/layout/page/padding/Narrow';
import PaddingIcon from '@icons/layout/page/padding/Normal';
import AreaIcon from '@icons/layout/page/print/Area';
import SetIcon from '@icons/layout/page/print/Set';
import SizeIcon from '@icons/layout/page/size/Size';
import SplitIcon from '@icons/layout/page/Split';
import {
  setActive,
  setEditorVisible,
} from '@store/layoutSlice/layoutSlice';
import { WithIconMenu } from '@utils/componentUtils';
import {
  isFunction,
  isString,
} from '@utils/objectUtil';
import {
  clearPrintArea,
  getMargin,
  getOrientation,
  getPageKind,
  insertPageSplit,
  removePageSplit,
  resetAllPageSplit,
  setPrintArea,
  setPrintInfo,
} from '@utils/printUtil';
import { getNamespace } from '@utils/spreadUtil';

import { getAll } from '../../../metadatas/paper';
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

const OrientationText = styled.div`
    height: 32px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    min-width: 50px;
`;

const paddingIconStyle = { width: '34px', height: '34px' };

const paddingEnums = {
    normal: {
        left: 0.7,
        top: 0.75,
        right: 0.7,
        bottom: 0.75,
        header: 0.3,
        footer: 0.3,
    },
    board: { left: 1, top: 1, right: 1, bottom: 1, header: 0.3, footer: 0.3 },
    narrow: {
        left: 0.25,
        top: 0.75,
        right: 0.25,
        bottom: 0.75,
        header: 0.3,
        footer: 0.3,
    },
};

const isMatch = function (source, target) {
    const attrs = ['left', 'top', 'right', 'bottom', 'header', 'footer'];
    let allMatch = true;
    for (let i = 0, l = attrs.length; i < l; i++) {
        const key = attrs[i];
        if (source[key] != target[key]) {
            allMatch = false;
            break;
        }
    }
    return allMatch;
};

const toPaddingType = function (margin) {
    if (margin) {
        for (let attr in paddingEnums) {
            if (paddingEnums.hasOwnProperty(attr)) {
                const val = paddingEnums[attr];
                const allMatch = isMatch(val, margin);
                if (allMatch) {
                    return attr;
                }
            }
        }
        const custom = getCustomMargin();
        if (custom) {
            const matched = isMatch(custom, margin);
            if (matched) {
                return 'custom';
            }
        }
    }
    return null;
};

const getCustomMargin = () => {
    const customStr = localStorage.getItem(
        'TOONE_REPORT_DESIGNER_PAGE_CUSTOM_PADDING'
    );
    if (customStr) {
        try {
            return JSON.parse(customStr);
        } catch (e) {}
    }
    return null;
};

const setPagePadding = function (spread, type) {
    const sheet = spread.getActiveSheet();
    const margin = getMargin(spread);
    const setting = isString(type) ? paddingEnums[type] : type;
    setPrintInfo(sheet, {
        margin: { ...margin, ...setting },
    });
};

const PaddingItem = WithIconMenu('页边距', PaddingIcon, () => {
    const paddings = [
        {
            value: 'normal',
            title: '常规',
            text: (
                <PageSnapshot
                    title='常规'
                    {...paddingEnums.normal}
                ></PageSnapshot>
            ),
            icon: <PaddingIcon iconStyle={paddingIconStyle}></PaddingIcon>,
            handler: function (spread) {
                setPagePadding(spread, 'normal');
            },
        },
        {
            value: 'board',
            title: '宽',
            text: (
                <PageSnapshot title='宽' {...paddingEnums.board}></PageSnapshot>
            ),
            icon: <PaddingIcon iconStyle={paddingIconStyle}></PaddingIcon>,
            handler: function (spread) {
                setPagePadding(spread, 'board');
            },
        },
        {
            value: 'narrow',
            title: '窄',
            text: (
                <PageSnapshot
                    title='窄'
                    {...paddingEnums.narrow}
                ></PageSnapshot>
            ),
            icon: <NarrowIcon iconStyle={paddingIconStyle}></NarrowIcon>,
            handler: function (spread, dispatch) {
                setPagePadding(spread, 'narrow');
            },
        },
        'divider',
        {
            value: 'setting',
            title: '自定义页边距...',
            text: '自定义页边距...',
            handler: function (spread, dispatch) {
                dispatch(setEditorVisible({ visible: true, reason: 'custom' }));
                dispatch(setActive('padding'));
            },
        },
    ];
    const custom = getCustomMargin();
    if (custom) {
        paddings.splice(0, 0, {
            value: 'custom',
            title: '自定义',
            text: <PageSnapshot title='自定义' {...custom}></PageSnapshot>,
            icon: <CustomIcon iconStyle={paddingIconStyle}></CustomIcon>,
            handler: function (spread) {
                const custom = getCustomMargin();
                setPagePadding(spread, custom);
            },
        });
    }
    return paddings;
});
const DirectionItem = WithIconMenu('纸张方向', DirectionIcon, [
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
]);

const PAPER_STYLE = {
    1: { width: 29, height: 37 },
    3: { width: 37, height: 57 },
    5: { width: 29, height: 47 },
    6: { width: 18, height: 29 },
    7: { width: 24, height: 35 },
    8: { width: 39, height: 56 },
    9: {
        width: 28,
        height: 40,
        warpStyle: { border: '1px solid black', backgroundColor: '#ddd' },
    },
    11: { width: 21, height: 30 },
    12: { width: 26, height: 36 },
    13: { width: 18, height: 26 },
};

const PAPER_TITLE = {
    1: '信纸(8.5" × 11")',
    3: 'Tabloid(11" × 17")',
    5: '法律专用纸(8.5" × 14")',
    6: 'Statement(5.5" × 8.5")',
    7: 'Executive(7.25" × 10.5")',
    8: 'A3(11.69" × 16.54")',
    9: 'A4(8.27" × 11.69")',
    11: 'A5(5.83" × 8.27")',
    12: 'B4 JIS(10.1" x 14.3")',
    13: 'B5 JIS(5.41" × 7.64")',
};

const PAPER_DESC = {
    1: '21.59厘米 × 27.94厘米',
    3: '27.94厘米 × 43.18厘米',
    5: '21.59厘米 × 35.56厘米',
    6: '13.97厘米 × 21.59厘米',
    7: '18.41厘米 × 26.67厘米',
    8: '29.7厘米 × 42厘米',
    9: '21厘米 × 29.7厘米',
    11: '14.85厘米 × 21厘米',
    12: '25.7厘米 × 36.4厘米',
    13: '18.2厘米 × 25.7厘米',
};

const PaperKind = function (props) {
    const { title, desc } = props;
    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                padding: 8,
                minWidth: 150,
                justifyContent: 'center',
                alignItems: 'start',
                gap: 4,
            }}
        >
            <div style={{ fontSize: '12px', fontWeight: 'bold' }}>{title}</div>
            <div style={{ fontSize: '10px', color: '#333' }}>{desc}</div>
        </div>
    );
};

const PaperIcon = function (props) {
    const { style = {} } = props;
    const { warpStyle = {}, ...others } = style;
    return (
        <div
            style={{
                ...warpStyle,
                width: 60,
                height: 60,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <div
                style={{
                    ...others,
                    border: '1px solid black',
                    backgroundColor: 'white',
                }}
            ></div>
        </div>
    );
};

const toPaperKinds = function (kinds) {
    const result = [];
    kinds.forEach(({ value, title }) => {
        result.push({
            value,
            title,
            text: (
                <PaperKind
                    title={PAPER_TITLE[value]}
                    desc={PAPER_DESC[value]}
                ></PaperKind>
            ),
            icon: <PaperIcon style={PAPER_STYLE[value]}></PaperIcon>,
            handler: function (spread, dispatch, kind) {
                const sheet = spread.getActiveSheet();
                setPrintInfo(sheet, {
                    paperKind: kind,
                });
            },
        });
    });
    return result;
};

const SizeItem = WithIconMenu('纸张大小', SizeIcon, toPaperKinds(getAll()));
const AreaItem = WithIconMenu('打印区域', AreaIcon, [
    {
        value: 'set',
        title: '设置打印区域',
        text: '设置打印区域',
        icon: <SetIcon></SetIcon>,
        handler: function (spread) {
            setPrintArea(spread);
        },
    },
    {
        value: 'cancel',
        title: '取消打印区域',
        text: '取消打印区域',
        icon: <EmptyIcon></EmptyIcon>,
        handler: function (spread) {
            clearPrintArea(spread);
        },
    },
]);
const SplitItem = WithIconMenu('分隔符', SplitIcon, [
    {
        value: 'insert',
        title: '插入分隔符',
        text: '插入分隔符',
        handler: function (spread) {
            insertPageSplit(spread);
        },
    },
    {
        value: 'delete',
        title: '删除分隔符',
        text: '删除分隔符',
        handler: function (spread) {
            removePageSplit(spread);
        },
    },
    'divider',
    {
        value: 'reset',
        title: '重设所有分隔符',
        text: '重设所有分隔符',
        handler: function (spread) {
            resetAllPageSplit(spread);
        },
    },
]);

export default function () {
    const { spread } = useSelector(({ appSlice }) => appSlice);
    const {
        orientation,
        margin = {},
        paperKind,
        editorVisible,
        rowStart,
        columnStart,
        rowEnd,
        columnEnd,
    } = useSelector(({ layoutSlice }) => layoutSlice);
    const dispatch = useDispatch();
    const handleNodeClick = (val, node) => {
        const { handler } = node;
        if (isFunction(handler)) {
            handler(spread, dispatch, val);
        }
    };
    const closeEditor = () => {
        dispatch(setEditorVisible({ visible: false, reason: null }));
    };
    return (
        <Fragment>
            <GroupItem title='页面设置'>
                <HLayout>
                    <PaddingItem
                        optionMaxSize={11}
                        onNodeClick={handleNodeClick}
                        value={() => {
                            const margin = getMargin(spread);
                            return margin ? toPaddingType(margin) : null;
                        }}
                    ></PaddingItem>
                    <DirectionItem
                        onNodeClick={handleNodeClick}
                        value={() => {
                            const orientation = getOrientation(spread);
                            if (orientation) {
                                return orientation == 1
                                    ? 'portrait'
                                    : 'landscape';
                            }
                        }}
                    ></DirectionItem>
                    <SizeItem
                        onNodeClick={handleNodeClick}
                        value={() => getPageKind(spread)}
                    ></SizeItem>
                    <AreaItem onNodeClick={handleNodeClick}></AreaItem>
                    <SplitItem onNodeClick={handleNodeClick}></SplitItem>
                </HLayout>
            </GroupItem>
            {editorVisible ? (
                <EditDialog
                    onConfirm={closeEditor}
                    onCancel={closeEditor}
                ></EditDialog>
            ) : null}
        </Fragment>
    );
}
