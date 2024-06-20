import styled from 'styled-components';

import { DateContext } from './Components';
import DatePanel from './DatePanel';
import MonthPanel from './MonthPanel';
import YearPanel from './YearPanel';

const PanelWrap = styled.div`
    margin: 0;
    padding: 0;
`;

const PanelCellsWrap = styled.div`
    width: 196px;
    margin: 10px;
    padding: 0;
    white-space: normal;
`;

export default function () {
    return (
        <DateContext.Consumer>
            {(ctx) => {
                const { mode } = ctx;
                let children = null;
                if (mode == 'year') {
                    children = <YearPanel></YearPanel>;
                } else if (mode == 'month') {
                    children = <MonthPanel></MonthPanel>;
                } else if (mode == 'date') {
                    children = <DatePanel></DatePanel>;
                }
                return children;
            }}
        </DateContext.Consumer>
    );
}
