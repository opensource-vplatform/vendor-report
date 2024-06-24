import styled from 'styled-components';

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



export default function(props) {
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