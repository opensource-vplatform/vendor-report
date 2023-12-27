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
    const { inited, enterCell, activeSheetChanged, valueChanged,selectionChanged,selectionChanging, children } =
        props;
    const [data] = useState({ spread: null });
    const el = createRef(null);
    useEffect(() => {
        if (el.current) {
            let spread = null;
            const unInited = !data.spread; 
            if(unInited){
                const GC = getNamespace();
                spread = new GC.Spread.Sheets.Workbook(el.current, {
                    sheetCount: 0,
                });
                data.spread = spread;
            }else{
                spread = data.spread;
            }
            spread.suspendPaint();
            spread.suspendEvent();
            try {
                if(unInited){
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
                    inited && inited(spread);
                }
                spread.unbindAll();
                bindEvent(spread, 'EnterCell', enterCell);
                bindEvent(spread, 'ActiveSheetChanged', activeSheetChanged);
                bindEvent(spread, 'ValueChanged', valueChanged);
                bindEvent(spread,'SelectionChanged',selectionChanged);
                bindEvent(spread,'SelectionChanging',selectionChanging);
            } finally {
                spread.resumePaint();
                spread.resumeEvent();
            }
        }
    }, [inited, enterCell, activeSheetChanged, valueChanged,selectionChanged,selectionChanging]);
    return <Wrap ref={el}></Wrap>;
}
