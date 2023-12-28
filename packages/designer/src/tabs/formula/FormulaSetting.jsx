import {
  Fragment,
  useEffect,
  useState,
} from 'react';

import { useSelector } from 'react-redux';
import styled from 'styled-components';

import Dialog from '@components/dialog/Index';
import { getFormulaMetadata } from '@metadatas/formula';

import {
  bind,
  EVENTS,
  unbind,
} from '../../event/EventManager';
import { withBatchUpdate } from '../../utils/spreadUtil';
import {
  ButtonWrap,
  FormulaButton,
  FormulaDesc,
} from './Components';
import FormulaArgs from './FormulaArgs';
import FormulaExample from './FormulaExample';
import RangSelector from './RangSelector';

const Wrap = styled.div`
    display: flex;
    flex-direction: column;
    width: 425px;
    padding: 8px;
    box-sizing: border-box;
`;

const FormulaWrap = styled.div`
    display: flex;
    flex-direction: column;
    height: 190px;
    margin-top: 16px;
    border: solid 1px #dadada;
`;

const FormulaTitle = styled.div`
    margin-top: -8px;
    margin-left: 8px;
    width: 5px;
    overflow: visible;
    background-color: #f0f0f0;
`;

const FormulaArgsWrap = styled.div`
    overflow: hidden auto;
    height: 100%;
    margin: 8px;
`;

const FormulaResult = styled.div`
    display: flex;
    align-items: center;
    border-top: solid 1px #dadada;
    min-height: 30px;
    padding: 8px;
    font-size: 14px;
`;

const EVENT_DOMAIN_ID = 'FORMUAL_SETTING';

const selectionToRang = function (selections, spread) {
    const rangs = [];
    if (selections && selections.length > 0) {
        const r1c1Style =
            GC.Spread.Sheets.ReferenceStyle.r1c1 ===
            spread.options.referenceStyle;
        const allRelative =
            GC.Spread.Sheets.CalcEngine.RangeReferenceRelative.allRelative;
        const rangeToFormula = GC.Spread.Sheets.CalcEngine.rangeToFormula;
        selections.forEach((selection) => {
            const { row, col } = selection;
            rangs.push(
                rangeToFormula(selection, row, col, allRelative, r1c1Style)
            );
        });
    }
    return rangs.join(',');
};

/**
 * 是否有区域选择
 * 比如：选择A，B两列
 * @param {*} selections
 */
const hasAreaSelection = function (selections) {
    if (selections && selections.length > 0) {
        for (let index = 0; index < selections.length; index++) {
            const { rowCount, colCount } = selections[index];
            if (rowCount > 1 || colCount > 1) {
                return true;
            }
        }
    }
    return false;
};

const argsToFormulaArgs = function(args){
    let lastNotEmptyIndex = args.length-1;
    const formulaArgs = [];
    while(lastNotEmptyIndex>-1){
        const arg = args[lastNotEmptyIndex];
        if(arg.exp.trim()!=""){
            break;
        }
        lastNotEmptyIndex--;
    }
    for(let i=0;i<=lastNotEmptyIndex;i++){
        const arg = args[i];
        formulaArgs.push(arg.exp.trim());
    }
    return formulaArgs;
}

export default function (props) {
    const { code, onClose } = props;
    const { spread } = useSelector(({ appSlice }) => appSlice);
    const metadata = getFormulaMetadata(code);
    const [data, setData] = useState(() => {
        const args = metadata.args || [];
        return {
            row:0,
            col:0,
            mode: 'base',
            current: 0,
            args: args.map((arg) => {
                return { ...arg, exp: '' };
            }),
        };
    });
    const handleSelectionChanging = (params) => {
        const { newSelections, oldSelections } = params;
        let mode = hasAreaSelection(newSelections) ? 'rangSelect' : data.mode;
        const current = data.current;
        const arg = data.args[current];
        const newRang = selectionToRang(newSelections, spread);
        const oldRang = selectionToRang(oldSelections, spread);
        let exp = arg.exp;
        if (exp.endsWith(oldRang)) {
            exp = exp.substring(0, exp.length-oldRang.length) + newRang;
        } else {
            exp += exp.trim().length > 0 ? `+${newRang}` : newRang;
        }
        data.args[current] = { ...arg, exp };
        setData({
            ...data,
            mode,
        });
    };
    const handleSelectionChanged = (params) => {
        if (data.mode == 'rangSelect') {
            setData({
                ...data,
                mode: 'base',
            });
        }
    };
    const handleBind = () => {
        bind({
            id: EVENT_DOMAIN_ID,
            event: EVENTS.SelectionChanging,
            handler: handleSelectionChanging,
        });
        bind({
            id: EVENT_DOMAIN_ID,
            event: EVENTS.SelectionChanged,
            handler: handleSelectionChanged,
        });
    };
    const handleUnbind = () => {
        unbind({
            id: EVENT_DOMAIN_ID,
            event: EVENTS.SelectionChanging,
        });
        unbind({
            id: EVENT_DOMAIN_ID,
            event: EVENTS.SelectionChanged,
        });
    };
    const handleFormulaSetting = () => {
        handleUnbind();
        withBatchUpdate(spread,(sheet)=>{
            const {row,col} = data;
            sheet.setFormula(row,col,`=${code}(${argsToFormulaArgs(data.args).join(",")})`);
            sheet.setSelection(row,col,1,1);
        });
        if (typeof onClose == 'function') {
            onClose();
        }
    };
    const handleDialogClose = () => {
        if(data.mode=='rangSelect'){
            setData((data)=>{
                return {
                    ...data,
                    mode:'base'
                }
            });
        }else{
            handleUnbind();
            if (typeof onClose == 'function') {
                onClose();
            }
        }
    };
    handleBind();
    const formulaArgs = argsToFormulaArgs(data.args);
    useEffect(()=>{
        const sheet = spread.getActiveSheet();
        if(sheet){
            const row = sheet.getActiveRowIndex();
            const col = sheet.getActiveColumnIndex();
            setData({
                ...data,
                row,
                col
            });
        }
    },[]);
    return (
        <Dialog title='函数参数' mask={false} onClose={handleDialogClose} closable={false}>
            <Wrap>
                {data.mode == 'base' ? (
                    <Fragment>
                        <FormulaWrap>
                            <FormulaTitle>{code}</FormulaTitle>
                            <FormulaArgsWrap>
                                <FormulaArgs
                                    data={data}
                                    setData={setData}
                                ></FormulaArgs>
                            </FormulaArgsWrap>
                        </FormulaWrap>
                        <FormulaDesc style={{ marginTop: 8 }}>
                            {metadata.desc}
                        </FormulaDesc>
                        <FormulaResult>
                            =
                            <FormulaExample
                                code={code}
                                argNames={formulaArgs}
                            ></FormulaExample>
                        </FormulaResult>
                        <ButtonWrap>
                            <FormulaButton onClick={handleDialogClose}>
                                取消
                            </FormulaButton>
                            <FormulaButton
                                style={{ marginRight: 8 }}
                                onClick={handleFormulaSetting}
                            >
                                确定
                            </FormulaButton>
                        </ButtonWrap>
                    </Fragment>
                ) : null}
                {data.mode == 'rangSelect' ? (
                    <RangSelector data={data} setData={setData}></RangSelector>
                ) : null}
            </Wrap>
        </Dialog>
    );
}
