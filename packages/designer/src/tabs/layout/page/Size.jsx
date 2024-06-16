import {
  useDispatch,
  useSelector,
} from 'react-redux';

import { VIconTitleWithDropdown } from '@components/nav/Index';
import SizeIcon from '@icons/layout/page/size/Size';
import { isFunction } from '@toone/report-util';
import {
  getPageKind,
  setPrintInfo,
} from '@utils/printUtil';

import { getAll } from '../../../metadatas/paper';

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

const Menus = toPaperKinds(getAll());

export default function () {
    const { spread } = useSelector(({ appSlice }) => appSlice);
    const dispatch = useDispatch();
    const handleNodeClick = (val, node) => {
        const { handler } = node;
        if (isFunction(handler)) {
            handler(spread, dispatch, val);
        }
    };
    return (
        <VIconTitleWithDropdown
            title='纸张大小'
            icon={SizeIcon}
            menus={Menus}
            onNodeClick={handleNodeClick}
            value={() => getPageKind(spread)}
        ></VIconTitleWithDropdown>
    );
}
