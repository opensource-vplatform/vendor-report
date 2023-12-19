import {
  createRef,
  useEffect,
  useState,
} from 'react';

import styled from 'styled-components';

import { getNamespace } from '../../utils/spreadUtil';

const Wrap = styled.div`
    width: 100%;
    height: 100%;
    overflow: visible;
    user-select: none;
`;

const bindEvent = function (spread, typeName, handler) {
    if (handler) {
        const GC = getNamespace();
        const type = GC.Spread.Sheets.Events[typeName];
        spread.bind(type, handler);
    }
};

export default function (props) {
    const { inited, enterCell, activeSheetChanged, valueChanged, children } =
        props;
    const [data] = useState({ spread: null });
    const el = createRef(null);
    useEffect(() => {
        if (el.current && !data.spread) {
            const GC = getNamespace();
            const spread = new GC.Spread.Sheets.Workbook(el.current, {
                sheetCount: 0,
            });
            spread.suspendPaint();
            try {
                bindEvent(spread, 'EnterCell', enterCell);
                bindEvent(spread, 'ActiveSheetChanged', activeSheetChanged);
                bindEvent(spread, 'ValueChanged', valueChanged);
                if (children) {
                    const sheetList = Array.isArray(children)
                        ? children
                        : [children];
                    sheetList.forEach((sheet, index) => {
                        const {
                            name = `sheet${index + 1}`,
                            rowCount = 20,
                            colCount = 20,
                        } = sheet.props;
                        const workSheet = new GC.Spread.Sheets.Worksheet(name);
                        workSheet.setRowCount(rowCount);
                        workSheet.setColumnCount(colCount);
                        spread.addSheet(index, workSheet);
                    });
                }
                data.spread = spread;
                inited && inited(spread);
            } finally {
                spread.resumePaint();
            }
        }
    }, []);
    return <Wrap ref={el}></Wrap>;
}
