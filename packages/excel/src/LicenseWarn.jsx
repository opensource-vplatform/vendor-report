import { withDivStyled } from './utils/componentUtil';

const WarnWrap = withDivStyled({
    position: 'absolute',
    bottom: '50px',
    right: '50px',
    color: '#6a6a6a',
    zIndex: '999',
    textAlign: 'right',
    fontSize: '14px',
    pointerEvents: 'none',
});

export default function () {
    return (
        <WarnWrap>
            获取正式商业授权涉及费用，收费标准请发送邮件到<br></br>
            vdept@toone.com.cn咨询
        </WarnWrap>
    );
}
