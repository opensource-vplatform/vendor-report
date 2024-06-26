import { useEffect } from 'react';

import {
  useDispatch,
  useSelector,
} from 'react-redux';
import styled from 'styled-components';

import {
  clear,
  markHistory,
  setFormula,
  setSelection,
} from '@store/formulaEditorSlice/formulaEditorSlice';
import {
  Pane,
  Resizer,
  SplitPane,
} from '@toone/report-ui';
import { getActiveIndexBySheet } from '@utils/worksheetUtil';

import LeftPane from './panes/LeftPane';
import RightPane from './panes/RightPane';

const Wrap = styled.div`
    background-color: #fff;
    width: 900px;
    height: 500px;
    color: #515a6e;
    border-top: 1px solid #aaa;
`;

export default function (props) {
    const { onClose } = props;
    const { spread } = useSelector(({ appSlice }) => appSlice);
    const dispatch = useDispatch();
    useEffect(() => {
        if (spread) {
            const sheet = spread.getActiveSheet();
            if (sheet) {
                const { row, col } = getActiveIndexBySheet(sheet);
                let formula = sheet.getFormula(row, col);
                formula = formula == null ? '' : formula;
                dispatch(clear({}));
                dispatch(setFormula({ formula }));
                dispatch(
                    setSelection({ start: formula.length, end: formula.length })
                );
                dispatch(markHistory({}));
            }
        }
    }, []);
    return (
        <Wrap>
            <SplitPane style={{ width: '100%', height: '100%' }}>
                <Pane
                    style={{
                        width: 220,
                        borderRight: '1px solid #aaa',
                        height: '100%',
                    }}
                >
                    <LeftPane></LeftPane>
                </Pane>
                <Resizer size={8}></Resizer>
                <Pane style={{ width: '100%', flex: 1 }}>
                    <RightPane onClose={onClose}></RightPane>
                </Pane>
            </SplitPane>
        </Wrap>
    );
}
