import styled from 'styled-components';

import StepIcon from './StepIcon';

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

export default function(props) {
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