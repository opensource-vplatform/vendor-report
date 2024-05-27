import {
  useDispatch,
  useSelector,
} from 'react-redux';

import { VIconTitleWithDropdown } from '@components/nav/Index';
import CustomIcon from '@icons/layout/page/padding/Custom';
import NarrowIcon from '@icons/layout/page/padding/Narrow';
import PaddingIcon from '@icons/layout/page/padding/Normal';
import {
  setActive,
  setEditorVisible,
} from '@store/layoutSlice/layoutSlice';
import {
  isFunction,
  isString,
} from '@utils/objectUtil';
import {
  getMargin,
  setPrintInfo,
} from '@utils/printUtil';

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

const Menus = [
    {
        value: 'normal',
        title: '常规',
        text: (
            <PageSnapshot title='常规' {...paddingEnums.normal}></PageSnapshot>
        ),
        icon: <PaddingIcon iconStyle={paddingIconStyle}></PaddingIcon>,
        handler: function (spread) {
            setPagePadding(spread, 'normal');
        },
    },
    {
        value: 'board',
        title: '宽',
        text: <PageSnapshot title='宽' {...paddingEnums.board}></PageSnapshot>,
        icon: <PaddingIcon iconStyle={paddingIconStyle}></PaddingIcon>,
        handler: function (spread) {
            setPagePadding(spread, 'board');
        },
    },
    {
        value: 'narrow',
        title: '窄',
        text: <PageSnapshot title='窄' {...paddingEnums.narrow}></PageSnapshot>,
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

export default function () {
    const { spread } = useSelector(({ appSlice }) => appSlice);
    const dispatch = useDispatch();
    let menus = null;
    const custom = getCustomMargin();
    if (custom) {
        menus = [
            {
                value: 'custom',
                title: '自定义',
                text: <PageSnapshot title='自定义' {...custom}></PageSnapshot>,
                icon: <CustomIcon iconStyle={paddingIconStyle}></CustomIcon>,
                handler: function (spread) {
                    const custom = getCustomMargin();
                    setPagePadding(spread, custom);
                },
            },
            ...Menus,
        ];
    } else {
        menus = Menus;
    }
    const handleNodeClick = (val, node) => {
        const { handler } = node;
        if (isFunction(handler)) {
            handler(spread, dispatch, val);
        }
    };
    return (
        <VIconTitleWithDropdown
            title='页边距'
            icon={PaddingIcon}
            menus={menus}
            value={() => {
                const margin = getMargin(spread);
                return margin ? toPaddingType(margin) : null;
            }}
            onNodeClick={handleNodeClick}
        ></VIconTitleWithDropdown>
    );
}
