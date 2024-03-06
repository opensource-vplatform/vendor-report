import ErrorImgIcon from './assets/images/error_icon.png';
import {
  withDivStyled,
  withImgStyled,
  withSpanStyled,
} from './utils/componentUtil';

const ErrorWrap = withDivStyled({
    color: '#6a6a6a',
    textAlign: 'center',
    verticalAlign: 'middle',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '440px',
    whiteSpace: 'nowrap',
});

const ErrorIcon = withImgStyled({
    display: 'inline-block',
    width: '100px',
    height: '105px',
    verticalAlign: 'middle',
});

const ErrorContent = withSpanStyled({
    display: 'inline-block',
    paddingLeft: '10px',
    textAlign: 'left',
    verticalAlign: 'middle',
    fontSize: '14px',
});

const ErrorTitle = withSpanStyled({
    display: 'inline-block',
    fontSize: '20px',
    fontWeight: '600',
    opacity: '0.8',
});

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
}
