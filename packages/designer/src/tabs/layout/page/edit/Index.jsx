import { useEffect } from 'react';

import {
  useDispatch,
  useSelector,
} from 'react-redux';
import styled from 'styled-components';

import { OperationDialog } from '../../../../component/dialog/Index';
import { Button } from '../../../../component/form/Index';
import {
  Tab,
  Tabs,
} from '../../../../component/tabs/Index';
import { setInfo } from '../../../../store/layoutSlice/layoutSlice';
import { parsePrintInfo } from '../../../../utils/printUtil';
import HeaderFooter from './HeaderFooter';
import Padding from './Padding';
import Page from './Page';
import Sheet from './Sheet';

const Wrap = styled.div`
    padding: 22px;
    display: flex;
    background-color: white;
    justify-content: end;
`;

export default function (props) {
    const { onConfirm, onCancel } = props;
    const { active } = useSelector(({ layoutSlice }) => layoutSlice);
    const { spread } = useSelector(({ appSlice }) => appSlice);
    const dispatch = useDispatch();
    useEffect(() => {
        const sheet = spread.getActiveSheet();
        if (sheet) {
            const printInfo = parsePrintInfo(spread);
            dispatch(
                setInfo(printInfo)
            );
        }
    }, []);
    return (
        <OperationDialog
            onConfirm={onConfirm}
            onCancel={onCancel}
            width='560px'
            height='560px'
        >
            <Tabs active={active}>
                <Tab code='page' title='页面'>
                    <Page></Page>
                </Tab>
                <Tab code='padding' title='页边距'>
                    <Padding></Padding>
                </Tab>
                <Tab code='headerFooter' title='页眉/页脚'>
                    <HeaderFooter></HeaderFooter>
                </Tab>
                <Tab code='sheet' title='工作表'>
                    <Sheet></Sheet>
                </Tab>
            </Tabs>
            <Wrap>
                <Button style={{ height: 26 }}>打印预览</Button>
            </Wrap>
        </OperationDialog>
    );
}
