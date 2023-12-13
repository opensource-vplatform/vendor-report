import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import Button from '@components/Button/Index';
import { Tab, Tabs } from '@components/tabs/Index';
import { setActive } from '@store/navSlice/navSlice';
import FileTab from '@tabs/file/Index';
import StartTab from '@tabs/start/Index';
import TableTab from '@tabs/table/Index';
import TestTab from '@tabs/test/Index';
import ViewTab from '@tabs/view/Index';

import { preview } from '../src/component/defineDatasource/fun';
import { setMode } from './store/appSlice/appSlice';

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

export default function () {
    const dispatch = useDispatch();
    const state = useSelector((state) => state);
    const {
        navSlice: { active, hideCodes },
        fontSlice: { spread },
    } = state;
    return (
        <Tabs
            value={active}
            hideCodes={hideCodes}
            onChange={(code) => dispatch(setActive({ code }))}
            tool={
                <Button
                    style={{ marginRight: 8 }}
                    onClick={() => {
                        preview({
                            dispatch,
                            spread,
                            state,
                        });
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
            <ViewNavItem code='view' title='视图'></ViewNavItem>
            <TableNavItem code='table' title='表设计'></TableNavItem>
            <TestNavItem code='test' title='测试组件'></TestNavItem>
        </Tabs>
    );
}
