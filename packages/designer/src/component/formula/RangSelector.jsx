import {
  useEffect,
  useRef,
  useState,
} from 'react';

import { useSelector } from 'react-redux';
import styled from 'styled-components';

import ToSettingIcon from '@icons/formula/ToSetting';

const Wrap = styled.div`
    width: 100%;
    margin-top: 10px;
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
    const { data, setData, hostSheet } = props;
    const value = data.args[data.current].exp;
    const { spread } = useSelector(({ appSlice }) => appSlice);
    const ref = useRef(null);
    const [state] = useState({ formulaTextBox: null });
    useEffect(() => {
        if (ref.current) {
            const formulaTextBox =
                new GC.Spread.Sheets.FormulaTextBox.FormulaTextBox(
                    ref.current,
                    {
                        absoluteReference: false,
                        needSheetName: false,
                        rangeSelectMode: true,
                    }
                );
            formulaTextBox.workbook(spread);
            formulaTextBox.startSelectMode(value ? `${value}` : '');
            state.formulaTextBox = formulaTextBox;
            return () => {
                formulaTextBox.endSelectMode();
                formulaTextBox.destroy();
            };
        }
    }, []);
    const handleIconClick = () => {
        const current = data.current;
        const arg = data.args[current];
        let exp = state.formulaTextBox.text();
        exp = exp.startsWith('=') ? exp.substring(1) : exp;
        const newArg = { ...arg, exp };
        data.args[current] = newArg;
        spread.setActiveSheet(hostSheet.name());
        setData({
            ...data,
            args: data.args,
            mode: 'base',
        });
    };
    return (
        <Wrap>
            <InputWrap>
                <Div ref={ref}></Div>
                <ToSettingIcon onClick={handleIconClick}></ToSettingIcon>
            </InputWrap>
        </Wrap>
    );
}
