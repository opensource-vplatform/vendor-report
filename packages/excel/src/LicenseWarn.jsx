import styled from 'styled-components';

const WarnWrap = styled.div`
    position: absolute;
    bottom: 50px;
    right: 50px;
    color: #6a6a6a;
    z-index: 999;
    text-align: right;
    font-size: 14px;
    pointer-events: none;
`;

export default function () {
    return (
        <WarnWrap>
            获取正式商业授权涉及费用，收费标准请发送邮件到<br></br>
            vdept@toone.com.cn咨询
        </WarnWrap>
    );
};
