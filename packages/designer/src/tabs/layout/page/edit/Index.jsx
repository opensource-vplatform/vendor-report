import {
  useEffect,
  useState,
} from 'react';

import {
  useDispatch,
  useSelector,
} from 'react-redux';
import styled from 'styled-components';

import { OperationDialog } from '@components/dialog/Index';
import { Button } from '@components/form/Index';
import {
  Tab,
  Tabs,
} from '@components/tabs/Index';
import {
  setActive,
  setInfo,
} from '@store/layoutSlice/layoutSlice';
import { genUUID } from '@utils/commonUtil';
import {
  parsePrintInfo,
  setPrintInfo,
} from '@utils/printUtil';
import { getNamespace } from '@utils/spreadUtil';

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

let pre_print_info = null;

export default function (props) {
    const { onConfirm, onCancel } = props;
    const { active,editorVisible, ...printInfo } = useSelector(
        ({ layoutSlice }) => layoutSlice
    );
    const { spread } = useSelector(({ appSlice }) => appSlice);
    const dispatch = useDispatch();
    const handlePrintView = () => {
        const sheet = spread.getActiveSheet();
        if (sheet) {
            pre_print_info = sheet.printInfo();
            const GC = getNamespace();
            const print = new GC.Spread.Sheets.Print.PrintInfo();
            sheet.printInfo(print);
            setPrintInfo(sheet, printInfo);
            spread.print();
        }
    };
    const [id] = useState(()=>{
        return genUUID();
    });
    useEffect(() => {
        const sheet = spread?.getActiveSheet();
        if (sheet) {
            const printInfo = parsePrintInfo(spread);
            dispatch(setInfo(printInfo));
        }
    }, []);
    return (
        <OperationDialog
            id={id}
            onConfirm={() => {
                const sheet = spread.getActiveSheet();
                if (sheet) {
                    setPrintInfo(sheet, printInfo);
                    localStorage.setItem(
                        'TOONE_REPORT_DESIGNER_PAGE_CUSTOM_PADDING',
                        JSON.stringify(printInfo.margin)
                    );
                    pre_print_info = null;
                }
                onConfirm && onConfirm();
            }}
            onCancel={() => {
                if (pre_print_info != null) {
                    const sheet = spread.getActiveSheet();
                    sheet && sheet.printInfo(pre_print_info);
                }
                onCancel && onCancel();
            }}
            width='560px'
            height='560px'
        >
            <Tabs value={active} onChange={(code) => dispatch(setActive(code))}>
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
                    <Sheet hostId={id}></Sheet>
                </Tab>
            </Tabs>
            <Wrap>
                <Button style={{ height: 26 }} onClick={handlePrintView}>
                    打印预览
                </Button>
            </Wrap>
        </OperationDialog>
    );
}
