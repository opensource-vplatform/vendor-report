import {
  useDispatch,
  useSelector,
} from 'react-redux';
import styled from 'styled-components';

import CheckBox from '../../../../component/form/CheckBox';
import { Float } from '../../../../component/form/Index';
import { setMargin } from '../../../../store/layoutSlice/layoutSlice';
import {
  Divider,
  Padding,
  Title,
  VGroupItem,
  Wrapper,
} from '../../Component';

const Sheet = styled.div`
    background-image: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCA2NCA2NCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjY0IiBoZWlnaHQ9IjY0IiBmaWxsPSJyZ2IoMCwwLDAsMCkiLz4KPHBhdGggZD0iTTAgMEg2NFY2MkgwVjBaIiBmaWxsPSJ3aGl0ZSIvPgo8cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0iTTQ5IDFINjNWNEg0OVYxWk02NCAwVjRWNVY4VjlWMTJWMTNWMTZWMTdWMjBWMjFWMjRWMjVWMjhWMjlWMzJWMzNWMzZWMzdWNDBWNDFWNDRWNDVWNDhWNDlWNTJWNTNWNTZWNTdWNjJINDlINDhIMzNIMzJIMTdIMTZIMFY1N1Y1NlY1M1Y1MlY0OVY0OFY0NVY0NFY0MVY0MFYzN1YzNlYzM1YzMlYyOVYyOFYyNVYyNFYyMVYyMFYxN1YxNlYxM1YxMlY5VjhWNVY0VjBIMTZIMTdIMzJIMzNINDhINDlINjRaTTEgMzNWMzZIMTZWMzNIMVpNMTYgMzJIMVYyOUgxNlYzMlpNMTcgMzNWMzZIMzJWMzNIMTdaTTMyIDMySDE3VjI5SDMyVjMyWk0zMyAzM1YzNkg0OFYzM0gzM1pNNDggMzJIMzNWMjlINDhWMzJaTTQ5IDMzVjM2SDYzVjMzSDQ5Wk02MyAzMkg0OVYyOUg2M1YzMlpNNjMgNDFWNDRINDlWNDFINjNaTTQ4IDQxVjQ0SDMzVjQxSDQ4Wk00OCA0NUgzM1Y0OEg0OFY0NVpNMzIgNDFWNDRIMTdWNDFIMzJaTTMyIDQ1SDE3VjQ4SDMyVjQ1Wk0xNiA0MVY0NEgxVjQxSDE2Wk0xNiA0NUgxVjQ4SDE2VjQ1Wk02MyA0NUg0OVY0OEg2M1Y0NVpNMSAxN1YyMEgxNlYxN0gxWk0xNiAxNkgxVjEzSDE2VjE2Wk0xNyAxN1YyMEgzMlYxN0gxN1pNMzIgMTZIMTdWMTNIMzJWMTZaTTMzIDE3VjIwSDQ4VjE3SDMzWk00OCAxNkgzM1YxM0g0OFYxNlpNNDkgMTdWMjBINjNWMTdINDlaTTYzIDE2SDQ5VjEzSDYzVjE2Wk02MyA0OVY1Mkg0OVY0OUg2M1pNNDggNDlWNTJIMzNWNDlINDhaTTQ4IDUzSDMzVjU2SDQ4VjUzWk0zMiA0OVY1MkgxN1Y0OUgzMlpNMzIgNTNIMTdWNTZIMzJWNTNaTTE2IDQ5VjUySDFWNDlIMTZaTTE2IDUzSDFWNTZIMTZWNTNaTTYzIDUzSDQ5VjU2SDYzVjUzWk0xIDI1VjI4SDE2VjI1SDFaTTE2IDI0SDFWMjFIMTZWMjRaTTE3IDI1VjI4SDMyVjI1SDE3Wk0zMiAyNEgxN1YyMUgzMlYyNFpNMzMgMjVWMjhINDhWMjVIMzNaTTQ4IDI0SDMzVjIxSDQ4VjI0Wk00OSAyNVYyOEg2M1YyNUg0OVpNNjMgMjRINDlWMjFINjNWMjRaTTQ4IDM3SDMzVjQwSDQ4VjM3Wk0zMiAzN0gxN1Y0MEgzMlYzN1pNMTYgMzdIMVY0MEgxNlYzN1pNNjMgMzdINDlWNDBINjNWMzdaTTEgOVYxMkgxNlY5SDFaTTE2IDhIMVY1SDE2VjhaTTE3IDlWMTJIMzJWOUgxN1pNMzIgOEgxN1Y1SDMyVjhaTTMzIDlWMTJINDhWOUgzM1pNNDggOEgzM1Y1SDQ4VjhaTTQ5IDlWMTJINjNWOUg0OVpNNjMgOEg0OVY1SDYzVjhaTTQ4IDU3SDMzVjYxSDQ4VjU3Wk0zMiA1N0gxN1Y2MUgzMlY1N1pNMTYgNTdIMVY2MUgxNlY1N1pNNjMgNTdINDlWNjFINjNWNTdaTTQ4IDFWNEgzM1YxSDQ4Wk0zMiAxVjRIMTdWMUgzMlpNMTYgMVY0SDFWMUgxNloiIGZpbGw9IiNDNEM0QzQiLz4KPC9zdmc+Cg==);
    background-size: cover;
    background-repeat: no-repeat;
    position: absolute;
    width: 64px;
    height: 64px;
    &[data-align='h'] {
        left: 50%;
        transform: translateX(-50%);
    }

    &[data-align='v'] {
        top: 50%;
        transform: translateY(-50%);
    }

    &[data-align='a'] {
        left: 50%;
        top: 50%;
        transform: translate(-50%,-50%);
    }
`;

const PageWrap = styled.div`
    position: relative;
    border: 1px solid black;
    box-shadow: 1px 1px 1px black;
    width: 90px;
    height: 125px;
`;

const Header = styled.div`
    top: 6px;
    background-color: #c0c0c0;
    position: absolute;
    width: 90px;
    height: 1px;
`;

const Top = styled.div`
    top: 16px;
    background-color: #c0c0c0;
    position: absolute;
    width: 90px;
    height: 1px;
`;

const Left = styled.div`
    left: 5px;
    background-color: #c0c0c0;
    position: absolute;
    height: 125px;
    width: 1px;
`;

const Right = styled.div`
    right: 5px;
    background-color: #c0c0c0;
    position: absolute;
    height: 125px;
    width: 1px;
`;

const Bottom = styled.div`
    bottom: 16px;
    background-color: #c0c0c0;
    position: absolute;
    width: 90px;
    height: 1px;
`;

const Footer = styled.div`
    bottom: 6px;
    background-color: #c0c0c0;
    position: absolute;
    width: 90px;
    height: 1px;
`;

const SheetWrap = styled.div`
    position: absolute;
    top: 16px;
    left: 5px;
    width: 80px;
    height: 93px;
`;

const PageArea = styled.div`
    height: 260px;
    display: flex;
`;

const PageSettingItem = function (props) {
    const { title, style = {}, value, onChange } = props;
    return (
        <VGroupItem
            style={{
                display: 'flex',
                flexDirection: 'column',
                ...style,
            }}
        >
            <Title>{title}：</Title>
            <Float
                style={{ width: 50,height:24 }}
                min={0}
                step={0.25}
                value={value}
                onChange={onChange}
            ></Float>
        </VGroupItem>
    );
};

const Page = function (props) {
    const { margin } = useSelector(({ layoutSlice }) => layoutSlice);
    let align = '';
    if(margin?.centering?.horizontally){
        align = margin?.centering?.vertically ? 'a':'h';
    }else if(margin?.centering?.vertically){
        align = 'v';
    }
    return (
        <PageWrap>
            <Header></Header>
            <Top></Top>
            <Left></Left>
            <Right></Right>
            <Bottom></Bottom>
            <Footer></Footer>
            <SheetWrap>
                <Sheet data-align={align}></Sheet>
            </SheetWrap>
        </PageWrap>
    );
};

const PageSetting = function () {
    const { margin } = useSelector(({ layoutSlice }) => layoutSlice);
    const dispatch = useDispatch();
    return (
        <div
            style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <PageSettingItem
                title='左'
                style={{ width: 'max-content', flex: 'unset' }}
                value={margin ? margin.left : null}
                onChange={(val) =>
                    dispatch(setMargin({ ...margin, left: val }))
                }
            ></PageSettingItem>
            <div
                style={{
                    width: '140px',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <PageSettingItem
                    title='上'
                    style={{ marginBottom: 16 }}
                    value={margin ? margin.top : null}
                    onChange={(val) =>
                        dispatch(setMargin({ ...margin, top: val }))
                    }
                ></PageSettingItem>
                <Page></Page>
                <PageSettingItem
                    title='下'
                    style={{ marginTop: 16 }}
                    value={margin ? margin.bottom : null}
                    onChange={(val) =>
                        dispatch(setMargin({ ...margin, bottom: val }))
                    }
                ></PageSettingItem>
            </div>
            <div
                style={{
                    width: 'max-content',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <PageSettingItem
                    title='页眉'
                    style={{ marginBottom: 26, flex: 'unset' }}
                    value={margin ? margin.header : null}
                    onChange={(val) =>
                        dispatch(setMargin({ ...margin, header: val }))
                    }
                ></PageSettingItem>
                <PageSettingItem
                    title='右'
                    style={{ flex: 'unset' }}
                    value={margin ? margin.right : null}
                    onChange={(val) =>
                        dispatch(setMargin({ ...margin, right: val }))
                    }
                ></PageSettingItem>
                <PageSettingItem
                    title='页脚'
                    style={{ marginTop: 26, flex: 'unset' }}
                    value={margin ? margin.footer : null}
                    onChange={(val) =>
                        dispatch(setMargin({ ...margin, footer: val }))
                    }
                ></PageSettingItem>
            </div>
        </div>
    );
};

const checkboxStyle = { width: 'max-content' };

export default function () {
    const { margin } = useSelector(({ layoutSlice }) => layoutSlice);
    const dispatch = useDispatch();
    return (
        <Wrapper>
            <PageArea>
                <PageSetting></PageSetting>
            </PageArea>
            <Divider title='居中方式'></Divider>
            <Padding>
                <VGroupItem>
                    <CheckBox
                        title='水平居中'
                        style={checkboxStyle}
                        value={margin ? margin.centering.horizontally : false}
                        onChange={(val) =>
                            dispatch(
                                setMargin({
                                    ...margin,
                                    centering: {
                                        ...margin.centering,
                                        horizontally: val,
                                    },
                                })
                            )
                        }
                    ></CheckBox>
                    <CheckBox
                        title='垂直居中'
                        style={checkboxStyle}
                        value={margin ? margin.centering.vertically : false}
                        onChange={(val) =>
                            dispatch(
                                setMargin({
                                    ...margin,
                                    centering: {
                                        ...margin.centering,
                                        vertically: val,
                                    },
                                })
                            )
                        }
                    ></CheckBox>
                </VGroupItem>
            </Padding>
        </Wrapper>
    );
}
