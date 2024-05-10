import { useState } from 'react';

import {
  useDispatch,
  useSelector,
} from 'react-redux';
import styled from 'styled-components';

import Button from '@components/button/Index';
import ColorEditor from '@components/color/Index';
import { Dialog } from '@components/dialog/Index';
import CheckBox from '@components/form/CheckBox';
import { Select } from '@components/form/Index';
import TextInput from '@components/form/TextInput';
import {
  Tab,
  Tabs,
} from '@components/tabs/Index';
import { toggleBooleanValue } from '@store/datasourceSlice/datasourceSlice';
import {
  getActiveIndexBySheet,
  getCellTag,
  setCellTag,
} from '@utils/worksheetUtil';

const Wrap = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 20px;
    font-size: 12px;
    height: 550px;
    user-select: none;
`;

const RowWrap = styled.div`
    display: flex;
    align-items: center;
    gap: 20px;
`;

const TabWrap = styled.div`
    display: flex;
    gap: 8px;
    flex-direction: column;
    padding: 8px;
    background: #fff;
    height: calc(100% - 30px);
`;

const SheetNameList = styled.div`
    height: 95px;
    overflow-y: auto;
    border: solid 1px #d3d3d3;
`;

const SheetNameListItem = styled.div`
    padding: 8px;
    cursor: pointer;
    &:hover {
        background: #ddd;
    }
    &.active {
        background: #d3d3d3;
    }
`;

const btnStyles = {
    height: '30px',
};

const Label = styled.div`
    width: 100px;
`;

const LinkColorWrap = styled.div`
    width: 100%;
    border: solid 1px lightgray;
    position: relative;
    box-sizing: border-box;
    height: 30px;
    display: flex;
    cursor: pointer;
    align-items: center;
    flex: 1;
`;

const BtnDropdown = styled.div`
    width: 18px;
    height: 100%;
    background-image: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB2aWV3Qm94PSIwIDAgMTYgMTYiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDU1LjIgKDc4MTgxKSAtIGh0dHBzOi8vc2tldGNoYXBwLmNvbSAtLT4KICAgIDx0aXRsZT5Ecm9wZG93biBidXR0b248L3RpdGxlPgogICAgPGRlc2M+Q3JlYXRlZCB3aXRoIFNrZXRjaC48L2Rlc2M+CiAgICA8ZyBpZD0iRHJvcGRvd24tYnV0dG9uIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4KICAgICAgICA8cG9seWdvbiBpZD0i6Lev5b6ELTQiIGZpbGw9IiM2NjY2NjYiIHBvaW50cz0iMyA1IDEzIDUgOCAxMCI+PC9wb2x5Z29uPgogICAgPC9nPgo8L3N2Zz4=);
    background-position: center center;
    background-repeat: no-repeat;
    background-color: white;
    border-left: solid 1px lightgray;
    cursor: pointer;
`;

const ColorContent = styled.div`
    flex: 1 1 0%;
    height: 100%;
    display: flex;
    align-items: center;
    padding: 0 8px;
`;

const ColorContentValue = styled.div`
    height: 20px;
    width: 100%;
`;

const ColorEditorWrap = styled.div`
    display: flex;
    width: 100%;
    flex: 1;
`;

const HyperLinkTargetType = [
    {
        value: 0,
        text: '新窗口',
    },
    {
        value: 1,
        text: '当前页面',
    },
    {
        value: 2,
        text: '父框架',
    },
    {
        value: 3,
        text: '整个窗口',
    },
];

function Color(props) {
    const { onChange, value = '#0563c1' } = props;
    const handleChange = function (val) {
        setColor(val);
        if (typeof onChange === 'function') {
            onChange(val);
        }
    };
    const [color, setColor] = useState(value);
    return (
        <ColorEditorWrap>
            <ColorEditor
                style={{ flex: 1, width: '100%' }}
                onChange={handleChange}
            >
                <LinkColorWrap>
                    <ColorContent>
                        <ColorContentValue
                            style={{
                                backgroundColor: `${color}`,
                            }}
                        ></ColorContentValue>
                    </ColorContent>
                    <BtnDropdown></BtnDropdown>
                </LinkColorWrap>
            </ColorEditor>
            <div style={{ width: '100px', textAlign: 'right' }}>
                <Button
                    style={{ height: '30px' }}
                    onClick={function () {
                        handleChange(value);
                    }}
                >
                    重置
                </Button>
            </div>
        </ColorEditorWrap>
    );
}

export default function Index(props) {
    const { spread } = useSelector(({ appSlice }) => appSlice);
    const activeSheet = spread.getActiveSheet();
    const {row,col} = getActiveIndexBySheet(activeSheet);
    const activeCellValue =
        activeSheet.getCell(row, col).value() || '';
    const sheetNameList = spread.sheets.map(function (sheet) {
        return sheet.name();
    });

    const hyperlinkInfo =
        activeSheet.getHyperlink(row, col) || {};
    const initDatas = {
        text: activeCellValue,
        tooltip: activeCellValue,
        linkColor: '#0563c1',
        visitedLinkColor: '#954f72',
        url: '',
        sheetName: '',
        subject: '',
        type: 'webpage',
        target: 0,
        ...hyperlinkInfo,
        isAutoDoc: false,
    };

    const _hyperlinkInfo = getCellTag(
        activeSheet,
        row,
        col,
        'hyperlinkInfo'
    );
    if (_hyperlinkInfo) {
        initDatas.type = _hyperlinkInfo.type;
        initDatas.sheetName = _hyperlinkInfo.sheetName;
        initDatas.subject = _hyperlinkInfo.subject;
        initDatas.isAutoDoc = _hyperlinkInfo.isAutoDoc;
    }
    const dispatch = useDispatch();
    const [datas, setDatas] = useState(initDatas);
    const handleOnClose = function () {
        dispatch(
            toggleBooleanValue({
                code: 'showHyperlink',
                value: false,
            })
        );
    };
    return (
        <Dialog
            title='超链接'
            width='80%'
            anchor={true}
            onClose={handleOnClose}
            style={{ maxWidth: '800px' }}
        >
            <Wrap>
                <RowWrap>
                    <Label>要显示的文本</Label>
                    <TextInput
                        style={{ flex: 1 }}
                        value={datas.text}
                        onChange={function (e) {
                            setDatas({
                                ...datas,
                                text: e.target.value,
                            });
                        }}
                    ></TextInput>
                </RowWrap>
                <RowWrap>
                    <Label>屏幕提示</Label>
                    <TextInput
                        style={{ flex: 1 }}
                        value={datas.tooltip}
                        onChange={function (e) {
                            setDatas({
                                ...datas,
                                tooltip: e.target.value,
                            });
                        }}
                    ></TextInput>
                </RowWrap>
                <RowWrap>
                    <Label>打开方式</Label>
                    <Select
                        datas={HyperLinkTargetType}
                        value={datas.target}
                        wrapStyle={{ width: '100%', flex: 1, height: '35px' }}
                        style={{ height: '100%', borderRadius: '4px' }}
                        onChange={function (val) {
                            setDatas({
                                ...datas,
                                target: Number(val),
                            });
                        }}
                    ></Select>
                </RowWrap>
                <RowWrap>
                    <Label>链接颜色</Label>
                    <Color
                        value={datas.linkColor}
                        onChange={function (val) {
                            setDatas({
                                ...datas,
                                linkColor: val,
                            });
                        }}
                    ></Color>
                </RowWrap>
                <RowWrap>
                    <Label>已访问链接颜色</Label>
                    <Color
                        value={datas.visitedLinkColor}
                        onChange={function (val) {
                            setDatas({
                                ...datas,
                                visitedLinkColor: val,
                            });
                        }}
                    ></Color>
                </RowWrap>
                <Tabs
                    type='line'
                    style={{ height: '100%', flex: 1 }}
                    headerStyle={{ height: 35 }}
                    onChange={function (type) {
                        const newDatas = {
                            ...datas,
                            url: '',
                            sheetName: '',
                            subject: '',
                            type,
                            isAutoDoc: false,
                        };
                        setDatas(newDatas);
                    }}
                    value={datas.type}
                >
                    <Tab
                        code='webpage'
                        title='网页'
                        style={{
                            height: 'calc(100% - 35px)',
                            display: 'flex',
                            flexDirection: 'column',
                        }}
                    >
                        <TabWrap>
                            <div>链接到网页地址：</div>
                            <TextInput
                                placeholder='URL, 例如 http://www.example.com'
                                onChange={function (e) {
                                    setDatas({
                                        ...datas,
                                        url: e?.target?.value,
                                    });
                                }}
                                value={datas.url}
                            ></TextInput>
                        </TabWrap>
                    </Tab>
                    <Tab
                        code='document'
                        title='此文档'
                        style={{
                            height: 'calc(100% - 35px)',
                            display: 'flex',
                            flexDirection: 'column',
                        }}
                    >
                        <TabWrap>
                            <div>
                                <div>
                                    动态文档（根据单元格的值，动态链接到不同的页签）
                                </div>
                                <div>
                                    <CheckBox
                                        value={datas.isAutoDoc}
                                        onChange={function (val) {
                                            setDatas({
                                                ...datas,
                                                isAutoDoc: val,
                                            });
                                        }}
                                    ></CheckBox>
                                </div>
                            </div>
                            <div>输入单元格引用:</div>
                            <TextInput
                                value={
                                    datas.sheetName
                                        ? `${datas.sheetName}!A1`
                                        : ''
                                }
                            ></TextInput>
                            <div>或在此文档中选择一个位置：</div>
                            <SheetNameList>
                                {sheetNameList.map(function (name, index) {
                                    return (
                                        <SheetNameListItem
                                            key={index}
                                            onClick={function () {
                                                setDatas({
                                                    ...datas,
                                                    url: `sjs://${name}!A1`,
                                                    sheetName: name,
                                                });
                                            }}
                                            className={
                                                datas.sheetName === name
                                                    ? 'active'
                                                    : ''
                                            }
                                        >
                                            {name}
                                        </SheetNameListItem>
                                    );
                                })}
                            </SheetNameList>
                        </TabWrap>
                    </Tab>
                    <Tab
                        code='email'
                        title='电子邮件地址'
                        style={{
                            height: 'calc(100% - 35px)',
                            display: 'flex',
                            flexDirection: 'column',
                        }}
                    >
                        <TabWrap>
                            <div>电子邮件地址：</div>
                            <TextInput
                                onChange={function (e) {
                                    setDatas({
                                        ...datas,
                                        url: e.target.value,
                                    });
                                }}
                                value={datas.url}
                            ></TextInput>
                            <div>主题：</div>
                            <TextInput
                                onChange={function (e) {
                                    setDatas({
                                        ...datas,
                                        subject: e.target.value,
                                    });
                                }}
                                value={datas.subject}
                            ></TextInput>
                        </TabWrap>
                    </Tab>
                </Tabs>
                <RowWrap style={{ justifyContent: 'flex-end' }}>
                    <Button
                        style={btnStyles}
                        onClick={function () {
                            activeSheet.setHyperlink(
                                row,
                                col,
                                null
                            );
                            handleOnClose();
                        }}
                    >
                        删除
                    </Button>
                    <Button
                        style={btnStyles}
                        onClick={function () {
                            activeSheet.setHyperlink(
                                row,
                                col,
                                {
                                    ...datas,
                                }
                            );
                            handleOnClose();
                            setCellTag(
                                activeSheet,
                                row,
                                col,
                                'hyperlinkInfo',
                                datas
                            );
                        }}
                    >
                        确定
                    </Button>
                    <Button style={btnStyles} onClick={handleOnClose}>
                        取消
                    </Button>
                </RowWrap>
            </Wrap>
        </Dialog>
    );
}
