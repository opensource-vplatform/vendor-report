import {
  useDispatch,
  useSelector,
} from 'react-redux';
import styled from 'styled-components';

import Button from '@components/Button/Index';
import {
  Tab,
  Tabs,
} from '@components/tabs/Index';
import { setActive } from '@store/navSlice/navSlice';
import DataTab from '@tabs/data/Index';
import FileTab from '@tabs/file/Index';
import StartTab from '@tabs/start/Index';
import TableTab from '@tabs/table/Index';
import TestTab from '@tabs/test/Index';
import ViewTab from '@tabs/view/Index';

import { setMode } from './store/appSlice/appSlice';
import { genPreviewDatas } from './store/datasourceSlice/datasourceSlice';
import Formula from './tabs/formula/Index';

const FileTabTitle = styled.a`
    padding: 6px 12px 6px 12px;
    display: block;
    color: white;
    cursor: pointer;
    background: #217346;
    font-size: 12px;
    font-weight: 700;
    margin: 0px 3px;
`;

const WithNavItem = function (Component) {
    return function (props) {
        const dispatch = useDispatch();
        const { code, title, autoSelect, tabProps = {} } = props;
        return (
            <Tab
                code={code}
                title={title}
                autoSelect={autoSelect}
                onClick={() => {
                    dispatch(setActive({ code }));
                }}
            >
                <Component {...tabProps}></Component>
            </Tab>
        );
    };
};

const FileNavItem = WithNavItem(FileTab);
const StartNavItem = WithNavItem(StartTab);
const ViewNavItem = WithNavItem(ViewTab);
const TestNavItem = WithNavItem(TestTab);
const TableNavItem = WithNavItem(TableTab);
const DataNavItem = WithNavItem(DataTab);
const FormulaNavItem = WithNavItem(Formula);

export default function () {
    const dispatch = useDispatch();
    const { active, hideCodes } = useSelector(({ navSlice }) => navSlice);
    return (
        <Tabs
            value={active}
            hideCodes={hideCodes}
            onChange={(code) => dispatch(setActive({ code }))}
            tool={
                <Button
                    style={{ marginRight: 8 }}
                    onClick={() => {
                        dispatch(genPreviewDatas());
                        dispatch(setMode({ mode: 'preview' }));
                    }}
                >
                    预览
                </Button>
            }
        >
            <FileNavItem
                code='file'
                autoSelect={false}
                title={<FileTabTitle>文件</FileTabTitle>}
                tabProps={{
                    closeHandler: () => dispatch(setActive({ code: null })),
                }}
            ></FileNavItem>
            <StartNavItem code='start' title='开始'></StartNavItem>
            <FormulaNavItem code='formula' title='公式'></FormulaNavItem>
            <DataNavItem code='data' title='数据'></DataNavItem>
            <ViewNavItem code='view' title='视图'></ViewNavItem>
            <TableNavItem code='table' title='表设计'></TableNavItem>
            <TestNavItem code='test' title='测试组件'></TestNavItem>
        </Tabs>
    );
}
