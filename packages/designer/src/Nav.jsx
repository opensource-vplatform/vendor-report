import {
  Fragment,
  useContext,
} from 'react';

import {
  useDispatch,
  useSelector,
} from 'react-redux';
import styled from 'styled-components';

import Button from '@components/button/Index';
import {
  Tab,
  Tabs,
} from '@components/tabs/Index';
import {
  EVENTS,
  fire,
} from '@event/EventManager';
import {
  setErrorMsg,
  setMode,
  setWaitMsg,
} from '@store/appSlice/appSlice';
import { genPreviewDatas } from '@store/datasourceSlice/datasourceSlice';
import { setActive } from '@store/navSlice/navSlice';
import DataTab from '@tabs/data/Index';
import FileTab from '@tabs/file/Index';
import StartTab from '@tabs/start/Index';
import TableTab from '@tabs/table/Index';
import ViewTab from '@tabs/view/Index';

import DesignerContext from './DesignerContext';
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
const TableNavItem = WithNavItem(TableTab);
const DataNavItem = WithNavItem(DataTab);
const FormulaNavItem = WithNavItem(Formula);

export default function () {
    const dispatch = useDispatch();
    const { active, hideCodes } = useSelector(({ navSlice }) => navSlice);
    const { spread } = useSelector(({ appSlice }) => appSlice);
    const { finalDsList } = useSelector(
        ({ datasourceSlice }) => datasourceSlice
    );
    const handleSave = () => {
        if (spread) {
            const data = spread.toJSON();
            const result = fire({
                event: EVENTS.onSave,
                args: [data, { dsList: finalDsList }],
            });
            if (result.length > 0) {
                dispatch(setWaitMsg({ message: '正在保存，请稍候...' }));
                const promise = result[0];
                if (promise instanceof Promise) {
                    promise
                        .then((data) => {
                            if (data.success) {
                                dispatch(setWaitMsg({ message: null }));
                            } else {
                                dispatch(setWaitMsg({ message: null }));
                                dispatch(
                                    setErrorMsg({ message: data.message })
                                );
                            }
                        })
                        .catch((e) => {
                            dispatch(
                                setErrorMsg({
                                    message:
                                        typeof e == 'string'
                                            ? e
                                            : e.message
                                              ? e.message
                                              : null,
                                })
                            );
                        });
                } else {
                    throw Error(
                        'onSave事件回调返回值不正确，期望：Promise实例，实际：' +
                            typeof promise
                    );
                }
            } else {
                dispatch(setWaitMsg({ message: null }));
            }
        }
    };

    const context = useContext(DesignerContext);
    //是否隐藏文件导航
    const isHiddenFile = context?.conf?.nav?.file === false;
    //是否隐藏开始导航
    const isHiddenStart = context?.conf?.nav?.start === false;
    //是否隐藏公式导航
    const isHiddenFormula = context?.conf?.nav?.formula === false;
    //是否隐藏数据导航
    const isHiddenData = context?.conf?.nav?.data === false;
    //是否隐藏视图导航
    const isHiddenView = context?.conf?.nav?.view === false;
    //是否隐藏表设计导航
    const isHiddenTable = context?.conf?.nav?.table === false;

    return (
        <Tabs
            value={active}
            hideCodes={hideCodes}
            onChange={(code) => dispatch(setActive({ code }))}
            tool={
                <Fragment>
                    <Button
                        style={{
                            marginRight: 8,
                        }}
                        type='primary'
                        onClick={handleSave}
                    >
                        保存
                    </Button>
                    <Button
                        style={{ marginRight: 8 }}
                        onClick={() => {
                            dispatch(genPreviewDatas());
                            dispatch(setMode({ mode: 'preview' }));
                        }}
                    >
                        预览
                    </Button>
                </Fragment>
            }
        >
            <FileNavItem
                code='file'
                autoSelect={false}
                title={<FileTabTitle>文件</FileTabTitle>}
                tabProps={{
                    closeHandler: () => dispatch(setActive({ code: null })),
                    hidden: isHiddenFile,
                }}
            ></FileNavItem>
            <StartNavItem
                code='start'
                title='开始'
                tabProps={{ hidden: isHiddenStart }}
            ></StartNavItem>
            <FormulaNavItem
                code='formula'
                title='公式'
                tabProps={{ hidden: isHiddenFormula }}
            ></FormulaNavItem>
            <DataNavItem
                code='data'
                title='数据'
                tabProps={{ hidden: isHiddenData }}
            ></DataNavItem>
            <ViewNavItem
                code='view'
                title='视图'
                tabProps={{ hidden: isHiddenView }}
            ></ViewNavItem>
            <TableNavItem
                code='table'
                title='表设计'
                tabProps={{ hidden: isHiddenTable }}
            ></TableNavItem>
        </Tabs>
    );
}
