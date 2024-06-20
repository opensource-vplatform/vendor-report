import { Fragment } from 'react';

import styled from 'styled-components';

import {
  DateContext,
  PanelCellsWrap,
  PanelWrap,
} from './Components';
import Header from './Header';
import {
  dateToStr,
  getDateCount,
} from './utils';

const PanelHeaderCellsWrap = styled.div`
    margin: 0;
    padding: 0;
`;

const PanelHeaderCell = styled.span`
    user-select: none;
    line-height: 24px;
    text-align: center;
    margin: 2px;
    color: #c5c8ce;
    display: inline-block;
    width: 24px;
    height: 24px;
    cursor: text;
`;

const DateCellWrap = styled.span`
    user-select: none;
    width: 28px;
    height: 28px;
    cursor: pointer;
    display: inline-block;
`;

const DateCellEM = styled.em`
    position: relative;
    user-select: none;
    display: inline-block;
    width: 24px;
    height: 24px;
    line-height: 24px;
    margin: 2px;
    font-style: normal;
    border-radius: 3px;
    text-align: center;
    transition: all 0.2s ease-in-out;
    &[data-selected='true'] {
        background: #2d8cf0 !important;
        color: #fff !important;
    }
    &[data-today='true']:after {
        content: '';
        display: block;
        width: 6px;
        height: 6px;
        border-radius: 50%;
        background: #2d8cf0;
        position: absolute;
        top: 1px;
        right: 1px;
    }
    &[data-pre-month='true'] {
        color: #c5c8ce;
    }
    &[data-next-month='true'] {
        color: #c5c8ce;
    }
    &:hover {
        background: #e1f0fe;
    }
`;

/**
 * 获取日期候选项，固定为42个
 * @param {*} locateDate
 * @returns
 */
const getDateOptions = function (locateDate) {
    const options = [];
    const date = new Date(locateDate);
    const year = date.getFullYear();
    const month = date.getMonth();
    date.setDate(1); //设置为指定日期1号
    const day = date.getDay();
    if (day > 0) {
        //当前不是星期日，填充前一个月的日期
        const time = date.getTime() - 24 * 60 * 60 * 1000;
        const preDate = new Date(time);
        const year = preDate.getFullYear();
        const month = preDate.getMonth();
        const pre = preDate.getDate();
        for (let i = 0; i < day; i++) {
            options[day - 1 - i] = {
                pre: true,
                year,
                month,
                date: pre - i,
                next: false,
            };
        }
    }
    const dateCount = getDateCount(locateDate);
    for (let i = 0; i < dateCount; i++) {
        options.push({
            pre: false,
            year,
            month,
            date: i + 1,
            next: false,
        });
    }
    date.setDate(dateCount + 1); //设置为指定日期最后一天
    const time = date.getTime() + 24 * 60 * 60 * 1000;
    const newDate = new Date(time);
    const newYear = newDate.getFullYear();
    const newMonth = newDate.getMonth();
    let index = 1;
    while (options.length < 42) {
        options.push({
            pre: false,
            year: newYear,
            month: newMonth,
            date: index,
            next: true,
        });
        index++;
    }
    return options;
};

function isToday(year, month, date) {
    const d = new Date();
    return (
        year === d.getFullYear() &&
        month === d.getMonth() &&
        date === d.getDate()
    );
}

function DateCell(props) {
    const { year, month, date, pre, next, selected = false, onClick } = props;
    const handleClick = () => {
        if (onClick) {
            let m = month + 1;
            onClick(
                `${year}-${m < 10 ? '0' + m : m}-${
                    date < 10 ? '0' + date : date
                }`
            );
        }
    };
    return (
        <DateCellWrap
            data-year={year}
            data-month={month + 1}
            data-date={date}
            onClick={handleClick}
        >
            <DateCellEM
                data-selected={selected}
                data-pre-month={pre}
                data-today={isToday(year, month, date)}
                data-next-month={next}
            >
                {date}
            </DateCellEM>
        </DateCellWrap>
    );
}

const isSelected = function (value, year, month, date) {
    if (value) {
        const d = new Date(value);
        return (
            d.getFullYear() === year &&
            d.getMonth() === month &&
            d.getDate() === date
        );
    }
    return false;
};

export default function () {
    return (
        <DateContext.Consumer>
            {(ctx) => {
                const { value, locateDate, setLocateDate, setMode, setValue } =
                    ctx;
                const dateOptions = getDateOptions(locateDate);
                const date = new Date(locateDate);
                const year = date.getFullYear();
                const month = date.getMonth() + 1;
                return (
                    <Fragment>
                        <Header
                            year={year}
                            month={month}
                            onDbArrowLeftClick={() => {
                                date.setFullYear(year - 1);
                                setLocateDate(dateToStr(date));
                            }}
                            onArrowLeftClick={() => {
                                if (month == 1) {
                                    date.setMonth(11);
                                    date.setFullYear(year - 1);
                                } else {
                                    date.setMonth(month - 2);
                                }
                                setLocateDate(dateToStr(date));
                            }}
                            onArrowRightClick={() => {
                                if (month == 12) {
                                    date.setMonth(0);
                                    date.setFullYear(year + 1);
                                } else {
                                    date.setMonth(month);
                                }
                                setLocateDate(dateToStr(date));
                            }}
                            onDbArrowRightClick={() => {
                                date.setFullYear(year + 1);
                                setLocateDate(dateToStr(date));
                            }}
                            onYearClick={() => {
                                setMode('year');
                            }}
                            onMonthClick={() => {
                                setMode('month');
                            }}
                        ></Header>
                        <PanelWrap>
                            <PanelCellsWrap>
                                <PanelHeaderCellsWrap>
                                    <PanelHeaderCell>日</PanelHeaderCell>
                                    <PanelHeaderCell>一</PanelHeaderCell>
                                    <PanelHeaderCell>二</PanelHeaderCell>
                                    <PanelHeaderCell>三</PanelHeaderCell>
                                    <PanelHeaderCell>四</PanelHeaderCell>
                                    <PanelHeaderCell>五</PanelHeaderCell>
                                    <PanelHeaderCell>六</PanelHeaderCell>
                                    {dateOptions.map(
                                        ({ pre, year, month, date, next }) => {
                                            return (
                                                <Fragment
                                                    key={`${year}-${month}-${date}`}
                                                >
                                                    <DateCell
                                                        pre={pre}
                                                        year={year}
                                                        month={month}
                                                        date={date}
                                                        next={next}
                                                        selected={isSelected(
                                                            value,
                                                            year,
                                                            month,
                                                            date
                                                        )}
                                                        onClick={(val) => {
                                                            setValue(val);
                                                        }}
                                                    ></DateCell>
                                                </Fragment>
                                            );
                                        }
                                    )}
                                </PanelHeaderCellsWrap>
                            </PanelCellsWrap>
                        </PanelWrap>
                    </Fragment>
                );
            }}
        </DateContext.Consumer>
    );
}
