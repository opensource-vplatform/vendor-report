import styled from 'styled-components';

import PrintIcon from './PrintIcon';

const Wrap = styled.div`
    display: flex;
    width: 100%;
    height: 100%;
    background-color: #f3f3f3;
`;

const PreviewArea = styled.div`
    width: 70%;
    height: 100%;
`;

const SettingArea = styled.div`
    width: 30%;
    height: 100%;
`;

const Title = styled.div`
    margin: 50px 0px 15px 50px;
    font-size: 36px;
    line-height: 80px;
`;

const SubTitle = styled.div`
    margin: 20px 0px 0px 50px; 
    font-size: 20px; 
    color: #217346;
`;

export default function (props) {
    return (
        <Wrap {...props}>
            <SettingArea>
                <Title>打印</Title>
                <PrintIcon></PrintIcon>
                <SubTitle>设置</SubTitle>
            </SettingArea>
            <PreviewArea></PreviewArea>
        </Wrap>
    );
}
