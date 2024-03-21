import {
  Fragment,
  useEffect,
  useRef,
  useState,
} from 'react';

import { useSelector } from 'react-redux';
import styled from 'styled-components';

//页脚
import OperationDialog from '@components/dialog/OperationDialog';
import {
  Tab,
  Tabs,
} from '@components/tabs/Index';
import PageCountIcon from '@icons/layout/page/custom/Count';
import DateIcon from '@icons/layout/page/custom/Date';
import ImageIcon from '@icons/layout/page/custom/Image';
import PageIndexIcon from '@icons/layout/page/custom/Index';
import SheetIcon from '@icons/layout/page/custom/Sheet';
import TableIcon from '@icons/layout/page/custom/Table';
import TimeIcon from '@icons/layout/page/custom/Time';

import {
  HLayout,
  Padding,
  Text,
  VGroupItem,
  Wrapper,
} from '../../Component';

const iconSize = {
    width: 14,
    height: 14,
};

const iconStyle = {
    border: '1px solid #ddd',
    margin: 0,
};

const TextArea = styled.div`
    overflow-y: auto;
    outline: 0;
    padding: 10px;
    font-size: 12px;
    height: 100%;
    border: 1px solid black;
`;

const TextAreaItem = function (props) {
    const {
        title,
        align,
        value = '',
        type = '',
        position = '',
        onFocus,
        onInit,
        onBlur,
    } = props;
    const ref = useRef(null);
    useEffect(() => {
        if (ref.current) {
            onInit && onInit(ref.current);
        }
    }, []);
    return (
        <Fragment>
            <VGroupItem style={{ width: 200, height: 85 }}>
                <Text>{title}：</Text>
                <TextArea
                    contentEditable={true}
                    style={{ textAlign: align }}
                    data-type={type}
                    data-position={position}
                    data-align={align}
                    onFocus={(evt) => onFocus && onFocus(evt.target)}
                    onBlur={(evt) => onBlur && onBlur(evt.target)}
                    ref={ref}
                >
                    {value}
                </TextArea>
            </VGroupItem>
        </Fragment>
    );
};

const insertTextAtCursor = function (el, activeRange, text) {
    if (
        (el && el.dataset && el.dataset.type == 'header') ||
        el.dataset.type == 'footer'
    ) {
        if (activeRange) {
            window.getSelection().removeAllRanges();
            window.getSelection().addRange(activeRange);
        }
        // 获取光标位置的Range对象
        const range = window.getSelection().getRangeAt(0);
        // 创建一个文本节点
        const textNode = document.createTextNode(text);
        // 将文本节点插入到Range对象的起始位置
        range.insertNode(textNode);
        // 将光标定位到插入的文本之后
        range.setStartAfter(textNode);
        range.setEndAfter(textNode);
        // 清除已选内容
        window.getSelection().removeAllRanges();
        window.getSelection().addRange(range);
        el.focus();
    }
};

const TabItem = function (props) {
    const {
        left = '',
        center = '',
        right = '',
        type = '',
        position = '',
    } = props;
    const [data, setData] = useState({
        leftEl: null,
        centerEl: null,
        rightEl: null,
        activeEl: null,
        activeRange: null,
    });
    const handleChange = () => {

    };
    return (
        <Wrapper style={{ height: 226 }}>
            <Padding>
                <VGroupItem>
                    <Text>
                        若要设置文本格式，请先选定文本，然后选择“设置文本格式”按钮。
                    </Text>
                    <Text style={{ marginTop: 16 }}>
                        若要插入页码、日期、时间、工作表名或工作簿名，请将插入点移至编辑框内，然后选择相应按钮。
                    </Text>
                    <Text style={{ marginTop: 16 }}>
                        若要插入图片，请按“插入图片”按钮。
                    </Text>
                    <HLayout
                        style={{
                            alignItems: 'center',
                            marginTop: 16,
                            justifyContent: 'center',
                        }}
                    >
                        <PageIndexIcon
                            style={iconStyle}
                            iconStyle={iconSize}
                            tips='插入页码'
                            onClick={() => {
                                insertTextAtCursor(
                                    data.activeEl,
                                    data.activeRange,
                                    '&P'
                                );
                                handleChange();
                            }}
                        ></PageIndexIcon>
                        <PageCountIcon
                            style={iconStyle}
                            iconStyle={iconSize}
                            tips='插入页数'
                            onClick={() => {
                                insertTextAtCursor(
                                    data.activeEl,
                                    data.activeRange,
                                    '&N'
                                );
                                handleChange();
                            }}
                        ></PageCountIcon>
                        <DateIcon
                            style={{ ...iconStyle, marginLeft: 8 }}
                            iconStyle={iconSize}
                            tips='插入日期'
                            onClick={() => {
                                insertTextAtCursor(
                                    data.activeEl,
                                    data.activeRange,
                                    '&D'
                                );
                                handleChange();
                            }}
                        ></DateIcon>
                        <TimeIcon
                            style={iconStyle}
                            iconStyle={iconSize}
                            tips='插入时间'
                            onClick={() => {
                                insertTextAtCursor(
                                    data.activeEl,
                                    data.activeRange,
                                    '&T'
                                );
                                handleChange();
                            }}
                        ></TimeIcon>
                        <SheetIcon
                            style={{ ...iconStyle, marginLeft: 8 }}
                            iconStyle={iconSize}
                            tips='插入工作簿名'
                            onClick={() => {
                                insertTextAtCursor(
                                    data.activeEl,
                                    data.activeRange,
                                    '&F'
                                );
                                handleChange();
                            }}
                        ></SheetIcon>
                        <TableIcon
                            style={iconStyle}
                            iconStyle={iconSize}
                            tips='插入数据表名'
                            onClick={() => {
                                insertTextAtCursor(
                                    data.activeEl,
                                    data.activeRange,
                                    '&A'
                                );
                                handleChange();
                            }}
                        ></TableIcon>
                        <ImageIcon
                            style={{ ...iconStyle, marginLeft: 8 }}
                            iconStyle={iconSize}
                            tips='插入图片'
                        ></ImageIcon>
                    </HLayout>
                    <HLayout style={{ gap: 10 }}>
                        <TextAreaItem
                            title='左部'
                            align='left'
                            type={type}
                            position={position}
                            value={left}
                            onInit={(el) => {
                                data.leftEl = el;
                            }}
                            onFocus={(el) => {
                                data.activeEl = el;
                            }}
                            onBlur={() => {
                                data.activeRange = window
                                    .getSelection()
                                    .getRangeAt(0);
                            }}
                        ></TextAreaItem>
                        <TextAreaItem
                            title='中部'
                            align='center'
                            value={center}
                            type={type}
                            position={position}
                            onInit={(el) => {
                                data.centerEl = el;
                            }}
                            onFocus={(el) => {
                                data.activeEl = el;
                            }}
                            onBlur={() => {
                                data.activeRange = window
                                    .getSelection()
                                    .getRangeAt(0);
                            }}
                        ></TextAreaItem>
                        <TextAreaItem
                            title='右部'
                            align='right'
                            value={right}
                            type={type}
                            position={position}
                            onInit={(el) => {
                                data.rightEl = el;
                            }}
                            onFocus={(el) => {
                                data.activeEl = el;
                            }}
                            onBlur={() => {
                                data.activeRange = window
                                    .getSelection()
                                    .getRangeAt(0);
                            }}
                        ></TextAreaItem>
                    </HLayout>
                </VGroupItem>
            </Padding>
        </Wrapper>
    );
};

export default function (props) {
    const { type, onConfirm, onCancel } = props;
    const isHeader = type == 'header';
    const { headerAndFooter } = useSelector(({ layoutSlice }) => layoutSlice);
    //奇偶不同
    const differentOddEven = headerAndFooter?.differentOddEven;
    //首页不同
    const differentFirst = headerAndFooter?.differentFirst;
    const header =
        headerAndFooter?.headerFormat?.selectedValue ||
        '{left:"",center:"",right:""}';
    const footer =
        headerAndFooter?.footerFormat?.selectedValue ||
        '{left:"",center:"",right:""}';
    return (
        <OperationDialog onConfirm={onConfirm} onCancel={onCancel}>
            <Tabs>
                {isHeader && !differentOddEven ? (
                    <Tab code='header' title='页眉'>
                        <TabItem
                            {...JSON.parse(header)}
                            type='header'
                            position='normal'
                        ></TabItem>
                    </Tab>
                ) : null}
                {!isHeader && !differentOddEven ? (
                    <Tab code='footer' title='页脚'>
                        <TabItem
                            {...JSON.parse(footer)}
                            type='footer'
                            position='normal'
                        ></TabItem>
                    </Tab>
                ) : null}
                {isHeader && differentFirst ? (
                    <Tab code='firstHeader' title='首页页眉'>
                        <TabItem type='header' position='first'></TabItem>
                    </Tab>
                ) : null}
                {!isHeader && differentFirst ? (
                    <Tab code='firstFooter' title='首页页脚'>
                        <TabItem type='footer' position='first'></TabItem>
                    </Tab>
                ) : null}
                {isHeader && differentOddEven ? (
                    <Tab code='oddHeader' title='奇数页眉'>
                        <TabItem type='header' position='odd'></TabItem>
                    </Tab>
                ) : null}
                {!isHeader && differentOddEven ? (
                    <Tab code='oddFooter' title='奇数页脚'>
                        <TabItem type='footer' position='odd'></TabItem>
                    </Tab>
                ) : null}
                {isHeader && differentOddEven ? (
                    <Tab code='evenHeader' title='偶数页眉'>
                        <TabItem type='header' position='even'></TabItem>
                    </Tab>
                ) : null}
                {!isHeader && differentOddEven ? (
                    <Tab code='evenFooter' title='偶数页脚'>
                        <TabItem type='footer' position='even'></TabItem>
                    </Tab>
                ) : null}
            </Tabs>
        </OperationDialog>
    );
}
