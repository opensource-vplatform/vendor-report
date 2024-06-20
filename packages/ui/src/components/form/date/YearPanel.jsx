import {
  Fragment,
  useState,
} from 'react';

import styled from 'styled-components';

import {
  DateContext,
  PanelCellsWrap,
  PanelWrap,
} from './Components';
import Header from './Header';
import { dateToStr } from './utils';

const YearCellWrap = styled.span`
    width: 40px;
    height: 28px;
    line-height: 28px;
    margin: 10px 12px;
    border-radius: 3px;
    cursor: pointer;
    display: inline-block;
    &:hover {
        background: #e1f0fe;
    }
    &[data-selected='true']{
        background: #2d8cf0 !important;
        color: #fff !important;
    }
`;

const YearCellEM = styled.em`
    user-select: none;
    width: 40px;
    height: 28px;
    line-height: 28px;
    margin: 0;
`;

function YearCell(props) {
    const { year,selected=false, onClick } = props;
    return (
        <YearCellWrap data-selected={selected} onClick={onClick}>
            <YearCellEM>{year}</YearCellEM>
        </YearCellWrap>
    );
}

const getYearOptions = function (dateStr) {
    const date = new Date(dateStr);
    const year = date.getFullYear();
    const options = [];
    for (let i = 0; i < 4; i++) {
        options.push(year - (4 - i));
    }
    options.push(year);
    for (let i = 0; i < 7; i++) {
        options.push(year + i + 1);
    }
    return options;
};

const getPreYearOptions = function (options) {
    const opts = [];
    const max = options[0];
    for (let i = 0; i < 12; i++) {
        opts.push(max - (12 - i));
    }
    return opts;
};

const getNextYearOptions = function (options) {
    const opts = [];
    const min = options[11];
    for (let i = 0; i < 12; i++) {
        opts.push(min + i + 1);
    }
    return opts;
};

const isSelected = function(value,year){
    if(value){
        const date = new Date(value);
        return date.getFullYear()==year;
    }
    return false;
}

function Panel(props) {
    const {value, locateDate, setLocateDate, setMode } = props;
    const [options, setOptions] = useState(() => getYearOptions(locateDate));
    const date = new Date(locateDate);
    const year = date.getFullYear();
    return (
        <Fragment>
            <Header
                year={year}
                arrowLeftVisible={false}
                arrowRightVisible={false}
                monthLabelVisible={false}
                onDbArrowLeftClick={() => {
                    setOptions(getPreYearOptions(options));
                }}
                onDbArrowRightClick={() => {
                    setOptions(getNextYearOptions(options));
                }}
            ></Header>
            <PanelWrap>
                <PanelCellsWrap>
                    {options.map((year) => {
                        return (
                            <Fragment key={year}>
                                <YearCell
                                    year={year}
                                    selected={isSelected(value,year)}
                                    onClick={() => {
                                        date.setFullYear(year);
                                        setLocateDate(dateToStr(date));
                                        setMode('month');
                                    }}
                                ></YearCell>
                            </Fragment>
                        );
                    })}
                </PanelCellsWrap>
            </PanelWrap>
        </Fragment>
    );
}

export default function () {
    return (
        <DateContext.Consumer>
            {(ctx) => {
                const { value,locateDate, setLocateDate, setMode } = ctx;
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
