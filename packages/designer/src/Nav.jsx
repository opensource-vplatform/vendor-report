import {
  Fragment,
  useContext,
  useEffect,
} from 'react';

import axios from 'axios';
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
import LayoutTab from '@tabs/layout/Index';
//import InsertTab from '@tabs/insert/Index';
import ReportTab from '@tabs/report/Index';
import SettingTab from '@tabs/setting/Index';
import SparklinesTab from '@tabs/sparklines/Index';
import StartTab from '@tabs/start/Index';
import TableTab from '@tabs/table/Index';
import ViewTab from '@tabs/view/Index';

import DesignerContext from './DesignerContext';
import VerticalAlignBottom from './icons/arrow/VerticalAlignBottom';
import VerticalAlignTop from './icons/arrow/VerticalAlignTop';
import { setNavStyle } from './store/appSlice/appSlice';
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
const SettingNavItem = WithNavItem(SettingTab);
const ReportNavItem = WithNavItem(ReportTab);
const SparklinesNavItem = WithNavItem(SparklinesTab);
//const InsertNavItem = WithNavItem(InsertTab);
const LayoutNavItem = WithNavItem(LayoutTab);

function parseUsedDatasource(spread, finalDsList) {
    const dsCodes = [];
    spread.sheets.forEach(function (sheet) {
        const sheetJson = sheet.toJSON();
        //收集表格已经绑定的数据源编码
        if (Array.isArray(sheetJson.tables)) {
            sheetJson.tables.forEach(({ bindingPath }) => {
                if (bindingPath && !dsCodes.includes(bindingPath)) {
                    dsCodes.push(bindingPath);
                }
            });
        }
        //收集单元格已经绑定的数据源编码
        const dataTable = sheetJson?.data?.dataTable;
        if (dataTable && typeof dataTable === 'object') {
            Object.values(dataTable).forEach((cols) => {
                if (cols) {
                    Object.values(cols).forEach(({ bindingPath }) => {
                        if (bindingPath && !dsCodes.includes(bindingPath)) {
                            let code = bindingPath;
                            if (bindingPath.includes('.')) {
                                code = bindingPath.split('.')[0];
                            }
                            dsCodes.push(code);
                        }
                    });
                }
            });
        }
    });
    //收集报表已经绑定的数据源
    const define = finalDsList.filter(({ code }) => {
        return dsCodes.includes(code);
    });
    return define;
}

export default function () {
    const dispatch = useDispatch();
    const { active, hideCodes } = useSelector(({ navSlice }) => navSlice);
    const { spread, navStyle } = useSelector(({ appSlice }) => appSlice);
    const datasourceSlice = useSelector(
        ({ datasourceSlice }) => datasourceSlice
    );
    const tableDesignSlice = useSelector(
        ({ tableDesignSlice }) => tableDesignSlice
    );
    const { finalDsList } = datasourceSlice;
    const handleSave = () => {
        if (spread) {
            const json = {
                reportJson: spread.toJSON(),
                context: { datasourceSlice, tableDesignSlice },
            };
            const define = parseUsedDatasource(spread, finalDsList);
            const result = fire({
                event: EVENTS.onSave,
                args: [json, { dsList: finalDsList, define }],
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
                            dispatch(setWaitMsg({ message: null }));
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
    //是否隐藏设置导航
    const isHiddenSetting = context?.conf?.nav?.setting === false;
    //是否隐藏插入导航
    const isHiddenInsert = context?.conf?.nav?.insert === false;
    //是否隐藏迷你图导航
    const isHiddenSparklines = context?.conf?.nav?.sparklines === false;
    //是否隐藏页面布局
    const isHiddenLayout = context?.conf?.nav?.layout === false;
    useEffect(() => {
        if (spread) {
            spread.refresh();
        }
    }, [navStyle]);
    return (
        <Tabs
            value={active}
            hideCodes={hideCodes}
            onChange={(code) => dispatch(setActive({ code }))}
            appearance={navStyle}
            tool={
                <Fragment>
                    {navStyle == 'normal' ? (
                        <VerticalAlignTop
                            tips='自动隐藏功能区域'
                            style={{
                                marginRight: 8,
                            }}
                            pathAttrs={{ fill: '#999' }}
                            onClick={() => {
                                dispatch(setActive({ code: null }));
                                dispatch(setNavStyle('toolbar'));
                            }}
                        ></VerticalAlignTop>
                    ) : (
                        <VerticalAlignBottom
                            tips='显示功能区域'
                            style={{
                                marginRight: 8,
                            }}
                            pathAttrs={{ fill: '#999' }}
                            onClick={() => {
                                if (active == null) {
                                    dispatch(setActive({ code: 'start' }));
                                }
                                dispatch(setNavStyle('normal'));
                            }}
                        ></VerticalAlignBottom>
                    )}
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
                        onClick={async () => {
                            let datas = null;

                            const { batchGetDatasURL, datasPath } =
                                context?.conf || {};

                            if (batchGetDatasURL && datasPath) {
                                try {
                                    let define = parseUsedDatasource(
                                        spread,
                                        finalDsList
                                    );
                                    define = define.map(function (item) {
                                        return {
                                            type: item.type,
                                            code: item.code,
                                        };
                                    });

                                    const response = await axios.post(
                                        batchGetDatasURL,
                                        {
                                            datasource: define,
                                        }
                                    );

                                    const datasPathArr = datasPath.split('/');
                                    datas = response?.data;
                                    while (datasPathArr.length) {
                                        datas = datas[datasPathArr.shift()];
                                    }
                                } catch (error) {}
                            }
                            dispatch(genPreviewDatas({ datas }));
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
            <LayoutNavItem
                code='layout'
                title='页面布局'
                tabProps={{ hidden: isHiddenLayout }}
            ></LayoutNavItem>
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
            <SettingNavItem
                code='Setting'
                title='设置'
                tabProps={{ hidden: isHiddenSetting }}
            ></SettingNavItem>
            <ReportNavItem code='Report' title='报表设计'></ReportNavItem>
            <SparklinesNavItem
                code='sparklines'
                title='迷你图'
                tabProps={{ hidden: isHiddenSparklines }}
            ></SparklinesNavItem>
        </Tabs>
    );
}
