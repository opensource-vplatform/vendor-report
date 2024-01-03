import styled from 'styled-components';

import ErrorImgIcon from '@assets/images/error_icon.png';

const ErrorWrap = styled.div`
    color: #6a6a6a;
    text-align: center;
    vertical-align: middle;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 440px;
    white-space: nowrap;
`;

const ErrorIcon = styled.img`
    display: inline-block;
    width: 100px;
    height: 105px;
    vertical-align: middle;
`;

const ErrorContent = styled.span`
    display: inline-block;
    padding-left: 10px;
    text-align: left;
    vertical-align: middle;
    font-size: 14px;
`;

const ErrorTitle = styled.span`
    display: inline-block;
    font-size: 20px;
    font-weight: 600;
    opacity: 0.8;
`;

export default function () {
    return (
        <ErrorWrap>
            <ErrorIcon src={ErrorImgIcon}></ErrorIcon>
            <ErrorContent>
                <ErrorTitle>未找到有效许可证！</ErrorTitle>
                <br></br>
                获取正式商业授权涉及费用，收费标准请发送邮件到
                <br></br>
                vdept@toone.com.cn咨询。
            </ErrorContent>
        </ErrorWrap>
    );
};