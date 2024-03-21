import {
  Fragment,
  useState,
} from 'react';

import {
  useDispatch,
  useSelector,
} from 'react-redux';
import styled from 'styled-components';

import Select from '../../../../component/form/Select';
import { setHeaderAndFooter } from '../../../../store/layoutSlice/layoutSlice';
import {
  HItem,
  HLayout,
  Title,
  toAttrs,
  toDatas,
  VGroupItem,
  Wrapper,
} from '../../Component';
import CustomHeaderFooter from './CustomHeaderFooter';

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

export default function () {
    const { headerAndFooter } = useSelector(({ layoutSlice }) => layoutSlice);
    const dispatch = useDispatch();
    const headerDatas = toDatas(headerAndFooter?.headerFormat?.items || []);
    const footerDatas = toDatas(headerAndFooter?.footerFormat?.items || []);
    const header = headerAndFooter?.headerFormat?.selectedValue || '';
    const footer = headerAndFooter?.footerFormat?.selectedValue || '';
    const [data, setData] = useState({
        showDialog: false,
        dialogType: '',
    });
    return (
        <Fragment>
            {data.showDialog ? (
                <CustomHeaderFooter
                    type={data.dialogType}
                    onConfirm={() => setData({ ...data, showDialog: false })}
                    onCancel={() => setData({ ...data, showDialog: false })}
                ></CustomHeaderFooter>
            ) : null}
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
                    {/*<CustomBar>
                        <Button
                            style={btnStyle}
                            onClick={() =>
                                setData({
                                    showDialog: true,
                                    dialogType: 'header',
                                })
                            }
                        >
                            自定义页眉...
                        </Button>
                        <Button
                            style={{ ...btnStyle, marginLeft: 16 }}
                            onClick={() =>
                                setData({
                                    showDialog: true,
                                    dialogType: 'footer',
                                })
                            }
                        >
                            自定义页脚...
                        </Button>
                    </CustomBar>*/}
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
                    {/*<VGroupItem style={{ marginTop: 8 }}>
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
                        </VGroupItem>*/}
                </VGroupItem>
            </Wrapper>
        </Fragment>
    );
}
