import {
  useDispatch,
  useSelector,
} from 'react-redux';
import styled from 'styled-components';

import {
  Button,
  CheckBox,
} from '../../../../component/form/Index';
import Select from '../../../../component/form/Select';
import { setHeaderAndFooter } from '../../../../store/layoutSlice/layoutSlice';
import {
  HItem,
  HLayout,
  Title,
  VGroupItem,
  Wrapper,
} from '../../Component';

const Header = function (props) {
    const { left = '', center = '', right = '', style = {} } = props;
    const st = { fontSize: 10, paddingTop: 16 };
    return (
        <HLayout
            style={{
                ...style,
                boxShadow: '1px -0.1px 0px black',
                overflow: 'hidden',
                border: '1px solid black',
                borderBottom: 'none',
                height: '50px',
            }}
        >
            <HItem style={st}>{left}</HItem>
            <HItem style={{ ...st, justifyContent: 'center' }}>{center}</HItem>
            <HItem style={{ ...st, justifyContent: 'end' }}>{right}</HItem>
        </HLayout>
    );
};

const Footer = function (props) {
    const { left = '', center = '', right = '', style = {} } = props;
    const st = { fontSize: 10, paddingTop: 16 };
    return (
        <HLayout
            style={{
                ...style,
                boxShadow: '1px 1px 0px black',
                overflow: 'hidden',
                border: '1px solid black',
                borderTop: 'none',
                height: '50px',
            }}
        >
            <HItem style={st}>{left}</HItem>
            <HItem style={{ ...st, justifyContent: 'center' }}>{center}</HItem>
            <HItem style={{ ...st, justifyContent: 'end' }}>{right}</HItem>
        </HLayout>
    );
};

const CustomBar = styled.div`
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const btnStyle = { height: 30 };
const checkboxStyle = { width: 'max-content' };

const toDatas = function (datas) {
    return datas.map((data) => {
        return {
            value: data.value,
            text: data.text,
            title: data.text,
        };
    });
};

const getDisplayText = function (val, datas) {
    let text = '';
    for (let i = 0, l = datas.length; i < l; i++) {
        const data = datas[i];
        if (val == data.value) {
            text = data.text;
            break;
        }
    }
    return text == '(无)' ? '' : text;
};

const toAttrs = function (val, datas) {
    const text = getDisplayText(val, datas);
    const list = text.split(',');
    let left = '',
        center = '',
        right = '';
    if (list.length == 1) {
        center = list[0];
    } else if (list.length == 2) {
        center = list[0];
        right = list[1];
    } else if (list.length == 3) {
        left = list[0];
        center = list[1];
        right = list[2];
    }
    return {
        left,
        center,
        right,
    };
};

export default function () {
    const { headerAndFooter } = useSelector(({ layoutSlice }) => layoutSlice);
    const dispatch = useDispatch();
    const headerDatas = toDatas(headerAndFooter?.headerFormat?.items || []);
    const footerDatas = toDatas(headerAndFooter?.footerFormat?.items || []);
    const header = headerAndFooter?.headerFormat?.selectedValue || '';
    const footer = headerAndFooter?.footerFormat?.selectedValue || '';
    return (
        <Wrapper>
            <VGroupItem>
                <Header {...toAttrs(header, headerDatas)}></Header>
                <Title style={{ marginTop: 8 }}>页眉：</Title>
                <Select
                    datas={headerDatas}
                    value={header}
                    disabled={
                        headerAndFooter?.differentOddEven ||
                        headerAndFooter?.differentFirst
                    }
                    onChange={(val) => {
                        const pageHeaderFooter =
                            headerAndFooter.pageHeaderFooter;
                        const normal = pageHeaderFooter.normal;
                        dispatch(
                            setHeaderAndFooter({
                                ...headerAndFooter,
                                headerFormat: {
                                    ...headerAndFooter.headerFormat,
                                    selectedValue: val,
                                },
                                pageHeaderFooter: {
                                    ...pageHeaderFooter,
                                    normal: {
                                        ...normal,
                                        header: JSON.parse(val),
                                    },
                                },
                            })
                        );
                    }}
                ></Select>
                <CustomBar>
                    <Button style={btnStyle}>自定义页眉...</Button>
                    <Button style={{ ...btnStyle, marginLeft: 16 }}>
                        自定义页脚...
                    </Button>
                </CustomBar>
                <Title style={{ marginTop: 8 }}>页脚：</Title>
                <Select
                    datas={footerDatas}
                    value={footer}
                    disabled={
                        headerAndFooter?.differentOddEven ||
                        headerAndFooter?.differentFirst
                    }
                    onChange={(val) => {
                        const pageHeaderFooter =
                            headerAndFooter.pageHeaderFooter;
                        const normal = pageHeaderFooter.normal;
                        dispatch(
                            setHeaderAndFooter({
                                ...headerAndFooter,
                                footerFormat: {
                                    ...headerAndFooter.footerFormat,
                                    selectedValue: val,
                                },
                                pageHeaderFooter: {
                                    ...pageHeaderFooter,
                                    normal: {
                                        ...normal,
                                        footer: JSON.parse(val),
                                    },
                                },
                            })
                        );
                    }}
                ></Select>
                <Footer
                    style={{ marginTop: 8 }}
                    {...toAttrs(footer, footerDatas)}
                ></Footer>
                <VGroupItem style={{ marginTop: 8 }}>
                    <CheckBox
                        title='奇偶页不同'
                        style={checkboxStyle}
                        value={headerAndFooter?.differentOddEven}
                        onChange={(val) =>
                            dispatch(
                                setHeaderAndFooter({
                                    ...headerAndFooter,
                                    differentOddEven: val,
                                })
                            )
                        }
                    ></CheckBox>
                    <CheckBox
                        title='首页不同'
                        style={checkboxStyle}
                        value={headerAndFooter?.differentFirst}
                        onChange={(val) =>
                            dispatch(
                                setHeaderAndFooter({
                                    ...headerAndFooter,
                                    differentFirst: val,
                                })
                            )
                        }
                    ></CheckBox>
                </VGroupItem>
            </VGroupItem>
        </Wrapper>
    );
}
