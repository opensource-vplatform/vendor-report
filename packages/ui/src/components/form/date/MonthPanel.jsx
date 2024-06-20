import { Fragment } from 'react';

import styled from 'styled-components';

import {
  DateContext,
  PanelCellsWrap,
  PanelWrap,
} from './Components';
import Header from './Header';
import { dateToStr } from './utils';

const MonthCellWrap = styled.span`
    width: 40px;
    height: 28px;
    line-height: 28px;
    margin: 10px 12px;
    border-radius: 3px;
    cursor: pointer;
    display: inline-block;
    text-align: center;
    &:hover {
        background: #e1f0fe;
    }
    &[data-selected='true'] {
        background: #2d8cf0 !important;
        color: #fff !important;
    }
`;

const MonthCellEM = styled.em`
    user-select: none;
    width: 40px;
    height: 28px;
    line-height: 28px;
    margin: 0;
`;

function MonthCell(props) {
    const { month, onClick, selected = false } = props;
    return (
        <MonthCellWrap data-selected={selected} onClick={onClick}>
            <MonthCellEM>{month}月</MonthCellEM>
        </MonthCellWrap>
    );
}

const isSelected = function (value, year, month) {
    if (value) {
        const date = new Date(value);
        return date.getFullYear() == year && date.getMonth() == month;
    }
    return false;
};

function Panel(props) {
    const { value, locateDate, setLocateDate, setMode } = props;
    const date = new Date(locateDate);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const children = [];
    for (let i = 1; i < 13; i++) {
        children.push(
            <MonthCell
                key={i}
                month={i}
                selected={isSelected(value, year, i - 1)}
                onClick={() => {
                    date.setMonth(i - 1);
                    setLocateDate(dateToStr(date));
                    setMode('date');
                }}
            ></MonthCell>
        );
    }
    return (
        <Fragment>
            <Header
                year={year}
                month={month}
                arrowLeftVisible={false}
                arrowRightVisible={false}
                onYearClick={() => {
                    setMode('year');
                }}
                onDbArrowLeftClick={() => {
                    date.setFullYear(year - 1);
                    setLocateDate(dateToStr(date));
                }}
                onDbArrowRightClick={() => {
                    date.setFullYear(year + 1);
                    setLocateDate(dateToStr(date));
                }}
            ></Header>
            <PanelWrap>
                <PanelCellsWrap>{children}</PanelCellsWrap>
            </PanelWrap>
        </Fragment>
    );
}

export default function () {
    return (
        <DateContext.Consumer>
            {(ctx) => {
                const { value, locateDate, setLocateDate, setMode } = ctx;
                return (
                    <Panel
                        value={value}
                        locateDate={locateDate}
                        setLocateDate={setLocateDate}
                        setMode={setMode}
                    ></Panel>
                );
            }}
        </DateContext.Consumer>
    );
}
