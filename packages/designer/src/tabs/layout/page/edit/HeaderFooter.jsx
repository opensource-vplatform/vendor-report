import styled from 'styled-components';

import { Button, CheckBox } from '../../../../component/form/Index';
import Select from '../../../../component/form/Select';
import { HItem, HLayout, Title, VGroupItem, Wrapper } from '../../Component';
import { useDispatch, useSelector } from 'react-redux';
import { setHeaderAndFooter } from '../../../../store/layoutSlice/layoutSlice';

const Header = function (props) {
    const { left = '', center = '', right = '', style = {} } = props;
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
            <HItem>{left}</HItem>
            <HItem>{center}</HItem>
            <HItem>{right}</HItem>
        </HLayout>
    );
};

const Footer = function (props) {
    const { left = '', center = '', right = '', style = {} } = props;
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
            <HItem>{left}</HItem>
            <HItem>{center}</HItem>
            <HItem>{right}</HItem>
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

export default function () {
    const { headerAndFooter } = useSelector(({ layoutSlice }) => layoutSlice);
    const dispatch = useDispatch();
    return (
        <Wrapper>
            <VGroupItem>
                <Header></Header>
                <Title style={{ marginTop: 8 }}>页眉：</Title>
                <Select
                    datas={toDatas(headerAndFooter?.headerFormat?.items || [])}
                    value={headerAndFooter?.headerFormat?.selectedValue}
                ></Select>
                <CustomBar>
                    <Button style={btnStyle}>自定义页眉...</Button>
                    <Button style={{ ...btnStyle, marginLeft: 16 }}>
                        自定义页脚...
                    </Button>
                </CustomBar>
                <Title style={{ marginTop: 8 }}>页脚：</Title>
                <Select
                    datas={toDatas(headerAndFooter?.footerFormat?.items || [])}
                    value={headerAndFooter?.footerFormat?.selectedValue}
                ></Select>
                <Footer style={{ marginTop: 8 }}></Footer>
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
