import styled from 'styled-components';

const IndexWrap = styled.div`
    display: flex;
    flex-direction: row;
    padding: 20px 0px;
    background: #fff;
    box-sizing: border-box;
`;

const StepWrap = styled.div`
    position: relative;
    padding: 0px 8px;
    flex: 1 1 0%;
    user-select: none;
`;

const StepLabelRoot = styled.span`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const StepIconContainer = styled.span`
    padding-right: 0px;
    display: flex;
    flex-shrink: 0;
`;

const StepLabelContainer = styled.span`
    text-align: center;
    width: 100%;
    color: rgba(0, 0, 0, 0.6);
`;

const StepLabel = styled.span`
    color: rgba(0, 0, 0, 0.87);
    margin-top: 16px;
    font-weight: 400;
    font-size: 14px;
    line-height: 1.43;
    letter-spacing: 0.01071em;
    display: block;
    transition: color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
`;

const StepIconSvg = styled.svg`
    user-select: none;
    width: 24px;
    height: 24px;
    fill: currentcolor;
    flex-shrink: 0;
    font-size: 14px;
    display: block;
    color: rgba(0, 0, 0, 0.38);
    transition: color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;

    &.active {
        color: #217346;
    }
`;

const StepIconSvgText = styled.text`
    fill: white;
    font-size: 12px;
`;

const StepConnectorRoot = styled.div`
    position: absolute;
    top: 12px;
    left: calc(-50% + 20px);
    right: calc(50% + 20px);
`;

const StepConnectorLine = styled.span`
    display: block;
    border-color: rgb(189, 189, 189);
    border-top-style: solid;
    border-top-width: 1px;

    &.active {
        border-color: #217346;
    }
`;

const StepIconSvgCompleted = styled.svg`
    user-select: none;
    width: 24px;
    height: 24px;
    fill: currentcolor;
    flex-shrink: 0;
    font-size: 14px;
    display: block;
    transition: color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    color: #217346;
`;

function StepIcon(props) {
    const { isCompleted, active, index = 0 } = props;

    if (isCompleted) {
        return (
            <StepIconSvgCompleted focusable='false' viewBox='0 0 24 24'>
                <path d='M12 0a12 12 0 1 0 0 24 12 12 0 0 0 0-24zm-2 17l-5-5 1.4-1.4 3.6 3.6 7.6-7.6L19 8l-9 9z'></path>
            </StepIconSvgCompleted>
        );
    }

    return (
        <StepIconSvg className={active} focusable='false' viewBox='0 0 24 24'>
            <circle cx='12' cy='12' r='12'></circle>
            <StepIconSvgText
                x='12'
                y='12'
                textAnchor='middle'
                dominantBaseline='central'
            >
                {index + 1}
            </StepIconSvgText>
        </StepIconSvg>
    );
}

function Step(props) {
    const { text = '', index = 0, activeIndex = 0 } = props;
    const isCompleted = activeIndex > index;
    const active = index === activeIndex || isCompleted ? 'active' : '';

    return (
        <StepWrap>
            {index > 0 && (
                <StepConnectorRoot>
                    <StepConnectorLine className={active}></StepConnectorLine>
                </StepConnectorRoot>
            )}
            <StepLabelRoot>
                <StepIconContainer>
                    <StepIcon
                        isCompleted={isCompleted}
                        index={index}
                        active={active}
                    ></StepIcon>
                </StepIconContainer>
                <StepLabelContainer>
                    <StepLabel>{text}</StepLabel>
                </StepLabelContainer>
            </StepLabelRoot>
        </StepWrap>
    );
}

export default function Index(props) {
    const { datas = [], activeIndex = 0, style = {} } = props;
    return (
        <IndexWrap style={{ ...style }}>
            {datas.map(function ({ text }, index) {
                return (
                    <Step
                        text={text}
                        index={index}
                        activeIndex={activeIndex}
                        key={index}
                    ></Step>
                );
            })}
        </IndexWrap>
    );
}
