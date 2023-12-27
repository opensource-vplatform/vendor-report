import { useCallback } from 'react';

import styled from 'styled-components';

import Dialog from '@components/dialog/Index';
import { getFormulaMetadata } from '@metadatas/formula';

import {
  bind,
  EVENTS,
  unbind,
} from '../../event/EventManager';
import {
  ButtonWrap,
  FormulaButton,
  FormulaDesc,
} from './Components';
import FormulaArgs from './FormulaArgs';
import FormulaExample from './FormulaExample';

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
    display:flex;
    align-items: center;
    border-top: solid 1px #dadada;
    min-height: 30px;
    padding: 8px;
    font-size: 14px;
`;

export default function (props) {
    const { code, onClose } = props;
    const handleSelectionChanging = useCallback(() => {
        debugger;
    });
    bind({
        event: EVENTS.SelectionChanging,
        handler: handleSelectionChanging,
    });
    const handleFormulaSetting = () => {
        unbind({
            event: EVENTS.SelectionChanging,
            handler: handleSelectionChanging,
        });
    };
    const handleDialogClose = () => {
        unbind({
            event: EVENTS.SelectionChanging,
            handler: handleSelectionChanging,
        });
        if (typeof onClose == 'function') {
            onClose();
        }
    };
    const metadata = getFormulaMetadata(code);
    return (
        <Dialog title='函数参数' mask={false} onClose={handleDialogClose}>
            <Wrap>
                <FormulaWrap>
                    <FormulaTitle>{code}</FormulaTitle>
                    <FormulaArgsWrap>
                        <FormulaArgs metadata={metadata}></FormulaArgs>
                    </FormulaArgsWrap>
                </FormulaWrap>
                <FormulaDesc style={{ marginTop: 8 }}>
                    {metadata.desc}
                </FormulaDesc>
                <FormulaResult>
                    =<FormulaExample code={code} argNames={[]}></FormulaExample>
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
            </Wrap>
        </Dialog>
    );
}
