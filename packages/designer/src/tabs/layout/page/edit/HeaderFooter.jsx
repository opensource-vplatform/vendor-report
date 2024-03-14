import styled from 'styled-components';

import {
  Button,
  CheckBox,
} from '../../../../component/form/Index';
import Select from '../../../../component/form/Select';
import {
  HItem,
  HLayout,
  Title,
  VGroupItem,
  Wrapper,
} from '../../Component';

const Header = function (props) {
    const { left = '', center = '', right = '', style={} } = props;
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

const Footer = function(props){
    const { left = '', center = '', right = '', style={} } = props;
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
}

const CustomBar = styled.div`
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const btnStyle = {height:30};
const checkboxStyle = { width: 'max-content' };

export default function () {
    return (
        <Wrapper>
            <VGroupItem>
                <Header></Header>
                <Title style={{marginTop:8}}>页眉：</Title>
                <Select></Select>
                <CustomBar>
                    <Button style={btnStyle}>自定义页眉...</Button>
                    <Button style={{ ...btnStyle,marginLeft: 16 }}>自定义页脚...</Button>
                </CustomBar>
                <Title style={{marginTop:8}}>页脚：</Title>
                <Select></Select>
                <Footer style={{marginTop: 8}}></Footer>
                <VGroupItem style={{marginTop: 8}}>
                    <CheckBox title='奇偶页不同' style={checkboxStyle}></CheckBox>
                    <CheckBox title='首页不同' style={checkboxStyle}></CheckBox>
                </VGroupItem>
            </VGroupItem>
        </Wrapper>
    );
}
