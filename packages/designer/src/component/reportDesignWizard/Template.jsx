import {
  useMemo,
  useRef,
  useState,
} from 'react';

import {
  useDispatch,
  useSelector,
} from 'react-redux';
import styled from 'styled-components';

import Button from '@components/button/Index';
import Dialog from '@components/dialog/Index';
import {
  CheckBox,
  Select,
} from '@components/form/Index';
import { toggleBooleanValue } from '@store/navSlice/navSlice';
import {
  addTemplate,
  toggleBooleanValue as _toggleBooleanValue,
} from '@store/wizardSlice';
import { getNamespace } from '@utils/spreadUtil';

const GC = getNamespace();

function genTemplateName(template) {
    let index = 1;
    Object.keys(template).forEach(function (key) {
        if (key.startsWith('模板')) {
            let num = Number(key.slice(2));
            if (Number.isInteger(num) && num >= index) {
                index = num === index ? index + 1 : num;
            }
        }
    });
    return `模板${index}`;
}

const FooterWrap = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-end;
    border: none;
    margin: 0px;
    background: #fff;
    padding: 8px;
`;

const PageDisplayTypeWrap = styled.div`
    height: 50px;
    border-top: 1px solid #ddd;
    display: flex;
    align-items: center;
    padding-left: 8px;
`;

const PageDisplayTypeWrapItem = styled.div`
    display: flex;
    align-items: center;
    margin-right: 10px;
    cursor: pointer;
`;

const Label = styled.span`
    width: 220px;
`;

const PageShowWrap = styled.div`
    height: 50px;
    display: flex;
    align-items: center;
    padding-left: 8px;
`;

const Wrap = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    flex: 1;
    overflow: hidden;
    background-color: #fff;
    user-select: none;
`;

const TableWrap = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    overflowy: auto;
    flex: 1;
    flex-direction: column;
`;

const TableHeaderWrap = styled.div`
    display: flex;
    justify-content: space-between;
    padding-left: 8px;
    padding-right: 8px;
    align-items: center;
    height: 48px;
`;

const Clear = styled.div`
    background: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB2aWV3Qm94PSIwIDAgMTYgMTYiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDU1LjIgKDc4MTgxKSAtIGh0dHBzOi8vc2tldGNoYXBwLmNvbSAtLT4KICAgIDx0aXRsZT5jbG9zZTwvdGl0bGU+CiAgICA8ZGVzYz5DcmVhdGVkIHdpdGggU2tldGNoLjwvZGVzYz4KICAgIDxnIGlkPSJjbG9zZSIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPHBhdGggZD0iTTkuMTQ1MTkwODUsOC4wMDAxNTM1NyBMMTIuNzYxOTkxNCw0LjM4MjE4MTEyIEMxMy4wNzkzMzYyLDQuMDY2MDAyMzUgMTMuMDc5MzM2MiwzLjU1MzMxNjc2IDEyLjc2MTk5MTQsMy4yMzcxMzQwOCBDMTIuNDQ2NDc5NiwyLjkyMDk1NTMxIDExLjkzNDQ2MTEsMi45MjA5NTUzMSAxMS42MTc3ODQyLDMuMjM3MTM0MDggTDguMDAwMzE5Niw2Ljg1NDkzMDc0IEw0LjM4MjE4MTEyLDMuMjM3MTM0MDggQzQuMDY2MDAyMzUsMi45MjA5NTUzMSAzLjU1MzMxNjc2LDIuOTIwOTU1MzEgMy4yMzcxMzQwOCwzLjIzNzEzNDA4IEMyLjkyMDk1NTMxLDMuNTUzMzEyODUgMi45MjA5NTUzMSw0LjA2NTk5ODQ0IDMuMjM3MTM0MDgsNC4zODIxODExMiBMNi44NTUxMDY1Myw4LjAwMDE1MzU3IEwzLjIzNzEzNDA4LDExLjYxODYyNDEgQzIuOTIwOTU1MzEsMTEuOTM0OTY4OSAyLjkyMDk1NTMxLDEyLjQ0NjY1NDQgMy4yMzcxMzQwOCwxMi43NjI5OTczIEMzLjU1MzMxMjg1LDEzLjA3OTM0MjEgNC4wNjU5OTg0NCwxMy4wNzkzNDIxIDQuMzgyMTgxMTIsMTIuNzYyOTk3MyBMOC4wMDAzMTk2LDkuMTQ1MjAwNjEgTDExLjYxNzc4NDIsMTIuNzYyOTk3MyBDMTEuOTM0NDYzLDEzLjA3OTM0MjEgMTIuNDQ2NjQ4NiwxMy4wNzkzNDIxIDEyLjc2MTk5MTQsMTIuNzYyOTk3MyBDMTMuMDc5MzM2MiwxMi40NDcxNTI1IDEzLjA3OTMzNjIsMTEuOTM0OTY2OSAxMi43NjE5OTE0LDExLjYxODYyNDEgTDkuMTQ1MTkwODUsOC4wMDAxNTM1NyBMOS4xNDUxOTA4NSw4LjAwMDE1MzU3IFoiIGlkPSLot6/lvoQiIGZpbGw9IiM2NjY2NjYiIGZpbGwtcnVsZT0ibm9uemVybyI+PC9wYXRoPgogICAgPC9nPgo8L3N2Zz4=);
    width: 16px;
    height: 16px;
    position: absolute;
    right: 30px;
    border: 1px solid #ddd;
    cursor: pointer;
    border-radius: 50%;
    background-size: 12px 12px;
    background-origin: content-box;
    background-repeat: no-repeat;
    background-position: center;
    &:hover {
        background-color: #ddd;
    }
`;

function Header(props) {
    const {
        onChange,
        datas = {
            isCurrentSheet: true,
            isShowHeaderAndFootor: true,
        },
    } = props;
    const [isCurrentSheet, setIsCurrentSheet] = useState(datas.isCurrentSheet);
    const [isShowHeaderAndFootor, setIsShowHeaderAndFootor] = useState(
        datas.isShowHeaderAndFootor
    );
    const handleOnChange = function (isCurrentSheet, isShowHeaderAndFootor) {
        if (typeof onChange !== 'function') {
            return;
        }
        onChange({
            isCurrentSheet,
            isShowHeaderAndFootor,
        });
    };

    return (
        <>
            <PageDisplayTypeWrap>
                <Label>分页显示方式：</Label>
                <PageDisplayTypeWrapItem
                    onClick={function () {
                        setIsCurrentSheet(!isCurrentSheet);
                        handleOnChange(!isCurrentSheet, isShowHeaderAndFootor);
                    }}
                >
                    <CheckBox value={isCurrentSheet}></CheckBox>
                    <span>当前工作表</span>
                </PageDisplayTypeWrapItem>
                <PageDisplayTypeWrapItem
                    onClick={function () {
                        setIsCurrentSheet(!isCurrentSheet);
                        handleOnChange(!isCurrentSheet, isShowHeaderAndFootor);
                    }}
                >
                    <CheckBox value={!isCurrentSheet}></CheckBox>
                    <span>新的工作表</span>
                </PageDisplayTypeWrapItem>
            </PageDisplayTypeWrap>
            {/*  <PageShowWrap>
                <Label>分页后是否显示头部与尾部：</Label>
                <CheckBox
                    value={isShowHeaderAndFootor}
                    onChange={function (value) {
                        setIsShowHeaderAndFootor(value);
                        handleOnChange(isCurrentSheet, value);
                    }}
                ></CheckBox>
            </PageShowWrap> */}
        </>
    );
}

export default function Template(props) {
    const { onClose } = props;
    const dispatch = useDispatch();
    const { finalDsList = [] } = useSelector(
        ({ datasourceSlice }) => datasourceSlice
    );

    const { template, isEdit } = useSelector(({ wizardSlice }) => wizardSlice);

    const { spread } = useSelector(({ appSlice }) => appSlice);
    const activeSheetName = spread.getActiveSheet().name();
    debugger;

    //分页后是在当前sheet中显示还是在新的sheet中显示
    const isCurrentSheet = isEdit
        ? template?.[activeSheetName]?.isCurrentSheet
        : true;
    //每一页是否都显示头部与尾部
    const isShowHeaderAndFootor = isEdit
        ? template?.[activeSheetName]?.isShowHeaderAndFootor
        : true;

    const options = useRef({
        isCurrentSheet,
        isShowHeaderAndFootor,
    }).current;

    //已选数据源
    const key0 = isEdit
        ? Object.keys(template?.[activeSheetName]?.groups || {})?.[0] || ''
        : '';
    const [dsName, setDsName] = useState(key0);

    //可选字段
    const [fields, setFields] = useState(function () {
        let res = [];
        if (key0 && isEdit) {
            const item = finalDsList.find(function (item) {
                return item?.code === key0;
            });
            res = Array.isArray(item?.children) ? item?.children : [];
        }
        return res;
    });

    //已选字段
    const [fieldCode, setFieldCode] = useState(function () {
        let fieldCode = '';

        if (key0 && isEdit) {
            fieldCode =
                template?.[activeSheetName]?.groups?.[key0]?.[0]?.code || '';
        }
        return fieldCode;
    });
    const datas = useMemo(
        function () {
            const datas = JSON.parse(JSON.stringify(finalDsList));
            return datas.filter(function ({ type }) {
                return type === 'table';
            });
        },
        [finalDsList]
    );

    return (
        <Dialog
            title='模板配置'
            open={true}
            width='50%'
            height='50%'
            onClose={function () {
                typeof onClose === 'function' && onClose();
            }}
        >
            <Wrap>
                <Header
                    datas={options}
                    onChange={function (datas) {
                        Object.assign(options, datas);
                    }}
                ></Header>
                <TableWrap>
                    <TableHeaderWrap>
                        <Label>请选择数据源：</Label>
                        <Select
                            datas={datas.map(function (item) {
                                return {
                                    value: item.code,
                                    text: item.name,
                                };
                            })}
                            value={dsName}
                            style={{
                                width: '100%',
                                height: 30,
                            }}
                            wrapStyle={{
                                width: '100%',
                                flex: 1,
                                marginLeft: '10px',
                            }}
                            optionStyle={{ width: 104 }}
                            onChange={function (value) {
                                const currentData = datas.find(function (data) {
                                    return data?.code === value;
                                });

                                setDsName(value);
                                setFields([...(currentData?.children || [])]);
                                setFieldCode('');
                            }}
                        ></Select>
                    </TableHeaderWrap>
                    <TableHeaderWrap>
                        <Label>请选择分组字段：</Label>
                        <Select
                            datas={fields.map(function (item) {
                                return {
                                    value: item.code,
                                    text: item.name,
                                };
                            })}
                            value={fieldCode}
                            style={{
                                width: '100%',
                                height: 30,
                            }}
                            wrapStyle={{
                                width: '100%',
                                flex: 1,
                                marginLeft: '10px',
                            }}
                            optionStyle={{ width: 104 }}
                            onChange={function (value) {
                                setFieldCode(value);
                            }}
                        ></Select>
                    </TableHeaderWrap>
                </TableWrap>
                <FooterWrap style={{ marginTop: 'auto' }}>
                    <Button
                        type='primary'
                        style={{ height: '30px' }}
                        onClick={function () {
                            const activeSheetName = spread
                                .getActiveSheet()
                                .name();
                            let sheetName = '';
                            if (isEdit) {
                                sheetName = activeSheetName;
                            } else {
                                sheetName = genTemplateName(template);
                                spread.addSheet(
                                    spread.sheets.length,
                                    new GC.Spread.Sheets.Worksheet(sheetName)
                                );
                                spread.setActiveSheet(sheetName);
                            }
                            const field = fields.find(function (item) {
                                return item?.code === fieldCode;
                            });
                            let groups = {};
                            if (field && dsName) {
                                groups[dsName] = [field];
                            }
                            dispatch(
                                addTemplate({
                                    templateName: sheetName,
                                    info: {
                                        ...options,
                                        groups,
                                    },
                                })
                            );
                            dispatch(
                                toggleBooleanValue({
                                    key: 'showTemplate',
                                })
                            );

                            dispatch(
                                _toggleBooleanValue({
                                    code: 'currentSheetIsTemplate',
                                    value: true,
                                })
                            );
                        }}
                    >
                        确定
                    </Button>
                </FooterWrap>
            </Wrap>
        </Dialog>
    );
}
