import {
  Fragment,
  useState,
} from 'react';

import {
  useDispatch,
  useSelector,
} from 'react-redux';
import styled from 'styled-components';

import Dialog from '@components/dialog/Index';
import { getFormulaMetadata } from '@metadatas/formula';
import { showErrorMessage } from '@utils/messageUtil';
import { withBatchUpdate } from '@utils/spreadUtil';

import {
  ButtonWrap,
  FormulaButton,
  FormulaDesc,
} from './Components';
import FormulaArgs from './FormulaArgs';
import FormulaExample from './FormulaExample';
import RangSelector from './RangSelector';
import { toArgs } from './utils';

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
    width: max-content;
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

const argsToFormulaArgs = function (args) {
    let lastNotEmptyIndex = args.length - 1;
    const formulaArgs = [];
    while (lastNotEmptyIndex > -1) {
        const arg = args[lastNotEmptyIndex];
        if (arg.exp.trim() != '') {
            break;
        }
        lastNotEmptyIndex--;
    }
    for (let i = 0; i <= lastNotEmptyIndex; i++) {
        const arg = args[i];
        formulaArgs.push(arg.exp.trim());
    }
    return formulaArgs;
};

export default function (props) {
    const { formula, onClose, hostCol, hostRow, hostSheet } = props;
    const { spread } = useSelector(({ appSlice }) => appSlice);
    const dispatch = useDispatch();
    const [data, setData] = useState(() => {
        let funCode = null,
            args = [],
            metadata = null;
        try {
            const expression = GC.Spread.Sheets.CalcEngine.formulaToExpression(
                hostSheet,
                formula
            );
            if (expression.type == 7) {
                //公式，如:SUM(1)
                funCode = expression.functionName;
                metadata = getFormulaMetadata(funCode);
                args = toArgs(
                    metadata.args,
                    expression.arguments,
                    hostSheet,
                    spread
                );
            } else if (expression.type == 8) {
                //公式选择界面选择结果，如：SUM
                funCode = expression.value;
                metadata = getFormulaMetadata(funCode);
                args = metadata.args || [];
                args = args.map((arg) => {
                    return { ...arg, exp: '' };
                });
            }
        } catch (e) {}
        return {
            hostRow,
            hostCol,
            funCode,
            mode: 'base',
            current: 0,
            metadata,
            args,
            selectionInfo: null,
        };
    });
    const handleFormulaSetting = () => {
        try {
            withBatchUpdate(spread, () => {
                const { hostRow, hostCol, funCode, args } = data;
                hostSheet.setFormula(
                    hostRow,
                    hostCol,
                    `=${funCode}(${argsToFormulaArgs(args).join(',')})`
                );
                spread.setActiveSheet(hostSheet.name());
            });
        } catch (e) {
            showErrorMessage(dispatch, typeof e == 'string' ? e : e.message);
        }
        if (typeof onClose == 'function') {
            onClose();
        }
    };
    const handleDialogClose = () => {
        if (data.mode == 'rangSelect') {
            setData((data) => {
                return {
                    ...data,
                    mode: 'base',
                };
            });
        } else {
            if (typeof onClose == 'function') {
                onClose();
            }
        }
    };
    const formulaArgs = argsToFormulaArgs(data.args);
    return (
        <Dialog
            title='函数参数'
            mask={data.mode == 'base'}
            onClose={handleDialogClose}
            anchor={true}
            closable={false}
        >
            <Wrap>
                {data.mode == 'base' ? (
                    <Fragment>
                        <FormulaWrap>
                            <FormulaTitle>{data.funCode}</FormulaTitle>
                            <FormulaArgsWrap>
                                <FormulaArgs
                                    data={data}
                                    setData={setData}
                                ></FormulaArgs>
                            </FormulaArgsWrap>
                        </FormulaWrap>
                        <FormulaDesc style={{ marginTop: 8 }}>
                            {data.metadata?.desc}
                        </FormulaDesc>
                        <FormulaResult>
                            =
                            <FormulaExample
                                code={data.funCode}
                                style={{ maxWidth: 380 }}
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
                    <RangSelector
                        data={data}
                        setData={setData}
                        hostSheet={hostSheet}
                    ></RangSelector>
                ) : null}
            </Wrap>
        </Dialog>
    );
}
