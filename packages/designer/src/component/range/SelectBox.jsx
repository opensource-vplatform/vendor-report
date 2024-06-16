import {
  useEffect,
  useRef,
  useState,
} from 'react';

import {
  useDispatch,
  useSelector,
} from 'react-redux';
import styled from 'styled-components';

import ToSettingIcon from '@icons/formula/ToSetting';
import { setVisible } from '@store/rangeSlice';
import { Dialog } from '@toone/report-ui';

const Wrap = styled.div`
    margin-top: 10px;
    margin-left: 8px;
    margin-right: 8px;
    margin-bottom: 8px;
`;

const InputWrap = styled.div`
    padding: 1px;
    display: flex;
    border: 1px solid #d3d3d3;
    height: 100%;
    background-color: white;
    &:hover {
        border: solid 1px #5292f7;
    }
    &:focus-within {
        border: solid 1px #5292f7;
    }
`;

const Div = styled.div`
    padding-left: 2px;
    width: 100%;
    border: none;
    padding-top: 1px;
    padding-bottom: 1px;
    align-self: center;
    outline: none;
    font-size: 14px;
    & td:last-child {
        display: none;
        margin-top: 4px;
    }
    & td:first-child div {
        width: 100% !important;
    }
`;

export default function (props) {
    const { spread } = useSelector(({ appSlice }) => appSlice);
    const {
        visible,
        hostId,
        range,
        absoluteReference,
        rangeSelectMode,
        selectionType,
        onCloseHandlerId,
        onChangeHandlerId,
    } = useSelector(({ rangeSlice }) => rangeSlice);
    const dispatcher = useDispatch();
    const hostSheet = spread.getActiveSheet();
    const ref = useRef(null);
    const [state] = useState({ formulaTextBox: null });
    useEffect(() => {
        if (ref.current) {
            const formulaTextBox =
                new GC.Spread.Sheets.FormulaTextBox.FormulaTextBox(
                    ref.current,
                    {
                        absoluteReference,
                        needSheetName: false,
                        rangeSelectMode,
                        selectionUnit: selectionType=='cell' ? 0:(selectionType=='row' ? 1:2)
                    }
                );
            formulaTextBox.workbook(spread);
            rangeSelectMode&&formulaTextBox.startSelectMode(range ? `${range}` : '');
            state.formulaTextBox = formulaTextBox;
            ref.current.querySelector('[contenteditable="true"]')?.focus();
            return () => {
                formulaTextBox.endSelectMode();
                formulaTextBox.destroy();
            };
        }
    }, []);
    const handleIconClick = () => {
        spread.setActiveSheet(hostSheet.name());
        const text = state.formulaTextBox.text();
        const handler = window[onChangeHandlerId];
        handler && handler(text=='=' ? '':text);
        dispatcher(setVisible(false));
    };
    let wrapStyle = {},
        title = '';
    if (hostId) {
        const el = document.getElementById(hostId);
        if (el) {
            const { top, left, width } = el.getBoundingClientRect();
            wrapStyle = { top, left, width, transform: 'unset' };
            const dataset = el.dataset;
            title = dataset.title;
        }
    }
    return visible ? (
        <Dialog
            open={true}
            mask={false}
            style={wrapStyle}
            title={title}
            onClose={() => {
                const handler = window[onCloseHandlerId];
                handler && handler();
            }}
        >
            <Wrap>
                <InputWrap>
                    <Div ref={ref}></Div>
                    <ToSettingIcon onClick={handleIconClick}></ToSettingIcon>
                </InputWrap>
            </Wrap>
        </Dialog>
    ) : null;
}
