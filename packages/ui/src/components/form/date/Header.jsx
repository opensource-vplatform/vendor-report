import styled from 'styled-components';

import ArrowLeftIcon from '../../../icons/ArrowLeft';
import ArrowRightIcon from '../../../icons/ArrowRight';
import DoubleArrowLeftIcon from '../../../icons/DoubleArrowLeft';
import DoubleArrowRightIcon from '../../../icons/DoubleArrowRight';

const HeaderWrap = styled.div`
    display: flex;
    height: 32px;
    line-height: 32px;
    text-align: center;
    margin: 0;
    padding: 0;
    border-bottom: 1px solid #e8eaec;
`;

const HeaderTitlesWrap = styled.span`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const HeaderTitleWrap = styled.span`
    user-select: none;
    cursor: pointer;
    transition: color 0.2s ease-in-out;
`;

export default function(props) {
    const {
        year,
        month,
        dbArrowLeftVisible = true,
        arrowLeftVisible = true,
        arrowRightVisible = true,
        dbArrowRightVisible = true,
        yearLabelVisible = true,
        monthLabelVisible = true,
        onDbArrowLeftClick,
        onArrowLeftClick,
        onDbArrowRightClick,
        onArrowRightClick,
        onYearClick,
        onMonthClick,
    } = props;
    return (
        <HeaderWrap>
            {dbArrowLeftVisible ? (
                <DoubleArrowLeftIcon
                    hoverable={false}
                    style={{
                        marginLeft: 10,
                        marginTop: -4,
                        width: 20,
                    }}
                    onClick={onDbArrowLeftClick}
                ></DoubleArrowLeftIcon>
            ) : null}
            {arrowLeftVisible ? (
                <ArrowLeftIcon
                    hoverable={false}
                    style={{
                        marginTop: -4,
                        width: 20,
                    }}
                    onClick={onArrowLeftClick}
                ></ArrowLeftIcon>
            ) : null}
            <HeaderTitlesWrap>
                {yearLabelVisible ? (
                    <HeaderTitleWrap onClick={onYearClick}>
                        {year}年
                    </HeaderTitleWrap>
                ) : null}
                {monthLabelVisible ? (
                    <HeaderTitleWrap
                        style={{ marginLeft: 8 }}
                        onClick={onMonthClick}
                    >
                        {month}月
                    </HeaderTitleWrap>
                ) : null}
            </HeaderTitlesWrap>
            {arrowRightVisible ? (
                <ArrowRightIcon
                    hoverable={false}
                    style={{
                        marginTop: -4,
                        width: 20,
                    }}
                    onClick={onArrowRightClick}
                ></ArrowRightIcon>
            ) : null}
            {dbArrowRightVisible ? (
                <DoubleArrowRightIcon
                    hoverable={false}
                    style={{
                        marginTop: -4,
                        width: 20,
                        marginRight: 10,
                    }}
                    onClick={onDbArrowRightClick}
                ></DoubleArrowRightIcon>
            ) : null}
        </HeaderWrap>
    );
}
