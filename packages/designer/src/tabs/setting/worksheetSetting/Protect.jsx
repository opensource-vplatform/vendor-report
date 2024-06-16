import {
  useDispatch,
  useSelector,
} from 'react-redux';

import { setProtectOptions } from '@store/settingSlice/worksheetSettingSlice';
import { CheckBox } from '@toone/report-ui';

import {
  HLayout,
  ItemList,
  VGroupItem,
  Wrapper,
} from '../Components';

const WithProtectOption = function (props) {
    const { value, onChange } = props;
    const checkboxStyle = { width: 'max-content' };
    return (
        <CheckBox
            style={checkboxStyle}
            title='允许选中保护的单元格'
            value={value}
            onChange={onChange}
        ></CheckBox>
    );
};

const PROTECT_OPTIONS = [
    {
        code: 'allowInsertRows',
        title: '允许新增行',
        default: false,
    },
    {
        code: 'allowInsertColumns',
        title: '允许新增列',
        default: false,
    },
    {
        code: 'allowDeleteRows',
        title: '允许删除行',
        default: false,
    },
    {
        code: 'allowDeleteColumns',
        title: '允许删除列',
        default: false,
    },
    {
        code: 'allowResizeRows',
        title: '允许调整行高',
        default: true,
    },
    {
        code: 'allowResizeColumns',
        title: '允许调整列宽',
        default: true,
    },
    {
        code: 'allowFilter',
        title: '允许使用过滤器',
        default: true,
    },
    {
        code: 'allowSort',
        title: '允许排序',
        default: true,
    },
    {
        code: 'allowSelectLockedCells',
        title: '允许选中保护的单元格',
        default: true,
    },
    {
        code: 'allowSelectUnlockedCells',
        title: '允许选中未保护的单元格',
        default: true,
    },
    {
        code: 'allowDragInsertRows',
        title: '允许拖拽新增行',
        default: false,
    },
    {
        code: 'allowDragInsertColumns',
        title: '允许拖拽新增列',
        default: false,
    },
];

export default function () {
    const dispatch = useDispatch();
    const options = useSelector(
        ({ worksheetSettingSlice }) => worksheetSettingSlice
    );
    const checkboxStyle = { width: 'max-content' };
    const leftChildren = [];
    const rightChildren = [];
    PROTECT_OPTIONS.forEach((option, index) => {
        const { code, title } = option;
        const child = (
            <CheckBox
                style={checkboxStyle}
                key={code}
                title={title}
                value={options[code]}
                disabled={!options.isProtected}
                onChange={(checked) => {
                    dispatch(
                        setProtectOptions({
                            ...options,
                            [code]: checked,
                        })
                    );
                }}
            ></CheckBox>
        );
        if (index % 2 == 0) {
            leftChildren.push(child);
        } else {
            rightChildren.push(child);
        }
    });
    return (
        <Wrapper>
            <VGroupItem>
                <CheckBox
                    title='开启保护'
                    value={options.isProtected}
                    onChange={(checked) => {
                        dispatch(
                            setProtectOptions({
                                ...options,
                                isProtected: checked,
                            })
                        );
                    }}
                ></CheckBox>
                <HLayout style={{ paddingLeft: 16, paddingRight: 16 }}>
                    <VGroupItem>
                        <ItemList>{leftChildren}</ItemList>
                    </VGroupItem>
                    <VGroupItem>
                        <ItemList>{rightChildren}</ItemList>
                    </VGroupItem>
                </HLayout>
            </VGroupItem>
        </Wrapper>
    );
}
